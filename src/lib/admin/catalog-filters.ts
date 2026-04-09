import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";

export type CatalogFilterDefinitionRow = {
  id: string;
  key: string;
  label: string;
  catalog_scope: "retail" | "wholesale" | "both";
  source_field:
    | "brand_name"
    | "collab_name"
    | "collection_name"
    | "model_name"
    | "rarity_name"
    | "category_name"
    | "team_name"
    | "colorway";
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export async function listCatalogFilterDefinitions(): Promise<CatalogFilterDefinitionRow[]> {
  const { data, error } = await supabaseAdmin
    .from("catalog_filter_definitions")
    .select("id, key, label, catalog_scope, source_field, sort_order, is_active, created_at, updated_at")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Error cargando catalog_filter_definitions: ${error.message}`);
  }

  return (data ?? []) as CatalogFilterDefinitionRow[];
}

export function getCatalogFilterSourceFieldOptions() {
  return [
    "brand_name",
    "collab_name",
    "collection_name",
    "model_name",
    "rarity_name",
    "category_name",
    "team_name",
    "colorway",
  ] as const;
}