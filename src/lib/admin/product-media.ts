import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";

export type AdminProductMediaItem = {
  id: string;
  product_id: string;
  public_url: string;
  storage_path: string;
  bucket: string;
  media_type: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  status: string;
  mime_type: string | null;
  file_size_bytes: number | null;
  width: number | null;
  height: number | null;
  duration_seconds: number | null;
  original_filename: string | null;
};

export type AdminProductMediaPageData = {
  id: string;
  slug: string;
  sku: string | null;
  name: string;
  brand_name: string | null;
  collab_name: string | null;
  media: AdminProductMediaItem[];
};

type RawProductRow = {
  id: string;
  slug: string;
  sku: string | null;
  name: string;
  brand_name: string | null;
  collab_name: string | null;
  product_media: AdminProductMediaItem[] | null;
};

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function getAdminProductMedia(
  productId: string
): Promise<AdminProductMediaPageData | null> {
  if (!isUuid(productId)) {
    return null;
  }

  const { data, error } = await supabaseAdmin
    .from("products")
    .select(`
      id,
      slug,
      sku,
      name,
      brand_name,
      collab_name,
      product_media (
        id,
        product_id,
        public_url,
        storage_path,
        bucket,
        media_type,
        alt_text,
        sort_order,
        is_primary,
        status,
        mime_type,
        file_size_bytes,
        width,
        height,
        duration_seconds,
        original_filename
      )
    `)
    .eq("id", productId)
    .maybeSingle();

  if (error) {
    throw new Error(`Error cargando medios del producto: ${error.message}`);
  }

  if (!data) {
    return null;
  }

  const row = data as RawProductRow;

  return {
    id: row.id,
    slug: row.slug,
    sku: row.sku,
    name: row.name,
    brand_name: row.brand_name,
    collab_name: row.collab_name,
    media: (row.product_media ?? []).slice().sort((a, b) => {
      if (a.is_primary && !b.is_primary) return -1;
      if (!a.is_primary && b.is_primary) return 1;
      return a.sort_order - b.sort_order;
    }),
  };
}