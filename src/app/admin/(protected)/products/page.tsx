import Image from "next/image";
import Link from "next/link";
import { listAdminProducts } from "@/lib/admin/products";
import { requireAdminUser } from "@/lib/admin/auth";

export default async function AdminProductsPage({
  searchParams,
}: {
  searchParams: Promise<{
    q?: string;
    media?: "all" | "with-media" | "without-media";
    status?: "all" | "active" | "inactive";
  }>;
}) {
  await requireAdminUser();
  const params = await searchParams;

  const q = params.q ?? "";
  const media = params.media ?? "all";
  const status = params.status ?? "all";

  const products = await listAdminProducts({ q, media, status });

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-white/50">
          Admin
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-white">Productos</h2>
        <p className="mt-2 text-white/65">
          Busca, filtra y entra al editor de medios por producto.
        </p>
      </div>

      <form className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <div className="grid gap-4 lg:grid-cols-[1.5fr_0.8fr_0.8fr_auto]">
          <input
            name="q"
            type="text"
            defaultValue={q}
            placeholder="Buscar por nombre, slug, SKU, marca o colaboracion"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
          />

          <select
            name="media"
            defaultValue={media}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
          >
            <option value="all">Todos los medios</option>
            <option value="with-media">Con medios</option>
            <option value="without-media">Sin medios</option>
          </select>

          <select
            name="status"
            defaultValue={status}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
          >
            <option value="all">Todos los estados</option>
            <option value="active">Activos</option>
            <option value="inactive">Inactivos</option>
          </select>

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Buscar
            </button>

            <Link
              href="/admin/products"
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/[0.04]"
            >
              Limpiar
            </Link>
          </div>
        </div>
      </form>

      <div className="text-sm text-white/50">
        {products.length} resultado{products.length === 1 ? "" : "s"}
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
        <div className="grid grid-cols-[120px_1.4fr_1fr_120px_120px] gap-4 border-b border-white/10 px-4 py-3 text-xs uppercase tracking-[0.18em] text-white/45">
          <div>Vista</div>
          <div>Producto</div>
          <div>Slug</div>
          <div>Medios</div>
          <div>Estado</div>
        </div>

        {products.length === 0 ? (
          <div className="px-4 py-8 text-sm text-white/55">
            No hay productos con esos filtros.
          </div>
        ) : (
          products.map((product) => (
            <Link
              key={product.id}
              href={`/admin/products/${product.id}/media`}
              className="grid grid-cols-[120px_1.4fr_1fr_120px_120px] gap-4 border-b border-white/5 px-4 py-4 transition-colors hover:bg-white/[0.03]"
            >
              <div className="relative h-20 w-20 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                {product.primary_image_url ? (
                  <Image
                    src={product.primary_image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-white/35">
                    Sin imagen
                  </div>
                )}
              </div>

              <div>
                <p className="font-medium text-white">{product.name}</p>
                <p className="mt-1 text-sm text-white/50">
                  SKU: {product.sku ?? "Sin SKU"}
                </p>
                <p className="mt-1 text-sm text-white/50">
                  {product.brand_name ?? "Sin marca"} {product.collab_name ? `| ${product.collab_name}` : ""}
                </p>
              </div>

              <div className="text-sm text-white/65">{product.slug}</div>

              <div className="text-sm text-white/65">{product.media_count}</div>

              <div>
                <span
                  className={`rounded-full px-3 py-1 text-xs ${
                    product.is_active
                      ? "bg-green-500/15 text-green-300"
                      : "bg-white/10 text-white/55"
                  }`}
                >
                  {product.is_active ? "Activo" : "Inactivo"}
                </span>
              </div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
}