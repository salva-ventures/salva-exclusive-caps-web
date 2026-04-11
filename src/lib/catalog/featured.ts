import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";

export type FeaturedPlacement = "home";

export type CatalogFeaturedSlotRow = {
  id: string;
  product_id: string;
  placement: FeaturedPlacement;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type AdminFeaturedProductRow = {
  featured_slot_id: string;
  product_id: string;
  placement: FeaturedPlacement;
  sort_order: number;
  is_active: boolean;
  product_name: string;
  product_slug: string;
  primary_image_url: string | null;
};

type RawFeaturedAdminRow = {
  id: string;
  product_id: string;
  placement: FeaturedPlacement;
  sort_order: number;
  is_active: boolean;
  products:
    | {
        name: string;
        slug: string;
        product_media?: Array<{
          public_url: string;
          media_type: string;
          status: string;
          is_primary: boolean;
          sort_order: number;
        }>;
      }
    | Array<{
        name: string;
        slug: string;
        product_media?: Array<{
          public_url: string;
          media_type: string;
          status: string;
          is_primary: boolean;
          sort_order: number;
        }>;
      }>;
};

export async function listFeaturedSlots(
  placement: FeaturedPlacement
): Promise<CatalogFeaturedSlotRow[]> {
  const { data, error } = await supabaseAdmin
    .from("catalog_featured_slots")
    .select("id, product_id, placement, sort_order, is_active, created_at, updated_at")
    .eq("placement", placement)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Error cargando catalog_featured_slots: ${error.message}`);
  }

  return (data ?? []) as CatalogFeaturedSlotRow[];
}

export async function listAdminFeaturedProducts(
  placement: FeaturedPlacement
): Promise<AdminFeaturedProductRow[]> {
  const { data, error } = await supabaseAdmin
    .from("catalog_featured_slots")
    .select(`
      id,
      product_id,
      placement,
      sort_order,
      is_active,
      products!inner (
        name,
        slug,
        product_media (
          public_url,
          media_type,
          status,
          is_primary,
          sort_order
        )
      )
    `)
    .eq("placement", placement)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Error cargando destacados admin: ${error.message}`);
  }

  const rows = ((data ?? []) as unknown) as RawFeaturedAdminRow[];

  return rows.map((row) => {
    const product = Array.isArray(row.products) ? row.products[0] : row.products;

    const images = (product?.product_media ?? [])
      .filter((media) => media.media_type === "image" && media.status === "active")
      .sort((a, b) => {
        if (a.is_primary && !b.is_primary) return -1;
        if (!a.is_primary && b.is_primary) return 1;
        return a.sort_order - b.sort_order;
      });

    return {
      featured_slot_id: row.id,
      product_id: row.product_id,
      placement: row.placement,
      sort_order: row.sort_order,
      is_active: row.is_active,
      product_name: product?.name ?? "Producto",
      product_slug: product?.slug ?? "",
      primary_image_url: images[0]?.public_url ?? null,
    };
  });
}

export async function listFeaturedProductIds(
  placement: FeaturedPlacement
): Promise<Set<string>> {
  const rows = await listFeaturedSlots(placement);
  return new Set(rows.filter((row) => row.is_active).map((row) => row.product_id));
}