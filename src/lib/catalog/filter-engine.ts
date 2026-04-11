export type CatalogSourceField =
  | "brand_name"
  | "collab_name"
  | "collection_name"
  | "model_name"
  | "rarity_name"
  | "category_name"
  | "team_name"
  | "colorway";

export type CatalogFilterDefinitionLike = {
  key: string;
  label: string;
  source_field: CatalogSourceField;
  sort_order: number;
};

export type CatalogFilterGroup = {
  key: string;
  label: string;
  sourceField: CatalogSourceField;
  options: string[];
};

export type SelectedCatalogFilters = Record<string, string[]>;

export type CatalogFilterableProduct = {
  brand_name?: string | null;
  collab_name?: string | null;
  collection_name?: string | null;
  model_name?: string | null;
  rarity_name?: string | null;
  category_name?: string | null;
  team_name?: string | null;
  colorway?: string | null;
};

export function getCatalogFieldValue(
  product: CatalogFilterableProduct,
  sourceField: CatalogSourceField
): string | null {
  const value = product[sourceField];
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

export function buildCatalogFilterGroups(
  products: CatalogFilterableProduct[],
  definitions: CatalogFilterDefinitionLike[]
): CatalogFilterGroup[] {
  return definitions.map((definition) => {
    const options = Array.from(
      new Set(
        products
          .map((product) => getCatalogFieldValue(product, definition.source_field))
          .filter((value): value is string => Boolean(value))
      )
    ).sort((a, b) => a.localeCompare(b, "es", { sensitivity: "base" }));

    return {
      key: definition.key,
      label: definition.label,
      sourceField: definition.source_field,
      options,
    };
  });
}

export function matchesCatalogFilters(
  product: CatalogFilterableProduct,
  selectedFilters: SelectedCatalogFilters,
  groups: CatalogFilterGroup[]
): boolean {
  for (const group of groups) {
    const selectedValues = selectedFilters[group.key] ?? [];
    if (!selectedValues.length) continue;

    const value = getCatalogFieldValue(product, group.sourceField);
    if (!value || !selectedValues.includes(value)) {
      return false;
    }
  }

  return true;
}