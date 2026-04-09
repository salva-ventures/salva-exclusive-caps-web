import Link from "next/link";
import AdminCatalogBoard from "@/components/admin/AdminCatalogBoard";
import AdminCatalogList from "@/components/admin/AdminCatalogList";
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

function getSuccessMessage(success?: string, count?: string) {
  switch (success) {
    case "product-updated":
      return "Producto de catalogo actualizado correctamente.";
    case "product-moved":
      return "Orden de catalogo actualizado.";
    case "no-move":
      return "Ese producto ya esta en el extremo y no se movio.";
    case "tag-created":
      return "Tag agregada correctamente.";
    case "tag-deleted":
      return "Tag eliminada correctamente.";
    case "bulk-updated":
      return `Accion masiva aplicada a ${count ?? "0"} producto(s).`;
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
    case "invalid-tag-scope":
      return "Scope de tag invalido.";
    case "missing-tag":
      return "Debes capturar una tag.";
    case "create-tag":
      return "No se pudo crear la tag.";
    case "invalid-tag-id":
      return "ID de tag invalido.";
    case "tag-not-found":
      return "Tag no encontrada.";
    case "delete-tag":
      return "No se pudo eliminar la tag.";
    case "bulk-no-selection":
      return "Debes seleccionar al menos un producto.";
    case "bulk-invalid-action":
      return "La accion masiva no es valida.";
    case "bulk-update-failed":
      return "No se pudo ejecutar la accion masiva.";
    default:
      return null;
  }
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
    count?: string;
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

  const successMessage = getSuccessMessage(params.success, params.count);
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
          Vista premium compacta con editor lateral, modos de trabajo y mejor experiencia movil.
        </p>
      </div>

      {successMessage && <SuccessBanner message={successMessage} />}
      {errorMessage && <ErrorBanner message={errorMessage} />}

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
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

            <Link
              href="/admin/catalog/filters"
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:bg-white/[0.04]"
            >
              Filtros administrables
            </Link>
          </div>

          <form className="grid gap-3 md:grid-cols-[1.3fr_0.8fr_0.8fr_auto]">
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
          </form>
        </div>
      </div>

      <AdminCatalogBoard
        scope={scope}
        products={products.map((product) => ({
          id: product.id,
          name: product.name,
          slug: product.slug,
          scopeSortOrder: scope === "retail" ? product.retail_sort_order : product.wholesale_sort_order,
        }))}
      />

      <div className="text-sm text-white/50">
        {products.length} producto{products.length === 1 ? "" : "s"} en {scope === "retail" ? "menudeo" : "mayoreo"}
      </div>

      <AdminCatalogList scope={scope} products={products} />
    </section>
  );
}