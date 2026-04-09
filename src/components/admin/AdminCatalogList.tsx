"use client";

import { useMemo, useState } from "react";
import AdminCatalogDrawer from "@/components/admin/AdminCatalogDrawer";
import AdminDuplicateProductDrawer from "@/components/admin/AdminDuplicateProductDrawer";

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

type WorkMode = "explore" | "select";

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
  mode,
}: {
  scope: "retail" | "wholesale";
  products: CatalogProduct[];
  mode: WorkMode;
}) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [drawerProductId, setDrawerProductId] = useState<string | null>(null);

  const visibleProducts = useMemo(() => products, [products]);

  const drawerProduct =
    visibleProducts.find((product) => product.id === drawerProductId) ?? null;

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

  function closeDrawer() {
    setDrawerProductId(null);
  }

  return (
    <>
      {visibleProducts.length > 0 && mode === "select" && (
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

      <div className="grid gap-4">
        {visibleProducts.map((product) => {
          const visible = scope === "retail" ? product.is_retail_visible : product.is_wholesale_visible;
          const sortOrder = scope === "retail" ? product.retail_sort_order : product.wholesale_sort_order;
          const scopePrice = scope === "retail" ? product.retail_price : product.wholesale_price;
          const scopeLabel = scope === "retail" ? product.retail_label : product.wholesale_label;
          const visibleTags = product.tags.filter(
            (tag) => tag.catalog_scope === scope || tag.catalog_scope === "both"
          );
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
                  {mode === "select" ? (
                    <label className="flex items-center gap-2 text-sm text-white/75">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelected(product.id)}
                      />
                      Seleccionar
                    </label>
                  ) : (
                    <div className="text-xs text-white/40">
                      Orden #{sortOrder}
                    </div>
                  )}

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
                    {mode === "explore" && (
                      <button
                        type="button"
                        onClick={() => setDrawerProductId(product.id)}
                        className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
                      >
                        Editar
                      </button>
                    )}

                    <AdminDuplicateProductDrawer
                      scope={scope}
                      product={{
                        id: product.id,
                        name: product.name,
                        slug: product.slug,
                      }}
                    />

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
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <AdminCatalogDrawer
        scope={scope}
        product={drawerProduct}
        open={drawerProduct !== null}
        onClose={closeDrawer}
      />
    </>
  );
}