import { supabase } from "@/lib/supabase/client";
import type { PublicCatalogItem } from "@/lib/catalog/public-catalog";

type RawFeaturedProduct = {
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
  retail_price: number | null;
  retail_label: string | null;
  catalog_status: "active" | "draft" | "archived";
  is_retail_visible: boolean;
  product_channels?: Array<{
    channel: "retail" | "wholesale";
    availability_status: string;
    is_enabled: boolean;
    is_visible: boolean;
    min_qty: number | null;
    lead_time_text: string | null;
    sales_notes: string | null;
  }>;
  inventory?: Array<{
    stock_on_hand: number;
    stock_reserved: number;
    stock_available: number;
  }>;
  product_media?: Array<{
    public_url: string;
    alt_text: string | null;
    sort_order: number;
    is_primary: boolean;
    media_type: string;
    status: string;
  }>;
};

type RawFeaturedRow = {
  sort_order: number;
  products: RawFeaturedProduct | RawFeaturedProduct[];
};

export async function fetchPublicFeaturedHome(): Promise<PublicCatalogItem[]> {
  const { data, error } = await supabase
    .from("catalog_featured_slots")
    .select(`
      sort_order,
      products!inner (
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
        retail_price,
        retail_label,
        catalog_status,
        is_retail_visible,
        product_channels!inner (
          channel,
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
      )
    `)
    .eq("placement", "home")
    .eq("is_active", true)
    .eq("products.catalog_status", "active")
    .eq("products.is_retail_visible", true)
    .eq("products.product_channels.channel", "retail")
    .eq("products.product_channels.is_enabled", true)
    .eq("products.product_channels.is_visible", true)
    .order("sort_order", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  const rows = ((data ?? []) as unknown) as RawFeaturedRow[];

  return rows.map((row) => {
    const product = Array.isArray(row.products) ? row.products[0] : row.products;
    const channel = product?.product_channels?.[0] ?? null;
    const inventory = product?.inventory?.[0] ?? null;

    const images = (product?.product_media ?? [])
      .filter((media) => media.media_type === "image" && media.status === "active")
      .sort((a, b) => {
        if (a.is_primary && !b.is_primary) return -1;
        if (!a.is_primary && b.is_primary) return 1;
        return a.sort_order - b.sort_order;
      });

    const firstImage = images[0] ?? null;

    return {
      id: product?.id ?? "",
      slug: product?.slug ?? "",
      name: product?.name ?? "Producto",
      brand_name: product?.brand_name ?? null,
      collab_name: product?.collab_name ?? null,
      category_name: product?.category_name ?? null,
      rarity_name: product?.rarity_name ?? null,
      rarity_color: product?.rarity_color ?? null,
      has_nfc: Boolean(product?.has_nfc),
      includes_box: Boolean(product?.includes_box),
      includes_dust_protector: Boolean(product?.includes_dust_protector),
      price: product?.retail_price ?? null,
      label: product?.retail_label ?? null,
      availability_status: channel?.availability_status ?? "unavailable",
      stock_available: inventory?.stock_available ?? 0,
      min_qty: channel?.min_qty ?? 1,
      lead_time_text: channel?.lead_time_text ?? null,
      sales_notes: channel?.sales_notes ?? null,
      image_url: firstImage?.public_url ?? null,
      image_alt: firstImage?.alt_text ?? product?.name ?? "Producto",
      sort_order: row.sort_order,
    } satisfies PublicCatalogItem;
  });
}