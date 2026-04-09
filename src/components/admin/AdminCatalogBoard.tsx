"use client";

import { useMemo, useState } from "react";

type CatalogProduct = {
  id: string;
  name: string;
  slug: string;
  scopeSortOrder: number;
};

export default function AdminCatalogBoard({
  scope,
  products,
}: {
  scope: "retail" | "wholesale";
  products: CatalogProduct[];
}) {
  const [items, setItems] = useState(products);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const orderedIds = useMemo(() => items.map((item) => item.id), [items]);

  function moveItem(fromId: string, toId: string) {
    if (fromId === toId) return;

    const current = [...items];
    const fromIndex = current.findIndex((item) => item.id === fromId);
    const toIndex = current.findIndex((item) => item.id === toId);

    if (fromIndex === -1 || toIndex === -1) return;

    const [moved] = current.splice(fromIndex, 1);
    current.splice(toIndex, 0, moved);

    setItems(current);
  }

  async function saveOrder() {
    setSaving(true);

    try {
      const response = await fetch("/api/admin/catalog/products/reorder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          scope,
          orderedIds,
        }),
      });

      if (!response.ok) {
        throw new Error("No se pudo guardar el orden.");
      }

      window.location.reload();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "No se pudo guardar el orden.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-white/45">
            Orden visual
          </p>
          <h3 className="mt-1 text-lg font-semibold text-white">
            Reordenar {scope === "retail" ? "menudeo" : "mayoreo"}
          </h3>
        </div>

        <button
          type="button"
          onClick={saveOrder}
          disabled={saving}
          className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? "Guardando..." : "Guardar orden arrastrado"}
        </button>
      </div>

      <p className="mt-3 text-sm text-white/45">
        En desktop puedes arrastrar tarjetas. En celular sigues teniendo botones subir y bajar abajo.
      </p>

      <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            draggable
            onDragStart={() => setDraggedId(item.id)}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => {
              if (draggedId) {
                moveItem(draggedId, item.id);
              }
              setDraggedId(null);
            }}
            onDragEnd={() => setDraggedId(null)}
            className="rounded-2xl border border-white/10 bg-black/20 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">{item.name}</p>
                <p className="mt-1 text-xs text-white/45">{item.slug}</p>
              </div>

              <div className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/70">
                #{index + 1}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-dashed border-white/10 px-3 py-2 text-xs text-white/45">
              Arrastra esta tarjeta
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}