import Image from "next/image";
import Link from "next/link";
import { requireAdminUser } from "@/lib/admin/auth";
import { listAdminCatalogProducts } from "@/lib/admin/catalog";

function SuccessBanner({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-200">
      {message}
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
      {message}
    </div>
  );
}

function getSuccessMessage(success?: string) {
  switch (success) {
    case "product-updated":
      return "Producto de catalogo actualizado correctamente.";
    case "product-moved":
      return "Orden de catalogo actualizado.";
    case "no-move":
      return "Ese producto ya esta en el extremo y no se movio.";
    default:
      return null;
  }
}

function getErrorMessage(error?: string) {
  switch (error) {
    case "invalid-product-id":
      return "ID de producto invalido.";
    case "missing-name":
      return "Debes capturar el nombre del producto.";
    case "invalid-scope":
      return "Scope de catalogo invalido.";
    case "invalid-status":
      return "Status de catalogo invalido.";
    case "product-not-found":
      return "Producto no encontrado.";
    case "update-product":
      return "No se pudo actualizar el producto.";
    case "invalid-direction":
      return "Direccion de orden invalida.";
    case "move-failed":
      return "No se pudo actualizar el orden del catalogo.";
    default:
      return null;
  }
}

function formatPrice(value: number | null) {
  if (value === null) return "-";
  return `$${value.toFixed(2)}`;
}

