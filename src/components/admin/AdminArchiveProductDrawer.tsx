"use client";

import { useState } from "react";

type CatalogProduct = {
  id: string;
  name: string;
  slug: string;
  catalog_status: "active" | "draft" | "archived";
};

export default function AdminArchiveProductDrawer({
  scope,
  product,
}: {
  scope: "retail" | "wholesale";
  product: CatalogProduct;
}) {
  const [open, setOpen] = useState(false);

  const isArchived = product.catalog_status === "archived";
  const action = isArchived ? "restore" : "archive";
  const confirmWord = isArchived ? "RESTAURAR" : "ARCHIVAR";

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className={`rounded-xl px-4 py-2 text-sm transition ${
          isArchived
            ? "border border-green-500/20 bg-green-500/10 text-green-200 hover:bg-green-500/15"
            : "border border-red-500/20 bg-red-500/10 text-red-200 hover:bg-red-500/15"
        }`}
      >
        {isArchived ? "Restaurar" : "Archivar"}
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
                {isArchived ? "Restaurar producto" : "Archivar producto"}
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">
                {product.name}
              </h3>
              <p className="mt-1 text-sm text-white/45">
                Slug: {product.slug}
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
            action="/api/admin/catalog/products/toggle-archive"
            method="post"
            className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <input type="hidden" name="scope" value={scope} />
            <input type="hidden" name="product_id" value={product.id} />
            <input type="hidden" name="archive_action" value={action} />

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/75">
              {isArchived ? (
                <>
                  Este producto se restaurará como <strong>draft</strong> y quedará
                  <strong> oculto en menudeo y mayoreo</strong> para evitar publicarlo por accidente.
                </>
              ) : (
                <>
                  Este producto se archivará y quedará
                  <strong> oculto en menudeo y mayoreo</strong>.
                </>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/70">
                Escribe exactamente <strong>{confirmWord}</strong> para confirmar
              </label>
              <input
                name="confirm_word"
                type="text"
                placeholder={confirmWord}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                required
              />
            </div>

            <button
              type="submit"
              className={`rounded-2xl px-5 py-3 text-sm font-medium transition ${
                isArchived
                  ? "bg-green-500/90 text-white hover:bg-green-500"
                  : "bg-red-500/90 text-white hover:bg-red-500"
              }`}
            >
              {isArchived ? "Restaurar producto" : "Archivar producto"}
            </button>
          </form>
        </div>
      </aside>
    </>
  );
}