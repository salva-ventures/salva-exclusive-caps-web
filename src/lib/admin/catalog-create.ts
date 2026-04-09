import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";

export function slugifyProductName(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

export async function generateUniqueProductSlug(baseInput: string): Promise<string> {
  const base = slugifyProductName(baseInput) || "producto";

  const { data, error } = await supabaseAdmin
    .from("products")
    .select("slug")
    .ilike("slug", `${base}%`);

  if (error) {
    throw new Error(`No se pudo validar slug unico: ${error.message}`);
  }

  const existing = new Set((data ?? []).map((row) => row.slug));

  if (!existing.has(base)) {
    return base;
  }

  let counter = 2;
  while (existing.has(`${base}-${counter}`)) {
    counter += 1;
  }

  return `${base}-${counter}`;
}

export async function getNextCatalogSortOrders(): Promise<{
  retailSortOrder: number;
  wholesaleSortOrder: number;
}> {
  const { data: retailRows, error: retailError } = await supabaseAdmin
    .from("products")
    .select("retail_sort_order")
    .order("retail_sort_order", { ascending: false })
    .limit(1);

  if (retailError) {
    throw new Error(`No se pudo calcular retail_sort_order: ${retailError.message}`);
  }

  const { data: wholesaleRows, error: wholesaleError } = await supabaseAdmin
    .from("products")
    .select("wholesale_sort_order")
    .order("wholesale_sort_order", { ascending: false })
    .limit(1);

  if (wholesaleError) {
    throw new Error(`No se pudo calcular wholesale_sort_order: ${wholesaleError.message}`);
  }

  return {
    retailSortOrder: (retailRows?.[0]?.retail_sort_order ?? 0) + 1,
    wholesaleSortOrder: (wholesaleRows?.[0]?.wholesale_sort_order ?? 0) + 1,
  };
}