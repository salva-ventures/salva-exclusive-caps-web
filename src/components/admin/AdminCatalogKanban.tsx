"use client";

import Image from "next/image";

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

export default function AdminCatalogKanban({
  scope,
  products,
  onEdit,
}: {
  scope: "retail" | "wholesale";
  products: CatalogProduct[];
  onEdit: (productId: string) => void;
}) {
  const columns: Array<"active" | "draft" | "archived"> = ["active", "draft", "archived"];

  return (
    <div className="grid gap-4 xl:grid-cols-3">
      {columns.map((status) => {
        const items = products.filter((product) => product.catalog_status === status);

        return (
          <div
            key={status}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-4"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <h3 className="text-lg font-semibold text-white capitalize">{status}</h3>
              <Badge tone={status === "active" ? "green" : status === "draft" ? "yellow" : "red"}>
                {items.length}
              </Badge>
            </div>

            <div className="space-y-3">
              {items.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm text-white/45">
                  Sin productos.
                </div>
              ) : (
                items.map((product) => {
                  const visible = scope === "retail" ? product.is_retail_visible : product.is_wholesale_visible;
                  const price = scope === "retail" ? product.retail_price : product.wholesale_price;

                  return (
                    <article
                      key={product.id}
                      className="rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                          {product.primary_image_url ? (
                            <Image src={product.primary_image_url} alt={product.name} width={64} height={64} className="h-full w-full object-cover" sizes="64px" />
                          ) : (
                            <div className="flex h-full items-center justify-center text-[10px] text-white/35">
                              Sin imagen
                            </div>
                          )}
                        </div>

                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-semibold text-white">
                            {product.name}
                          </p>
                          <p className="mt-1 text-xs text-white/45">{product.slug}</p>
                          <p className="mt-2 text-sm text-white/80">{formatPrice(price)}</p>

                          <div className="mt-2 flex flex-wrap gap-2">
                            <Badge tone={visible ? "green" : "red"}>
                              {visible ? "Visible" : "Oculto"}
                            </Badge>
                            <Badge tone="blue">
                              {scope === "retail" ? "Menudeo" : "Mayoreo"}
                            </Badge>
                          </div>

                          <div className="mt-3 flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => onEdit(product.id)}
                              className="rounded-xl bg-white px-3 py-2 text-xs font-medium text-black transition hover:bg-white/90"
                            >
                              Editar
                            </button>

                            <a
                              href={`/admin/products/${product.id}/media`}
                              className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/85 transition hover:bg-white/[0.06]"
                            >
                              Medios
                            </a>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}