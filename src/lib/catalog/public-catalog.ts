import { supabase } from "@/lib/supabase/client";

export type PublicCatalogScope = "retail" | "wholesale";

type RawChannel = {
  channel: "retail" | "wholesale";
  price: number | null;
  availability_status: string;
  is_enabled: boolean;
  is_visible: boolean;
  min_qty: number | null;
  lead_time_text: string | null;
  sales_notes: string | null;
};

type RawInventory = {
  stock_on_hand: number;
  stock_reserved: number;
  stock_available: number;
};

type RawImage = {
  public_url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  media_type: string;
  status: string;
};

type RawProduct = {
  id: string;
  slug: string;
  name: string;
  brand_name: string | null;
  collab_name: string | null;
  category_name: string | null;
  rarity_name: string | null;
  rarity_color: string | null;
  has_nfc: boolean | null;
  includes_box: boolean | null;
  includes_dust_protector: boolean | null;
  catalog_status: "active" | "draft" | "archived";
  is_retail_visible: boolean;
  is_wholesale_visible: boolean;
  retail_sort_order: number;
  wholesale_sort_order: number;
  retail_price: number | null;
  wholesale_price: number | null;
  retail_label: string | null;
  wholesale_label: string | null;
  product_channels: RawChannel[];
  inventory: RawInventory[];
  product_media: RawImage[];
};

export type PublicCatalogItem = {
  id: string;
  slug: string;
  name: string;
  brand_name: string | null;
  collab_name: string | null;
  category_name: string | null;
  rarity_name: string | null;
  rarity_color: string | null;
  has_nfc: boolean;
  includes_box: boolean;
  includes_dust_protector: boolean;
  price: number | null;
  label: string | null;
  availability_status: string;
  stock_available: number;
  min_qty: number;
  lead_time_text: string | null;
  sales_notes: string | null;
  image_url: string | null;
  image_alt: string;
  sort_order: number;
};

export async function fetchPublicCatalog(scope: PublicCatalogScope): Promise<PublicCatalogItem[]> {
  const channelName = scope === "retail" ? "retail" : "wholesale";

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      slug,
      name,
      brand_name,
      collab_name,
      category_name,
      rarity_name,
      rarity_color,
      has_nfc,
      includes_box,
      includes_dust_protector,
      catalog_status,
      is_retail_visible,
      is_wholesale_visible,
      retail_sort_order,
      wholesale_sort_order,
      retail_price,
      wholesale_price,
      retail_label,
      wholesale_label,
      product_channels!inner (
        channel,
        price,
        availability_status,
        is_enabled,
        is_visible,
        min_qty,
        lead_time_text,
        sales_notes
      ),
      inventory (
        stock_on_hand,
        stock_reserved,
        stock_available
      ),
      product_media (
        public_url,
        alt_text,
        sort_order,
        is_primary,
        media_type,
        status
      )
    `)
    .eq("catalog_status", "active")
    .eq(scope === "retail" ? "is_retail_visible" : "is_wholesale_visible", true)
    .eq("product_channels.channel", channelName)
    .eq("product_channels.is_enabled", true)
    .eq("product_channels.is_visible", true);

  if (error) {
    throw new Error(error.message);
  }

  const rows = ((data ?? []) as unknown as RawProduct[]).map((row) => {
    const channel = Array.isArray(row.product_channels) ? row.product_channels[0] : null;
    const inventory = Array.isArray(row.inventory) ? row.inventory[0] : null;

    const sortedImages = Array.isArray(row.product_media)
      ? row.product_media
          .filter((img) => img.media_type === "image" && img.status === "active")
          .sort((a, b) => {
            if (a.is_primary && !b.is_primary) return -1;
            if (!a.is_primary && b.is_primary) return 1;
            return a.sort_order - b.sort_order;
          })
      : [];

    const firstImage = sortedImages[0] ?? null;

    return {
      id: row.id,
      slug: row.slug,
      name: row.name,
      brand_name: row.brand_name,
      collab_name: row.collab_name,
      category_name: row.category_name,
      rarity_name: row.rarity_name,
      rarity_color: row.rarity_color,
      has_nfc: Boolean(row.has_nfc),
      includes_box: Boolean(row.includes_box),
      includes_dust_protector: Boolean(row.includes_dust_protector),
      price: scope === "retail" ? row.retail_price : row.wholesale_price,
      label: scope === "retail" ? row.retail_label : row.wholesale_label,
      availability_status: channel?.availability_status ?? "unavailable",
      stock_available: inventory?.stock_available ?? 0,
      min_qty: channel?.min_qty ?? 10,
      lead_time_text: channel?.lead_time_text ?? null,
      sales_notes: channel?.sales_notes ?? null,
      image_url: firstImage?.public_url ?? null,
      image_alt: firstImage?.alt_text ?? row.name,
      sort_order: scope === "retail" ? row.retail_sort_order : row.wholesale_sort_order,
    } satisfies PublicCatalogItem;
  });

  return rows.sort((a, b) => a.sort_order - b.sort_order);
}