"use client";

import Image from "next/image";

import { useEffect, useMemo, useRef, useState } from "react";
import CatalogDynamicFilters from "@/components/catalog/CatalogDynamicFilters";
import {
  matchesCatalogFilters,
  type CatalogFilterGroup,
  type SelectedCatalogFilters,
} from "@/lib/catalog/filter-engine";
import { fetchPublicCatalog, type PublicCatalogItem } from "@/lib/catalog/public-catalog";
import { trackClientEvent } from "@/lib/analytics/track-client";

type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "name-asc"
  | "stock-desc";

function formatPrice(price: number | null) {
  if (price === null) return "Precio por definir";
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(price);
}

function rarityClasses(color: string | null) {
  switch (color) {
    case "green":
      return "bg-green-500/15 text-green-300 border-green-500/30";
    case "blue":
      return "bg-blue-500/15 text-blue-300 border-blue-500/30";
    case "purple":
      return "bg-purple-500/15 text-purple-300 border-purple-500/30";
    case "gold":
      return "bg-yellow-500/15 text-yellow-300 border-yellow-500/30";
    default:
      return "bg-white/5 text-white/70 border-white/10";
  }
}

function getAvailabilityLabel(status: string, stockAvailable: number) {
  if (stockAvailable > 0) return `Disponible: ${stockAvailable}`;

  switch (status) {
    case "coming_soon":
      return "Disponible próximamente";
    case "backorder":
      return "Resurtido en proceso";
    default:
      return "Agotada por el momento";
  }
}

