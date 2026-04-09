"use client";

import { useEffect, useMemo, useState } from "react";

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
  const [baseline, setBaseline] = useState(products);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setItems(products);
    setBaseline(products);
  }, [products]);

  const orderedIds = useMemo(() => items.map((item) => item.id), [items]);
  const baselineIds = useMemo(() => baseline.map((item) => item.id), [baseline]);

  const hasPendingChanges =
    orderedIds.length === baselineIds.length &&
    orderedIds.some((id, index) => id !== baselineIds[index]);

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

  function cancelChanges() {
    setItems(baseline);
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

      setBaseline(items);
      window.location.reload();
    } catch (error) {
      window.alert(error instanceof Error ? error.message : "No se pudo guardar el orden.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/45">
              Modo ordenar
            </p>
            <h3 className="mt-1 text-lg font-semibold text-white">
              Reordenar {scope === "retail" ? "menudeo" : "mayoreo"}
            </h3>
            <p className="mt-2 text-sm text-white/45">
              En desktop puedes arrastrar. En celular conserva Subir/Bajar desde modo explorar.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-3 py-1 text-xs ${
                hasPendingChanges
                  ? "bg-yellow-500/15 text-yellow-200"
                  : "bg-white/10 text-white/55"
              }`}
            >
              {hasPendingChanges ? "Hay cambios pendientes" : "Sin cambios pendientes"}
            </span>

            <button
              type="button"
              onClick={cancelChanges}
              disabled={!hasPendingChanges || saving}
              className="rounded-2xl border border-white/10 px-4 py-2 text-sm text-white/85 transition hover:bg-white/[0.04] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Cancelar cambios
            </button>

            <button
              type="button"
              onClick={saveOrder}
              disabled={!hasPendingChanges || saving}
              className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Guardando..." : "Guardar orden"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
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
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-white">
                  {item.name}
                </p>
                <p className="mt-1 text-sm text-white/45">{item.slug}</p>
              </div>

              <div className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/70">
                #{index + 1}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl border border-dashed border-white/10 px-4 py-3">
              <span className="text-sm text-white/55">Arrastra para reordenar</span>
              <span className="text-lg text-white/45">⋮⋮</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}