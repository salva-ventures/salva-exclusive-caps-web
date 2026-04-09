import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";

export type AdminProductListItem = {
  id: string;
  slug: string;
  sku: string | null;
  name: string;
  brand_name: string | null;
  collab_name: string | null;
  is_active: boolean;
  media_count: number;
  primary_image_url: string | null;
};

type RawProductRow = {
  id: string;
  slug: string;
  sku: string | null;
  name: string;
  brand_name: string | null;
  collab_name: string | null;
  is_active: boolean;
  product_media: Array<{
    public_url: string;
    is_primary: boolean;
    sort_order: number;
    media_type: string;
    status: string;
  }> | null;
};

export async function listAdminProducts(): Promise<AdminProductListItem[]> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select(`
      id,
      slug,
      sku,
      name,
      brand_name,
      collab_name,
      is_active,
      product_media (
        public_url,
        is_primary,
        sort_order,
        media_type,
        status
      )
    `)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(`Error listando productos admin: ${error.message}`);
  }

  const rows = (data ?? []) as RawProductRow[];

  return rows.map((row) => {
    const activeMedia = Array.isArray(row.product_media)
      ? row.product_media
          .filter((media) => media.status === "active")
          .sort((a, b) => {
            if (a.is_primary && !b.is_primary) return -1;
            if (!a.is_primary && b.is_primary) return 1;
            return a.sort_order - b.sort_order;
          })
      : [];

    const primaryImage =
      activeMedia.find(
        (media) => media.media_type === "image" && media.is_primary
      ) ??
      activeMedia.find((media) => media.media_type === "image") ??
      null;

    return {
      id: row.id,
      slug: row.slug,
      sku: row.sku,
      name: row.name,
      brand_name: row.brand_name,
      collab_name: row.collab_name,
      is_active: row.is_active,
      media_count: activeMedia.length,
      primary_image_url: primaryImage?.public_url ?? null,
    };
  });
}
