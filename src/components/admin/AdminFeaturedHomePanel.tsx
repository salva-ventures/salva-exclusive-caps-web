"use client";

import { useEffect, useMemo, useState } from "react";

type FeaturedItem = {
  featured_slot_id: string;
  product_id: string;
  placement: "home";
  sort_order: number;
  is_active: boolean;
  product_name: string;
  product_slug: string;
  primary_image_url: string | null;
};

export default function AdminFeaturedHomePanel({
  scope,
}: {
  scope: "retail" | "wholesale";
}) {
  const [items, setItems] = useState<FeaturedItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  async function loadItems() {
    try {
      setLoading(true);
      const response = await fetch("/api/admin/catalog/featured?placement=home");
      if (!response.ok) return;

      const json = await response.json();
      setItems(json.items ?? []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadItems();
  }, []);

  const orderedProductIds = useMemo(
    () => items.map((item) => item.product_id),
    [items]
  );

  function moveItem(index: number, direction: "up" | "down") {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= items.length) return;

    const next = [...items];
    const [moved] = next.splice(index, 1);
    next.splice(targetIndex, 0, moved);
    setItems(next);
  }

  async function saveOrder() {
    try {
      setSaving(true);

      const response = await fetch("/api/admin/catalog/featured/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          placement: "home",
          orderedProductIds,
        }),
      });

      if (!response.ok) {
        const json = await response.json().catch(() => null);
        throw new Error(json?.error ?? "No se pudo guardar el orden.");
      }

      window.location.href = `/admin/catalog?scope=${scope}&success=featured-reordered`;
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "No se pudo guardar el orden.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="space-y-4 rounded-3xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/45">
            Home
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">
            Destacados configurados
          </h3>
          <p className="mt-1 text-sm text-white/45">
            Controla qué productos aparecen en la página principal y en qué orden.
          </p>
        </div>

        <button
          type="button"
          onClick={saveOrder}
          disabled={saving || items.length === 0}
          className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Guardando..." : "Guardar orden destacados"}
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-white/55">Cargando destacados...</p>
      ) : items.length === 0 ? (
        <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/55">
          Aún no hay productos destacados en home.
        </div>
      ) : (
        <div className="grid gap-3">
          {items.map((item, index) => (
            <article
              key={item.featured_slot_id}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                    {item.primary_image_url ? (
                      <img
                        src={item.primary_image_url}
                        alt={item.product_name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-[10px] text-white/35">Sin imagen</span>
                    )}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {item.product_name}
                    </p>
                    <p className="mt-1 truncate text-xs text-white/45">
                      {item.product_slug}
                    </p>
                    <p className="mt-1 text-xs text-white/40">
                      Posición actual: #{index + 1}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => moveItem(index, "up")}
                    disabled={index === 0}
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/85 transition hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Subir
                  </button>

                  <button
                    type="button"
                    onClick={() => moveItem(index, "down")}
                    disabled={index === items.length - 1}
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/85 transition hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Bajar
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}