function normalize(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

function rarityRank(rarityName: string | null) {
  switch (rarityName) {
    case "Legendaria":
      return 4;
    case "Elite":
      return 3;
    case "Destacada":
      return 2;
    case "Selecta":
      return 1;
    default:
      return 0;
  }
}

export default function CatalogoMenudeoRealtime() {
  const [items, setItems] = useState<PublicCatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [dynamicFilterGroups, setDynamicFilterGroups] = useState<CatalogFilterGroup[]>([]);
  const [selectedDynamicFilters, setSelectedDynamicFilters] = useState<SelectedCatalogFilters>({});

  const [search, setSearch] = useState("");
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [nfcFilter, setNfcFilter] = useState<"all" | "with" | "without">("all");
  const [stockFilter, setStockFilter] = useState<"all" | "available" | "soldout">("all");
  const [rarityFilter, setRarityFilter] = useState<"all" | "Selecta" | "Destacada" | "Elite" | "Legendaria">("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  async function loadCatalog() {
    try {
      setError(null);
      const data = await fetchPublicCatalog("retail");
      setItems(data);

      if (data.length > 0) {
        trackClientEvent({
          eventType: "catalog_view",
          entityType: "catalog",
          entitySlug: "menudeo",
          pagePath: "/catalogo/menudeo",
          pageTitle: "Catálogo Menudeo",
          eventData: {
            item_count: data.length,
          },
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadCatalog();
  }, []);

  
  useEffect(() => {
    let cancelled = false;

    async function loadFilters() {
      try {
        const response = await fetch("/api/catalog/filters?scope=retail");
        if (!response.ok) return;

        const json = await response.json();

        if (!cancelled) {
          setDynamicFilterGroups(json.groups ?? []);
        }
      } catch {
      }
    }

    loadFilters();

    return () => {
      cancelled = true;
    };
  }, []);

  function toggleDynamicFilter(groupKey: string, value: string) {
    setSelectedDynamicFilters((current) => {
      const existing = current[groupKey] ?? [];
      const nextValues = existing.includes(value)
        ? existing.filter((item) => item !== value)
        : [...existing, value];

      return {
        ...current,
        [groupKey]: nextValues,
      };
    });
  }

  function clearDynamicFilters() {
    setSelectedDynamicFilters({});
  }

  const rarityOptions = useMemo(() => {
    const unique = new Set<string>();
    items.forEach((item) => {
      if (item.rarity_name) unique.add(item.rarity_name);
    });
    return Array.from(unique).sort((a, b) => rarityRank(b) - rarityRank(a));
  }, [items]);

  const filteredItems = useMemo(() => {
    const normalizedSearch = normalize(search.trim());

    const result = items
      .filter((item) => {
        if (!normalizedSearch) return true;
        return normalize(item.name).includes(normalizedSearch);
      })
      .filter((item) => {
        if (nfcFilter === "with") return item.has_nfc;
        if (nfcFilter === "without") return !item.has_nfc;
        return true;
      })
      .filter((item) => {
        if (stockFilter === "available") return item.stock_available > 0;
        if (stockFilter === "soldout") return item.stock_available <= 0;
        return true;
      })
      .filter((item) => {
        if (rarityFilter === "all") return true;
        return item.rarity_name === rarityFilter;
      })
      .filter((item) =>
        matchesCatalogFilters(item, selectedDynamicFilters, dynamicFilterGroups)
      );

    result.sort((a, b) => {
      if (sortBy === "price-asc") return (a.price ?? 999999) - (b.price ?? 999999);
      if (sortBy === "price-desc") return (b.price ?? 0) - (a.price ?? 0);
      if (sortBy === "name-asc") return a.name.localeCompare(b.name, "es");
      if (sortBy === "stock-desc") return b.stock_available - a.stock_available;

      return a.sort_order - b.sort_order;
    });

    return result;
  }, [items, nfcFilter, rarityFilter, search, sortBy, stockFilter, selectedDynamicFilters, dynamicFilterGroups]);

  const summary = useMemo(() => {
    const total = items.length;
    const available = items.filter((item) => item.stock_available > 0).length;
    const soldOut = items.filter((item) => item.stock_available <= 0).length;

    return { total, available, soldOut };
  }, [items]);

  if (loading) {
    return (
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-white/70">Cargando catálogo...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-6 py-12">
        <div className="mx-auto max-w-7xl">
          <p className="text-red-300">Error cargando catálogo: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold text-white">Catálogo menudeo</h1>
          <p className="text-white/70">
            Todas las piezas incluyen caja protectora y protector contra polvo y suciedad.
          </p>
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-white/80">
              Modelos: {summary.total}
            </span>
            <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-green-300">
              Disponibles: {summary.available}
            </span>
            <span className="rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-red-300">
              Agotadas: {summary.soldOut}
            </span>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <input
            type="text"
            placeholder="Buscar gorra..."
            value={search}
            onChange={(e) => {
              const value = e.target.value;
              setSearch(value);

              if (searchTimeoutRef.current) {
                clearTimeout(searchTimeoutRef.current);
              }

              searchTimeoutRef.current = setTimeout(() => {
                if (value.trim().length > 1) {
                  trackClientEvent({
                    eventType: "search_performed",
                    entityType: "catalog",
                    entitySlug: "menudeo",
                    searchQuery: value,
                    eventData: {
                      source: "catalog-search",
                    },
                  });
                }
              }, 500);
            }}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
          />

          <select
            value={nfcFilter}
            onChange={(e) => {
              const value = e.target.value as typeof nfcFilter;
              setNfcFilter(value);

              trackClientEvent({
                eventType: "filter_applied",
                entityType: "catalog",
                entitySlug: "menudeo",
                eventData: {
                  filter: "nfc",
                  value,
                },
              });
            }}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
          >
            <option value="all">Todas las piezas</option>
            <option value="with">Con NFC</option>
            <option value="without">Sin NFC</option>
          </select>

          <select
            value={stockFilter}
            onChange={(e) => {
              const value = e.target.value as typeof stockFilter;
              setStockFilter(value);

              trackClientEvent({
                eventType: "filter_applied",
                entityType: "catalog",
                entitySlug: "menudeo",
                eventData: {
                  filter: "stock",
                  value,
                },
              });
            }}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
          >
            <option value="all">Todo el stock</option>
            <option value="available">Disponibles</option>
            <option value="soldout">Agotadas</option>
          </select>

          <select
            value={rarityFilter}
            onChange={(e) => {
              const value = e.target.value as typeof rarityFilter;
              setRarityFilter(value);

              trackClientEvent({
                eventType: "filter_applied",
                entityType: "catalog",
                entitySlug: "menudeo",
                eventData: {
                  filter: "rarity",
                  value,
                },
              });
            }}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
          >
            <option value="all">Todos los niveles</option>
            {rarityOptions.map((rarity) => (
              <option key={rarity} value={rarity}>
                {rarity}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => {
              const value = e.target.value as SortOption;
              setSortBy(value);

              trackClientEvent({
                eventType: "filter_applied",
                entityType: "catalog",
                entitySlug: "menudeo",
                eventData: {
                  filter: "sort",
                  value,
                },
              });
            }}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
          >
            <option value="featured">Orden recomendado</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name-asc">Nombre A-Z</option>
            <option value="stock-desc">Mayor stock</option>
          </select>
        </div>

        <CatalogDynamicFilters
          groups={dynamicFilterGroups}
          selectedFilters={selectedDynamicFilters}
          onToggleValue={toggleDynamicFilter}
          onClearAll={clearDynamicFilters}
        />

        <div className="text-sm text-white/50">
          Resultados: {filteredItems.length}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => {
            const soldOut = item.stock_available <= 0;
            const statusLabel = getAvailabilityLabel(item.availability_status, item.stock_available);

            return (
              <article
                key={item.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-black/30 backdrop-blur"
              >
                <div onClick={() => trackClientEvent({ eventType: "product_view", entityType: "product", entityId: item.id, entitySlug: item.slug, eventData: { name: item.name, price: item.price, in_stock: item.stock_available > 0 } })} className="aspect-square w-full bg-white/5 cursor-pointer">
                  {item.image_url ? (
                    <Image src={item.image_url} alt={item.image_alt} width={800} height={800} className="h-full w-full object-cover" sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-white/40">
                      Sin imagen
                    </div>
                  )}
                </div>

                <div className="space-y-4 p-5">
                  <div className="flex flex-wrap gap-2">
                    {item.rarity_name ? (
                      <span className={`rounded-full border px-2.5 py-1 text-xs font-medium ${rarityClasses(item.rarity_color)}`}>
                        {item.rarity_name}
                      </span>
                    ) : null}

                    {item.has_nfc ? (
                      <span className="rounded-full border border-cyan-500/30 bg-cyan-500/15 px-2.5 py-1 text-xs font-medium text-cyan-300">
                        NFC
                      </span>
                    ) : (
                      <span className="rounded-full border border-orange-500/30 bg-orange-500/15 px-2.5 py-1 text-xs font-medium text-orange-300">
                        Sin NFC
                      </span>
                    )}

                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">
                      Caja protectora
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/70">
                      Protector polvo
                    </span>

                    {item.label ? (
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-white/85">
                        {item.label}
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-white">{item.name}</h2>
                    <p className="mt-2 text-base font-medium text-white/85">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-medium ${
                        soldOut
                          ? "bg-red-500/15 text-red-300"
                          : "bg-green-500/15 text-green-300"
                      }`}
                    >
                      {statusLabel}
                    </span>

                    <button
                      type="button"
                      disabled={soldOut}
                      className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                        soldOut
                          ? "cursor-not-allowed bg-white/5 text-white/35"
                          : "bg-white text-black hover:bg-white/90"
                      }`}
                    >
                      {soldOut ? "No disponible" : "Agregar al carrito"}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}







