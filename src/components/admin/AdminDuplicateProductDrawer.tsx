"use client";

import { useMemo, useState } from "react";

type CatalogProduct = {
  id: string;
  name: string;
  slug: string;
};

function slugify(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

export default function AdminDuplicateProductDrawer({
  scope,
  product,
}: {
  scope: "retail" | "wholesale";
  product: CatalogProduct;
}) {
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState(`${product.name} Copia`);
  const suggestedSlug = useMemo(() => slugify(newName), [newName]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/85 transition hover:bg-white/[0.06]"
      >
        Duplicar
      </button>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-40 bg-black/60 transition ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-full w-full max-w-xl overflow-y-auto border-l border-white/10 bg-[#070707] shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="sticky top-0 z-10 border-b border-white/10 bg-[#070707]/95 backdrop-blur">
          <div className="flex items-start justify-between gap-4 px-4 py-4 md:px-6">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-white/45">
                Duplicar producto
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-white/45">
                Se copiarán datos de catálogo. Los medios no se duplican todavía.
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
            action="/api/admin/catalog/products/duplicate"
            method="post"
            className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <input type="hidden" name="scope" value={scope} />
            <input type="hidden" name="source_product_id" value={product.id} />

            <div>
              <label className="mb-2 block text-sm text-white/70">Nuevo nombre</label>
              <input
                name="new_name"
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">Nuevo slug</label>
              <input
                name="new_slug"
                type="text"
                defaultValue={suggestedSlug}
                placeholder="se-genera-si-lo-dejas-vacio"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
              />
              <p className="mt-2 text-xs text-white/45">
                Sugerido: {suggestedSlug || "-"}
              </p>
            </div>

            <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/80">
              <input
                name="copy_tags"
                type="checkbox"
                defaultChecked
              />
              Copiar tags visibles del producto original
            </label>

            <button
              type="submit"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Duplicar producto
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}