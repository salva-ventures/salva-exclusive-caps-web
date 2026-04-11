"use client";

import type {
  CatalogFilterGroup,
  SelectedCatalogFilters,
} from "@/lib/catalog/filter-engine";

export default function CatalogDynamicFilters({
  groups,
  selectedFilters,
  onToggleValue,
  onClearAll,
}: {
  groups: CatalogFilterGroup[];
  selectedFilters: SelectedCatalogFilters;
  onToggleValue: (groupKey: string, value: string) => void;
  onClearAll: () => void;
}) {
  if (!groups.length) return null;

  const selectedCount = Object.values(selectedFilters).reduce(
    (acc, values) => acc + values.length,
    0
  );

  return (
    <section className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-white">Filtros</p>
          <p className="text-xs text-white/55">
            {selectedCount} seleccionado{selectedCount === 1 ? "" : "s"}
          </p>
        </div>

        <button
          type="button"
          onClick={onClearAll}
          className="rounded-xl border border-white/10 px-4 py-2 text-xs text-white/80 transition hover:bg-white/[0.04]"
        >
          Limpiar filtros
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => {
          const selectedValues = selectedFilters[group.key] ?? [];

          return (
            <div
              key={group.key}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-4"
            >
              <p className="text-sm font-semibold text-white">{group.label}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {group.options.length === 0 ? (
                  <span className="text-xs text-white/40">Sin opciones</span>
                ) : (
                  group.options.map((option) => {
                    const active = selectedValues.includes(option);

                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => onToggleValue(group.key, option)}
                        className={`rounded-full px-3 py-1 text-xs transition ${
                          active
                            ? "bg-white text-black"
                            : "border border-white/10 text-white/80 hover:bg-white/[0.04]"
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}