export default async function AdminCatalogPage({
  searchParams,
}: {
  searchParams: Promise<{
    scope?: "retail" | "wholesale";
    q?: string;
    status?: "all" | "active" | "draft" | "archived";
    visibility?: "all" | "visible" | "hidden";
    success?: string;
    error?: string;
  }>;
}) {
  await requireAdminUser();
  const params = await searchParams;

  const scope = params.scope === "wholesale" ? "wholesale" : "retail";
  const q = params.q ?? "";
  const status = params.status ?? "all";
  const visibility = params.visibility ?? "all";

  const products = await listAdminCatalogProducts({
    scope,
    q,
    status,
    visibility,
  });

  const successMessage = getSuccessMessage(params.success);
  const errorMessage = getErrorMessage(params.error);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-white/50">
          Catalog manager
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-white">
          Admin Catalog Manager
        </h2>
        <p className="mt-2 text-white/65">
          Gestiona menudeo y mayoreo desde un solo panel.
        </p>
      </div>

      {successMessage && <SuccessBanner message={successMessage} />}
      {errorMessage && <ErrorBanner message={errorMessage} />}

      <div className="flex flex-wrap gap-3">
        <Link
          href="/admin/catalog?scope=retail"
          className={`rounded-2xl px-5 py-3 text-sm transition ${
            scope === "retail"
              ? "bg-white text-black"
              : "border border-white/10 text-white/80 hover:bg-white/[0.04]"
          }`}
        >
          Menudeo
        </Link>

        <Link
          href="/admin/catalog?scope=wholesale"
          className={`rounded-2xl px-5 py-3 text-sm transition ${
            scope === "wholesale"
              ? "bg-white text-black"
              : "border border-white/10 text-white/80 hover:bg-white/[0.04]"
          }`}
        >
          Mayoreo
        </Link>
      </div>

      <form className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <div className="grid gap-4 lg:grid-cols-[1.5fr_0.8fr_0.8fr_auto]">
          <input type="hidden" name="scope" value={scope} />

          <input
            name="q"
            type="text"
            defaultValue={q}
            placeholder="Buscar por nombre, slug, SKU, marca o colaboracion"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
          />

          <select
            name="status"
            defaultValue={status}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
          >
            <option value="all">Todos los status</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>

          <select
            name="visibility"
            defaultValue={visibility}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
          >
            <option value="all">Toda visibilidad</option>
            <option value="visible">Visibles</option>
            <option value="hidden">Ocultos</option>
          </select>

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Filtrar
            </button>

            <Link
              href={`/admin/catalog?scope=${scope}`}
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/[0.04]"
            >
              Limpiar
            </Link>
          </div>
        </div>
      </form>

      <div className="text-sm text-white/50">
        {products.length} producto{products.length === 1 ? "" : "s"} en {scope === "retail" ? "menudeo" : "mayoreo"}
      </div>

      <div className="grid gap-5">
        {products.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-white/55">
            No hay productos con esos filtros.
          </div>
        ) : (
          products.map((product) => {
            const visible = scope === "retail" ? product.is_retail_visible : product.is_wholesale_visible;
            const sortOrder = scope === "retail" ? product.retail_sort_order : product.wholesale_sort_order;

            return (
              <article
                key={product.id}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="grid gap-6 xl:grid-cols-[220px_1fr]">
                  <div className="space-y-4">
                    <div className="relative aspect-square overflow-hidden rounded-3xl border border-white/10 bg-white/5">
                      {product.primary_image_url ? (
                        <Image
                          src={product.primary_image_url}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="220px"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-white/35">
                          Sin imagen
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <form action="/api/admin/catalog/products/move" method="post">
                        <input type="hidden" name="id" value={product.id} />
                        <input type="hidden" name="scope" value={scope} />
                        <input type="hidden" name="direction" value="up" />
                        <button
                          type="submit"
                          className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/85 transition hover:bg-white/[0.06]"
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
                          className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/85 transition hover:bg-white/[0.06]"
                        >
                          Bajar
                        </button>
                      </form>

                      <Link
                        href={`/admin/products/${product.id}/media`}
                        className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/85 transition hover:bg-white/[0.06]"
                      >
                        Medios
                      </Link>
                    </div>

                    <div className="text-sm text-white/55">
                      <p>Orden actual: {sortOrder}</p>
                      <p>Medios activos: {product.media_count}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <p className="text-lg font-semibold text-white">{product.name}</p>
                      <p className="mt-1 text-sm text-white/50">
                        SKU: {product.sku ?? "Sin SKU"} | Slug: {product.slug}
                      </p>
                      <p className="mt-1 text-sm text-white/50">
                        {product.brand_name ?? "Sin marca"} {product.collab_name ? `| ${product.collab_name}` : ""}
                      </p>
                    </div>

                    <form
                      action="/api/admin/catalog/products/update"
                      method="post"
                      className="grid gap-4"
                    >
                      <input type="hidden" name="id" value={product.id} />
                      <input type="hidden" name="scope" value={scope} />

                      <div className="grid gap-4 lg:grid-cols-2">
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
                          <label className="mb-2 block text-sm text-white/70">Status catalogo</label>
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

                      <div className="grid gap-4 lg:grid-cols-2">
                        <div>
                          <label className="mb-2 block text-sm text-white/70">Precio menudeo</label>
                          <input
                            name="retail_price"
                            type="number"
                            step="0.01"
                            defaultValue={product.retail_price ?? ""}
                            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                          />
                          <p className="mt-2 text-xs text-white/45">
                            Actual: {formatPrice(product.retail_price)}
                          </p>
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
                          <p className="mt-2 text-xs text-white/45">
                            Actual: {formatPrice(product.wholesale_price)}
                          </p>
                        </div>
                      </div>

                      <div className="grid gap-4 lg:grid-cols-2">
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

                      <div className="grid gap-4 lg:grid-cols-2">
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

                      <div className="flex flex-wrap items-center gap-3">
                        <span
                          className={`rounded-full px-3 py-1 text-xs ${
                            visible
                              ? "bg-green-500/15 text-green-300"
                              : "bg-white/10 text-white/55"
                          }`}
                        >
                          {visible
                            ? `Visible en ${scope === "retail" ? "menudeo" : "mayoreo"}`
                            : `Oculto en ${scope === "retail" ? "menudeo" : "mayoreo"}`}
                        </span>

                        <button
                          type="submit"
                          className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
                        >
                          Guardar cambios
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}