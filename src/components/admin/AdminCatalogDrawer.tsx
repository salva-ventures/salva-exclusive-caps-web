"use client";

type CatalogTag = {
  id: string;
  tag: string;
  catalog_scope: "retail" | "wholesale" | "both";
  sort_order: number;
  is_active: boolean;
};

type CatalogProduct = {
  id: string;
  slug: string;
  sku: string | null;
  name: string;
  brand_name: string | null;
  collab_name: string | null;
  category_name: string | null;
  rarity_name: string | null;
  catalog_status: "active" | "draft" | "archived";
  is_retail_visible: boolean;
  is_wholesale_visible: boolean;
  retail_sort_order: number;
  wholesale_sort_order: number;
  retail_price: number | null;
  wholesale_price: number | null;
  retail_label: string | null;
  wholesale_label: string | null;
  primary_image_url: string | null;
  media_count: number;
  tags: CatalogTag[];
};

export default function AdminCatalogDrawer({
  scope,
  product,
  open,
  onClose,
}: {
  scope: "retail" | "wholesale";
  product: CatalogProduct | null;
  open: boolean;
  onClose: () => void;
}) {
  if (!product) return null;

  const visibleTags = product.tags.filter(
    (tag) => tag.catalog_scope === scope || tag.catalog_scope === "both"
  );

  return (
    <>
      <div
        onClick={onClose}
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
                Editor de producto
              </p>
              <h3 className="mt-2 text-xl font-semibold text-white">{product.name}</h3>
              <p className="mt-1 text-sm text-white/45">
                SKU: {product.sku ?? "Sin SKU"} | Slug: {product.slug}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:bg-white/[0.04]"
            >
              Cerrar
            </button>
          </div>
        </div>

        <div className="space-y-6 px-4 py-5 md:px-6">
          <div className="grid gap-4 md:grid-cols-[120px_1fr]">
            <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              {product.primary_image_url ? (
                <img
                  src={product.primary_image_url}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-white/35">
                  Sin imagen
                </div>
              )}
            </div>

            <div className="space-y-2">
              <p className="text-sm text-white/50">
                {product.brand_name ?? "Sin marca"}
                {product.collab_name ? ` | ${product.collab_name}` : ""}
              </p>
              <p className="text-sm text-white/50">
                Medios activos: {product.media_count}
              </p>
              <div className="flex flex-wrap gap-2">
                {visibleTags.map((tag) => (
                  <span
                    key={tag.id}
                    className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
                  >
                    {tag.tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <a
                  href={`/admin/products/${product.id}/media`}
                  className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/85 transition hover:bg-white/[0.06]"
                >
                  Ir a medios
                </a>
              </div>
            </div>
          </div>

          <form
            action="/api/admin/catalog/products/update"
            method="post"
            className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4"
          >
            <input type="hidden" name="id" value={product.id} />
            <input type="hidden" name="scope" value={scope} />

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-white/70">Nombre</label>
                <input
                  name="name"
                  type="text"
                  defaultValue={product.name}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">Status catálogo</label>
                <select
                  name="catalog_status"
                  defaultValue={product.catalog_status}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                >
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-white/70">Precio menudeo</label>
                <input
                  name="retail_price"
                  type="number"
                  step="0.01"
                  defaultValue={product.retail_price ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">Precio mayoreo</label>
                <input
                  name="wholesale_price"
                  type="number"
                  step="0.01"
                  defaultValue={product.wholesale_price ?? ""}
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
                  defaultValue={product.retail_label ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">Label mayoreo</label>
                <input
                  name="wholesale_label"
                  type="text"
                  defaultValue={product.wholesale_label ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/80">
                <input
                  name="is_retail_visible"
                  type="checkbox"
                  defaultChecked={product.is_retail_visible}
                />
                Visible en menudeo
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/80">
                <input
                  name="is_wholesale_visible"
                  type="checkbox"
                  defaultChecked={product.is_wholesale_visible}
                />
                Visible en mayoreo
              </label>
            </div>

            <button
              type="submit"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Guardar cambios
            </button>
          </form>

          <div className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
            <h4 className="text-base font-semibold text-white">Tags visibles</h4>

            <form
              action="/api/admin/catalog/tags/create"
              method="post"
              className="grid gap-3 md:grid-cols-[1fr_170px_auto]"
            >
              <input type="hidden" name="product_id" value={product.id} />
              <input type="hidden" name="scope" value={scope} />

              <input
                name="tag"
                type="text"
                placeholder="Agregar etiqueta visible"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
              />

              <select
                name="catalog_scope"
                defaultValue={scope}
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
              >
                <option value="retail">Solo menudeo</option>
                <option value="wholesale">Solo mayoreo</option>
                <option value="both">Ambos</option>
              </select>

              <button
                type="submit"
                className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-white/85 transition hover:bg-white/[0.04]"
              >
                Agregar tag
              </button>
            </form>

            {visibleTags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {visibleTags.map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
                  >
                    <span>{tag.tag}</span>
                    <form
                      action="/api/admin/catalog/tags/delete"
                      method="post"
                      onSubmit={(e) => {
                        const ok = window.confirm(`Eliminar la tag "${tag.tag}"?`);
                        if (!ok) {
                          e.preventDefault();
                        }
                      }}
                    >
                      <input type="hidden" name="id" value={tag.id} />
                      <input type="hidden" name="scope" value={scope} />
                      <button
                        type="submit"
                        className="text-white/55 hover:text-white"
                      >
                        ×
                      </button>
                    </form>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}