"use client";

import { useMemo, useState } from "react";

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

function formatPrice(value: number | null) {
  if (value === null) return "-";
  return `$${value.toFixed(2)}`;
}

function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "green" | "yellow" | "red" | "blue";
}) {
  const toneClasses =
    tone === "green"
      ? "bg-green-500/15 text-green-300"
      : tone === "yellow"
      ? "bg-yellow-500/15 text-yellow-200"
      : tone === "red"
      ? "bg-red-500/15 text-red-200"
      : tone === "blue"
      ? "bg-blue-500/15 text-blue-300"
      : "bg-white/10 text-white/70";

  return (
    <span className={`rounded-full px-3 py-1 text-[11px] ${toneClasses}`}>
      {children}
    </span>
  );
}

export default function AdminCatalogList({
  scope,
  products,
}: {
  scope: "retail" | "wholesale";
  products: CatalogProduct[];
}) {
  const [openId, setOpenId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const visibleProducts = useMemo(() => products, [products]);

  function toggleSelected(id: string) {
    setSelectedIds((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  function toggleAll() {
    if (selectedIds.length === visibleProducts.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(visibleProducts.map((product) => product.id));
    }
  }

  return (
    <div className="grid gap-4">
      {visibleProducts.length > 0 && (
        <form
          action="/api/admin/catalog/products/bulk"
          method="post"
          className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 md:p-5"
        >
          <input type="hidden" name="scope" value={scope} />

          {selectedIds.map((id) => (
            <input key={id} type="hidden" name="product_ids" value={id} />
          ))}

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={toggleAll}
                className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/85 transition hover:bg-white/[0.06]"
              >
                {selectedIds.length === visibleProducts.length ? "Quitar todos" : "Seleccionar todos"}
              </button>

              <span className="text-sm text-white/55">
                Seleccionados: {selectedIds.length}
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <select
                name="bulk_action"
                defaultValue="set-active"
                className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none"
              >
                <option value="set-active">Poner activos</option>
                <option value="set-draft">Mandar a draft</option>
                <option value="set-archived">Archivar</option>
                <option value="show-retail">Mostrar en menudeo</option>
                <option value="hide-retail">Ocultar en menudeo</option>
                <option value="show-wholesale">Mostrar en mayoreo</option>
                <option value="hide-wholesale">Ocultar en mayoreo</option>
              </select>

              <button
                type="submit"
                disabled={selectedIds.length === 0}
                className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
              >
                Ejecutar acción masiva
              </button>
            </div>
          </div>
        </form>
      )}

      {visibleProducts.map((product) => {
        const visible = scope === "retail" ? product.is_retail_visible : product.is_wholesale_visible;
        const sortOrder = scope === "retail" ? product.retail_sort_order : product.wholesale_sort_order;
        const scopePrice = scope === "retail" ? product.retail_price : product.wholesale_price;
        const scopeLabel = scope === "retail" ? product.retail_label : product.wholesale_label;
        const visibleTags = product.tags.filter(
          (tag) => tag.catalog_scope === scope || tag.catalog_scope === "both"
        );
        const isOpen = openId === product.id;
        const isSelected = selectedIds.includes(product.id);

        return (
          <article
            key={product.id}
            className={`rounded-3xl border p-4 md:p-5 ${
              isSelected
                ? "border-white/30 bg-white/[0.05]"
                : "border-white/10 bg-white/[0.03]"
            }`}
          >
            <div className="grid gap-4 md:grid-cols-[108px_1fr]">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-sm text-white/75">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => toggleSelected(product.id)}
                  />
                  Seleccionar
                </label>

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
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0">
                    <p className="truncate text-lg font-semibold text-white">
                      {product.name}
                    </p>
                    <p className="mt-1 text-sm text-white/50">
                      SKU: {product.sku ?? "Sin SKU"} | Slug: {product.slug}
                    </p>
                    <p className="mt-1 text-sm text-white/45">
                      {product.brand_name ?? "Sin marca"}
                      {product.collab_name ? ` | ${product.collab_name}` : ""}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge tone={visible ? "green" : "red"}>
                      {visible ? "Visible" : "Oculto"}
                    </Badge>
                    <Badge tone={product.catalog_status === "active" ? "green" : product.catalog_status === "draft" ? "yellow" : "red"}>
                      {product.catalog_status}
                    </Badge>
                    <Badge tone="blue">Orden #{sortOrder}</Badge>
                    <Badge>{scope === "retail" ? "Menudeo" : "Mayoreo"}</Badge>
                  </div>
                </div>

                <div className="grid gap-3 md:grid-cols-4">
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/40">
                      Precio actual
                    </p>
                    <p className="mt-2 text-base font-semibold text-white">
                      {formatPrice(scopePrice)}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/40">
                      Label actual
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      {scopeLabel ?? "-"}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/40">
                      Medios activos
                    </p>
                    <p className="mt-2 text-base font-semibold text-white">
                      {product.media_count}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-white/40">
                      Tags visibles
                    </p>
                    <p className="mt-2 text-base font-semibold text-white">
                      {visibleTags.length}
                    </p>
                  </div>
                </div>

                {visibleTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {visibleTags.slice(0, 6).map((tag) => (
                      <Badge key={tag.id}>{tag.tag}</Badge>
                    ))}
                    {visibleTags.length > 6 && (
                      <Badge tone="yellow">+{visibleTags.length - 6} más</Badge>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : product.id)}
                    className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
                  >
                    {isOpen ? "Cerrar editor" : "Editar"}
                  </button>

                  <a
                    href={`/admin/products/${product.id}/media`}
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/85 transition hover:bg-white/[0.06]"
                  >
                    Medios
                  </a>

                  <form action="/api/admin/catalog/products/move" method="post">
                    <input type="hidden" name="id" value={product.id} />
                    <input type="hidden" name="scope" value={scope} />
                    <input type="hidden" name="direction" value="up" />
                    <button
                      type="submit"
                      className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/85 transition hover:bg-white/[0.06]"
                    >
                      Subir
                    </button>
                  </form>

                  <form action="/api/admin/catalog/products/move" method="post">
                    <input type="hidden" name="id" value={product.id} />
                    <input type="hidden" name="scope" value={scope} />
                    <input type="hidden" name="direction" value="down" />
                    <button
                      type="submit"
                      className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/85 transition hover:bg-white/[0.06]"
                    >
                      Bajar
                    </button>
                  </form>
                </div>

                {isOpen && (
                  <div className="grid gap-4 rounded-2xl border border-white/10 bg-black/20 p-4 md:p-5">
                    <form
                      action="/api/admin/catalog/products/update"
                      method="post"
                      className="grid gap-4"
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

                    <div className="grid gap-3">
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
                              <form action="/api/admin/catalog/tags/delete" method="post">
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
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}