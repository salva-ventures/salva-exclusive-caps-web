import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";

export type AdminCatalogScope = "retail" | "wholesale";

export type AdminCatalogStatus = "active" | "draft" | "archived";

export type AdminCatalogProductRow = {
  id: string;
  slug: string;
  sku: string | null;
  name: string;
  brand_name: string | null;
  collab_name: string | null;
  category_name: string | null;
  rarity_name: string | null;
  catalog_status: AdminCatalogStatus;
  is_retail_visible: boolean;
  is_wholesale_visible: boolean;
  retail_sort_order: number;
  wholesale_sort_order: number;
  retail_price: number | null;
  wholesale_price: number | null;
  retail_label: string | null;
  wholesale_label: string | null;
  primary_image_url: string | null;
  media_count: number;
};

type RawRow = {
  id: string;
  slug: string;
  sku: string | null;
  name: string;
  brand_name: string | null;
  collab_name: string | null;
  category_name: string | null;
  rarity_name: string | null;
  catalog_status: AdminCatalogStatus;
  is_retail_visible: boolean;
  is_wholesale_visible: boolean;
  retail_sort_order: number;
  wholesale_sort_order: number;
  retail_price: string | number | null;
  wholesale_price: string | number | null;
  retail_label: string | null;
  wholesale_label: string | null;
  product_media:
    | Array<{
        public_url: string;
        is_primary: boolean;
        sort_order: number;
        media_type: string;
        status: string;
      }>
    | null;
};

export type AdminCatalogFilters = {
  scope: AdminCatalogScope;
  q?: string;
  status?: "all" | AdminCatalogStatus;
  visibility?: "all" | "visible" | "hidden";
};

function toNumberOrNull(value: string | number | null): number | null {
  if (value === null || value === undefined || value === "") {
    return null;
  }

  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

export async function listAdminCatalogProducts(
  filters: AdminCatalogFilters
): Promise<AdminCatalogProductRow[]> {
  const { data, error } = await supabaseAdmin
    .from("products")
    .select(`
      id,
      slug,
      sku,
      name,
      brand_name,
      collab_name,
      category_name,
      rarity_name,
      catalog_status,
      is_retail_visible,
      is_wholesale_visible,
      retail_sort_order,
      wholesale_sort_order,
      retail_price,
      wholesale_price,
      retail_label,
      wholesale_label,
      product_media (
        public_url,
        is_primary,
        sort_order,
        media_type,
        status
      )
    `);

  if (error) {
    throw new Error(`Error cargando catalog products: ${error.message}`);
  }

  const rows = ((data ?? []) as RawRow[]).map((row) => {
    const activeMedia = (row.product_media ?? [])
      .filter((media) => media.status === "active")
      .sort((a, b) => {
        if (a.is_primary && !b.is_primary) return -1;
        if (!a.is_primary && b.is_primary) return 1;
        return a.sort_order - b.sort_order;
      });

    const primaryImage =
      activeMedia.find((media) => media.media_type === "image" && media.is_primary) ??
      activeMedia.find((media) => media.media_type === "image") ??
      null;

    return {
      id: row.id,
      slug: row.slug,
      sku: row.sku,
      name: row.name,
      brand_name: row.brand_name,
      collab_name: row.collab_name,
      category_name: row.category_name,
      rarity_name: row.rarity_name,
      catalog_status: row.catalog_status,
      is_retail_visible: row.is_retail_visible,
      is_wholesale_visible: row.is_wholesale_visible,
      retail_sort_order: row.retail_sort_order,
      wholesale_sort_order: row.wholesale_sort_order,
      retail_price: toNumberOrNull(row.retail_price),
      wholesale_price: toNumberOrNull(row.wholesale_price),
      retail_label: row.retail_label,
      wholesale_label: row.wholesale_label,
      primary_image_url: primaryImage?.public_url ?? null,
      media_count: activeMedia.length,
    };
  });

  const q = (filters.q ?? "").trim().toLowerCase();
  const status = filters.status ?? "all";
  const visibility = filters.visibility ?? "all";
  const scope = filters.scope;

  const filtered = rows.filter((row) => {
    const scopeVisible =
      scope === "retail" ? row.is_retail_visible : row.is_wholesale_visible;

    const matchesQ =
      !q ||
      row.name.toLowerCase().includes(q) ||
      row.slug.toLowerCase().includes(q) ||
      (row.sku ?? "").toLowerCase().includes(q) ||
      (row.brand_name ?? "").toLowerCase().includes(q) ||
      (row.collab_name ?? "").toLowerCase().includes(q);

    const matchesStatus = status === "all" || row.catalog_status === status;

    const matchesVisibility =
      visibility === "all" ||
      (visibility === "visible" && scopeVisible) ||
      (visibility === "hidden" && !scopeVisible);

    return matchesQ && matchesStatus && matchesVisibility;
  });

  return filtered.sort((a, b) => {
    const aSort = scope === "retail" ? a.retail_sort_order : a.wholesale_sort_order;
    const bSort = scope === "retail" ? b.retail_sort_order : b.wholesale_sort_order;
    return aSort - bSort;
  });
}