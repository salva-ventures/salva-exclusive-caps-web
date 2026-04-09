"use client";

import { useMemo, useState } from "react";

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

export default function AdminCreateProductDrawer({
  scope,
}: {
  scope: "retail" | "wholesale";
}) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const suggestedSlug = useMemo(() => slugify(name), [name]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
      >
        Nuevo producto
      </button>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 transition ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-2xl overflow-y-auto border-l border-white/10 bg-[#070707] shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 z-10 border-b border-white/10 bg-[#070707]/95 backdrop-blur">
          <div className="flex items-start justify-between gap-4 px-4 py-4 md:px-6">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                Crear producto
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                Nuevo producto de catálogo
              </h3>
              <p className="mt-1 text-sm text-white/45">
                Completa lo esencial. Luego podrás pasar a medios y demás ajustes.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:bg-white/[0.04]"
            >
              Cerrar
            </button>
          </div>
        </div>

        <div className="px-4 py-5 md:px-6">
          <form
            action="/api/admin/catalog/products/create"
            method="post"
            className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <input type="hidden" name="scope" value={scope} />

            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-white/70">Nombre</label>
                <input
                  name="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Dandy Hats x Canelo Álvarez"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">Slug</label>
                <input
                  name="slug"
                  type="text"
                  defaultValue={suggestedSlug}
                  placeholder="se-genera-solo-si-lo-dejas-vacio"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                />
                <p className="mt-2 text-xs text-white/45">
                  Sugerido: {suggestedSlug || "-"}
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">SKU</label>
                <input
                  name="sku"
                  type="text"
                  placeholder="Opcional"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-white/70">Marca</label>
                <input
                  name="brand_name"
                  type="text"
                  placeholder="Ej. Dandy Hats"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">Colaboración</label>
                <input
                  name="collab_name"
                  type="text"
                  placeholder="Ej. Canelo Álvarez"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">Categoría</label>
                <input
                  name="category_name"
                  type="text"
                  placeholder="Ej. Box / Deportes / Premium"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">Rareza</label>
                <input
                  name="rarity_name"
                  type="text"
                  placeholder="Ej. Especial / Limitada"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-white/70">Precio menudeo</label>
                <input
                  name="retail_price"
                  type="number"
                  step="0.01"
                  placeholder="Ej. 749.00"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">Precio mayoreo</label>
                <input
                  name="wholesale_price"
                  type="number"
                  step="0.01"
                  placeholder="Ej. 0.00 o vacío"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-white/70">Label menudeo</label>
                <input
                  name="retail_label"
                  type="text"
                  placeholder="Ej. Disponible"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">Label mayoreo</label>
                <input
                  name="wholesale_label"
                  type="text"
                  placeholder="Ej. Precio sujeto a cotización"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">Status catálogo</label>
              <select
                name="catalog_status"
                defaultValue="draft"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/80">
                <input
                  name="is_retail_visible"
                  type="checkbox"
                  defaultChecked={scope === "retail"}
                />
                Visible en menudeo
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/80">
                <input
                  name="is_wholesale_visible"
                  type="checkbox"
                  defaultChecked={scope === "wholesale"}
                />
                Visible en mayoreo
              </label>
            </div>

            <button
              type="submit"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Crear producto
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}