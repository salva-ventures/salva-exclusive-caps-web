"use client";

import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase/client";

type RawChannel = {
  channel: "retail" | "wholesale";
  price: number | null;
  availability_status: string;
  is_enabled: boolean;
  is_visible: boolean;
};

type RawInventory = {
  stock_on_hand: number;
  stock_reserved: number;
  stock_available: number;
};

type RawImage = {
  public_url: string;
  alt_text: string | null;
  sort_order: number;
  is_primary: boolean;
  media_type: string;
  status: string;
};

type RawProduct = {
  id: string;
  slug: string;
  name: string;
  has_nfc: boolean;
  includes_box: boolean;
  includes_dust_protector: boolean;
  rarity_name: string | null;
  rarity_color: string | null;
  product_channels: RawChannel[];
  inventory: RawInventory[];
  product_media: RawImage[];
};

type CatalogItem = {
  id: string;
  slug: string;
  name: string;
  has_nfc: boolean;
  includes_box: boolean;
  includes_dust_protector: boolean;
  rarity_name: string | null;
  rarity_color: string | null;
  price: number | null;
  availability_status: string;
  stock_available: number;
  image_url: string | null;
  image_alt: string;
};

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
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [nfcFilter, setNfcFilter] = useState<"all" | "with" | "without">("all");
  const [stockFilter, setStockFilter] = useState<"all" | "available" | "soldout">("all");
  const [rarityFilter, setRarityFilter] = useState<"all" | "Selecta" | "Destacada" | "Elite" | "Legendaria">("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  async function fetchCatalog() {
    setError(null);

    const { data, error } = await supabase
      .from("products")
      .select(`
        id,
        slug,
        name,
        has_nfc,
        includes_box,
        includes_dust_protector,
        rarity_name,
        rarity_color,
        product_channels!inner (
          channel,
          price,
          availability_status,
          is_enabled,
          is_visible
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
      `)
      .eq("is_active", true)
      .eq("product_channels.channel", "retail")
      .eq("product_channels.is_enabled", true)
      .eq("product_channels.is_visible", true);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    const mapped: CatalogItem[] = ((data ?? []) as unknown as RawProduct[]).map((row) => {
      const channel = Array.isArray(row.product_channels) ? row.product_channels[0] : null;
      const inventory = Array.isArray(row.inventory) ? row.inventory[0] : null;

      const sortedImages = Array.isArray(row.product_media)
        ? row.product_media
            .filter((img) => img.media_type === "image" && img.status === "active")
            .sort((a, b) => {
              if (a.is_primary && !b.is_primary) return -1;
              if (!a.is_primary && b.is_primary) return 1;
              return a.sort_order - b.sort_order;
            })
        : [];

      const firstImage = sortedImages[0] ?? null;

      return {
        id: row.id,
        slug: row.slug,
        name: row.name,
        has_nfc: row.has_nfc,
        includes_box: row.includes_box,
        includes_dust_protector: row.includes_dust_protector,
        rarity_name: row.rarity_name,
        rarity_color: row.rarity_color,
        price: channel?.price ?? null,
        availability_status: channel?.availability_status ?? "unavailable",
        stock_available: inventory?.stock_available ?? 0,
        image_url: firstImage?.public_url ?? null,
        image_alt: firstImage?.alt_text ?? row.name,
      };
    });

    setItems(mapped);
    setLoading(false);
  }

  useEffect(() => {
    void fetchCatalog();

    const channel = supabase
      .channel("catalogo-menudeo-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "products" }, () => void fetchCatalog())
      .on("postgres_changes", { event: "*", schema: "public", table: "product_channels" }, () => void fetchCatalog())
      .on("postgres_changes", { event: "*", schema: "public", table: "inventory" }, () => void fetchCatalog())
      .on("postgres_changes", { event: "*", schema: "public", table: "product_media" }, () => void fetchCatalog())
      .subscribe();

    return () => {
      void supabase.removeChannel(channel);
    };
  }, []);

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
      });

    result.sort((a, b) => {
      if (sortBy === "price-asc") return (a.price ?? 999999) - (b.price ?? 999999);
      if (sortBy === "price-desc") return (b.price ?? 0) - (a.price ?? 0);
      if (sortBy === "name-asc") return a.name.localeCompare(b.name, "es");
      if (sortBy === "stock-desc") return b.stock_available - a.stock_available;

      const stockDiff = Number(b.stock_available > 0) - Number(a.stock_available > 0);
      if (stockDiff !== 0) return stockDiff;

      const rarityDiff = rarityRank(b.rarity_name) - rarityRank(a.rarity_name);
      if (rarityDiff !== 0) return rarityDiff;

      return a.name.localeCompare(b.name, "es");
    });

    return result;
  }, [items, nfcFilter, rarityFilter, search, sortBy, stockFilter]);

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
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/40"
          />

          <select
            value={nfcFilter}
            onChange={(e) => setNfcFilter(e.target.value as typeof nfcFilter)}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
          >
            <option value="all">Todas las piezas</option>
            <option value="with">Con NFC</option>
            <option value="without">Sin NFC</option>
          </select>

          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value as typeof stockFilter)}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
          >
            <option value="all">Todo el stock</option>
            <option value="available">Disponibles</option>
            <option value="soldout">Agotadas</option>
          </select>

          <select
            value={rarityFilter}
            onChange={(e) => setRarityFilter(e.target.value as typeof rarityFilter)}
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
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none"
          >
            <option value="featured">Orden recomendado</option>
            <option value="price-asc">Precio: menor a mayor</option>
            <option value="price-desc">Precio: mayor a menor</option>
            <option value="name-asc">Nombre A-Z</option>
            <option value="stock-desc">Mayor stock</option>
          </select>
        </div>

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
                <div className="aspect-square w-full bg-white/5">
                  {item.image_url ? (
                    <img
                      src={item.image_url}
                      alt={item.image_alt}
                      className="h-full w-full object-cover"
                    />
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