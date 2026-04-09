import Link from "next/link";
import { requireAdminUser } from "@/lib/admin/auth";
import {
  getCatalogFilterSourceFieldOptions,
  listCatalogFilterDefinitions,
} from "@/lib/admin/catalog-filters";

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

function getSuccessMessage(success?: string) {
  switch (success) {
    case "filter-created":
      return "Filtro creado correctamente.";
    case "filter-updated":
      return "Filtro actualizado correctamente.";
    default:
      return null;
  }
}

function getErrorMessage(error?: string) {
  switch (error) {
    case "missing-key":
      return "Debes capturar la key del filtro.";
    case "missing-label":
      return "Debes capturar el label del filtro.";
    case "invalid-scope":
      return "Scope invalido.";
    case "invalid-source-field":
      return "Source field invalido.";
    case "invalid-sort-order":
      return "Sort order invalido.";
    case "create-filter":
      return "No se pudo crear el filtro.";
    case "invalid-filter-id":
      return "ID de filtro invalido.";
    case "filter-not-found":
      return "Filtro no encontrado.";
    case "update-filter":
      return "No se pudo actualizar el filtro.";
    default:
      return null;
  }
}

export default async function AdminCatalogFiltersPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  await requireAdminUser();
  const params = await searchParams;

  const filters = await listCatalogFilterDefinitions();
  const sourceFieldOptions = getCatalogFilterSourceFieldOptions();

  const successMessage = getSuccessMessage(params.success);
  const errorMessage = getErrorMessage(params.error);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-white/50">
            Catalog filters
          </p>
          <h2 className="mt-2 text-3xl font-semibold text-white">
            Filtros administrables
          </h2>
          <p className="mt-2 text-white/65">
            Define qué filtros existen, cómo se llaman y en qué catálogo aparecen.
          </p>
        </div>

        <Link
          href="/admin/catalog"
          className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-white/85 transition hover:bg-white/[0.04]"
        >
          Volver al catálogo
        </Link>
      </div>

      {successMessage && <SuccessBanner message={successMessage} />}
      {errorMessage && <ErrorBanner message={errorMessage} />}

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <h3 className="mb-4 text-lg font-semibold text-white">Crear filtro</h3>

        <form
          action="/api/admin/catalog/filters/create"
          method="post"
          className="grid gap-4 md:grid-cols-2 xl:grid-cols-5"
        >
          <div>
            <label className="mb-2 block text-sm text-white/70">Key</label>
            <input
              name="key"
              type="text"
              placeholder="brand"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">Label</label>
            <input
              name="label"
              type="text"
              placeholder="Marca"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">Scope</label>
            <select
              name="catalog_scope"
              defaultValue="both"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
            >
              <option value="retail">Retail</option>
              <option value="wholesale">Wholesale</option>
              <option value="both">Both</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">Source field</label>
            <select
              name="source_field"
              defaultValue="brand_name"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
            >
              {sourceFieldOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/70">Sort order</label>
            <input
              name="sort_order"
              type="number"
              defaultValue="0"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
            />
          </div>

          <div className="md:col-span-2 xl:col-span-5">
            <button
              type="submit"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Crear filtro
            </button>
          </div>
        </form>
      </div>

      <div className="grid gap-5">
        {filters.map((filter) => (
          <article
            key={filter.id}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-white">{filter.label}</p>
                <p className="mt-1 text-sm text-white/50">key: {filter.key}</p>
              </div>

              <div className="flex flex-wrap gap-2">
                <Badge tone="blue">{filter.catalog_scope}</Badge>
                <Badge>{filter.source_field}</Badge>
                <Badge tone={filter.is_active ? "green" : "red"}>
                  {filter.is_active ? "Activo" : "Inactivo"}
                </Badge>
                <Badge tone="yellow">Orden {filter.sort_order}</Badge>
              </div>
            </div>

            <form
              action="/api/admin/catalog/filters/update"
              method="post"
              className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5"
            >
              <input type="hidden" name="id" value={filter.id} />

              <div>
                <label className="mb-2 block text-sm text-white/70">Label</label>
                <input
                  name="label"
                  type="text"
                  defaultValue={filter.label}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">Scope</label>
                <select
                  name="catalog_scope"
                  defaultValue={filter.catalog_scope}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                >
                  <option value="retail">Retail</option>
                  <option value="wholesale">Wholesale</option>
                  <option value="both">Both</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">Source field</label>
                <select
                  name="source_field"
                  defaultValue={filter.source_field}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                >
                  {sourceFieldOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/70">Sort order</label>
                <input
                  name="sort_order"
                  type="number"
                  defaultValue={String(filter.sort_order)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                />
              </div>

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-3 text-sm text-white/80">
                <input
                  name="is_active"
                  type="checkbox"
                  defaultChecked={filter.is_active}
                />
                Activo
              </label>

              <div className="md:col-span-2 xl:col-span-5">
                <button
                  type="submit"
                  className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
                >
                  Guardar filtro
                </button>
              </div>
            </form>
          </article>
        ))}
      </div>
    </section>
  );
}