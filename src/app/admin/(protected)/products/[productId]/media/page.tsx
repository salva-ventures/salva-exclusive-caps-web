import Image from "next/image";
import { notFound } from "next/navigation";
import MediaQuickActions from "@/components/admin/MediaQuickActions";
import { requireAdminUser } from "@/lib/admin/auth";
import { getAdminProductMedia } from "@/lib/admin/product-media";

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
  tone?: "default" | "green" | "blue" | "yellow" | "red";
}) {
  const toneClasses =
    tone === "green"
      ? "bg-green-500/15 text-green-300"
      : tone === "blue"
      ? "bg-blue-500/15 text-blue-300"
      : tone === "yellow"
      ? "bg-yellow-500/15 text-yellow-200"
      : tone === "red"
      ? "bg-red-500/15 text-red-200"
      : "bg-white/10 text-white/70";

  return (
    <span className={`rounded-full px-3 py-1 text-xs ${toneClasses}`}>
      {children}
    </span>
  );
}

function getSuccessMessage(success?: string, count?: string) {
  switch (success) {
    case "images-uploaded":
      return `Imagenes subidas correctamente: ${count ?? "0"}.`;
    case "videos-uploaded":
      return `Videos subidos correctamente: ${count ?? "0"}.`;
    case "primary":
      return "Se actualizo el medio principal.";
    case "archived":
      return "El medio fue archivado.";
    case "restored":
      return "El medio fue restaurado.";
    case "deleted":
      return "El medio fue eliminado permanentemente.";
    case "replaced":
      return "El archivo fue reemplazado correctamente.";
    case "alt-text":
      return "Alt text guardado correctamente.";
    case "moved":
      return "Orden actualizado.";
    case "no-move":
      return "Ese medio ya esta en el extremo y no se movio.";
    default:
      return null;
  }
}

function getErrorMessage(error?: string) {
  switch (error) {
    case "no-files":
      return "Debes seleccionar al menos un archivo.";
    case "too-many-images":
      return "No puedes subir tantas imagenes en una sola carga.";
    case "too-many-videos":
      return "No puedes subir tantos videos en una sola carga.";
    case "invalid-image-type":
      return "Uno o mas archivos no son imagenes validas.";
    case "invalid-video-type":
      return "Uno o mas archivos no son videos validos.";
    case "image-limit":
      return "Este producto superaria el limite de 10 imagenes activas.";
    case "video-limit":
      return "Este producto superaria el limite de 3 videos activos.";
    case "image-upload":
      return "Fallo la subida de imagenes a Storage.";
    case "video-upload":
      return "Fallo la subida de videos a Storage.";
    case "image-insert":
      return "Fallo el guardado de imagenes en product_media.";
    case "video-insert":
      return "Fallo el guardado de videos en product_media.";
    case "primary-inactive":
      return "No puedes marcar como principal un medio inactivo.";
    case "primary-failed":
      return "No se pudo actualizar el medio principal.";
    case "archive-not-confirmed":
      return "Debes confirmar el archivado antes de continuar.";
    case "archive-failed":
      return "No se pudo archivar el medio.";
    case "alt-text-failed":
      return "No se pudo guardar el alt text.";
    case "move-inactive":
      return "No puedes mover un medio inactivo.";
    case "move-failed":
      return "No se pudo actualizar el orden.";
    case "restore-not-archived":
      return "Ese medio no esta archivado.";
    case "restore-image-limit":
      return "No se puede restaurar: limite de 10 imagenes activas alcanzado.";
    case "restore-video-limit":
      return "No se puede restaurar: limite de 3 videos activos alcanzado.";
    case "restore-failed":
      return "No se pudo restaurar el medio.";
    case "replace-no-file":
      return "Debes seleccionar un archivo para reemplazar.";
    case "replace-invalid-type":
      return "El archivo no coincide con el tipo del medio.";
    case "replace-upload":
      return "Fallo la subida del reemplazo a Storage.";
    case "replace-update":
      return "Fallo la actualizacion del medio reemplazado.";
    case "delete-not-confirmed":
      return "Debes confirmar la eliminacion permanente.";
    case "delete-storage":
      return "No se pudo borrar el archivo en Storage.";
    case "delete-db":
      return "No se pudo borrar el registro en la base de datos.";
    default:
      return null;
  }
}

function filterMedia(
  media: Array<{
    id: string;
    product_id: string;
    public_url: string;
    storage_path: string;
    bucket: string;
    media_type: string;
    alt_text: string | null;
    sort_order: number;
    is_primary: boolean;
    status: string;
    mime_type: string | null;
    file_size_bytes: number | null;
    width: number | null;
    height: number | null;
    duration_seconds: number | null;
    original_filename: string | null;
  }>,
  view: string
) {
  const items = media ?? [];

  switch (view) {
    case "images":
      return items.filter((item) => item.media_type === "image");
    case "videos":
      return items.filter((item) => item.media_type === "video");
    case "active":
      return items.filter((item) => item.status === "active");
    case "archived":
      return items.filter((item) => item.status === "archived");
    default:
      return items;
  }
}

export default async function AdminProductMediaPage({
  params,
  searchParams,
}: {
  params: Promise<{ productId: string }>;
  searchParams: Promise<{
    success?: string;
    error?: string;
    count?: string;
    view?: string;
  }>;
}) {
  await requireAdminUser();
  const { productId } = await params;
  const query = await searchParams;

  const product = await getAdminProductMedia(productId);

  if (!product) {
    notFound();
  }

  const successMessage = getSuccessMessage(query.success, query.count);
  const errorMessage = getErrorMessage(query.error);
  const view = query.view ?? "all";

  const imageCount = product.media.filter(
    (media) => media.media_type === "image" && media.status === "active"
  ).length;

  const videoCount = product.media.filter(
    (media) => media.media_type === "video" && media.status === "active"
  ).length;

  const filteredMedia = filterMedia(product.media, view);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-white/50">
          Editor de medios
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-white">
          {product.name}
        </h2>
        <p className="mt-2 text-white/65">
          SKU: {product.sku ?? "Sin SKU"} | Slug: {product.slug}
        </p>
        <div className="mt-3 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-white/10 px-3 py-1 text-white/75">
            Imagenes activas: {imageCount}/10
          </span>
          <span className="rounded-full bg-white/10 px-3 py-1 text-white/75">
            Videos activos: {videoCount}/3
          </span>
        </div>
      </div>

      {successMessage && <SuccessBanner message={successMessage} />}
      {errorMessage && <ErrorBanner message={errorMessage} />}

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="mb-4 text-lg font-semibold text-white">Subir imagenes</h3>

          <form
            action={`/api/admin/products/${product.id}/media/upload`}
            method="post"
            encType="multipart/form-data"
            className="space-y-4"
          >
            <input
              name="files"
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              multiple
              className="block w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white"
              required
            />

            <button
              type="submit"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Subir imagenes
            </button>
          </form>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="mb-4 text-lg font-semibold text-white">Subir videos</h3>

          <form
            action={`/api/admin/products/${product.id}/media/upload-videos`}
            method="post"
            encType="multipart/form-data"
            className="space-y-4"
          >
            <input
              name="files"
              type="file"
              accept="video/mp4,video/webm,video/quicktime"
              multiple
              className="block w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white"
              required
            />

            <button
              type="submit"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Subir videos
            </button>
          </form>
        </div>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <div className="mb-5 flex flex-wrap gap-2">
          <a
            href={`/admin/products/${product.id}/media`}
            className={`rounded-xl px-4 py-2 text-sm transition ${
              view === "all"
                ? "bg-white text-black"
                : "border border-white/10 text-white/80 hover:bg-white/[0.04]"
            }`}
          >
            Todos
          </a>

          <a
            href={`/admin/products/${product.id}/media?view=images`}
            className={`rounded-xl px-4 py-2 text-sm transition ${
              view === "images"
                ? "bg-white text-black"
                : "border border-white/10 text-white/80 hover:bg-white/[0.04]"
            }`}
          >
            Imagenes
          </a>

          <a
            href={`/admin/products/${product.id}/media?view=videos`}
            className={`rounded-xl px-4 py-2 text-sm transition ${
              view === "videos"
                ? "bg-white text-black"
                : "border border-white/10 text-white/80 hover:bg-white/[0.04]"
            }`}
          >
            Videos
          </a>

          <a
            href={`/admin/products/${product.id}/media?view=active`}
            className={`rounded-xl px-4 py-2 text-sm transition ${
              view === "active"
                ? "bg-white text-black"
                : "border border-white/10 text-white/80 hover:bg-white/[0.04]"
            }`}
          >
            Activos
          </a>

          <a
            href={`/admin/products/${product.id}/media?view=archived`}
            className={`rounded-xl px-4 py-2 text-sm transition ${
              view === "archived"
                ? "bg-white text-black"
                : "border border-white/10 text-white/80 hover:bg-white/[0.04]"
            }`}
          >
            Archivados
          </a>
        </div>

        <div className="mb-4 text-sm text-white/50">
          {filteredMedia.length} medio{filteredMedia.length === 1 ? "" : "s"} en esta vista
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {filteredMedia.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-white/55">
              No hay medios en esta vista.
            </div>
          ) : (
            filteredMedia.map((media) => (
              <article
                key={media.id}
                className="overflow-hidden rounded-3xl border border-white/10 bg-black/30"
              >
                <div className="relative aspect-square w-full bg-white/5">
                  {media.media_type === "image" ? (
                    <Image
                      src={media.public_url}
                      alt={media.alt_text ?? product.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1280px) 50vw, 33vw"
                    />
                  ) : (
                    <video
                      src={media.public_url}
                      controls
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                <div className="space-y-3 p-4 text-sm text-white/70">
                  <div className="flex flex-wrap gap-2">
                    <Badge tone={media.media_type === "image" ? "blue" : "yellow"}>
                      {media.media_type === "image" ? "Imagen" : "Video"}
                    </Badge>

                    <Badge tone={media.status === "active" ? "green" : "red"}>
                      {media.status === "active" ? "Activo" : "Archivado"}
                    </Badge>

                    {media.is_primary && <Badge tone="yellow">Principal</Badge>}
                  </div>

                  <div>
                    <p className="font-medium text-white">
                      {media.original_filename ?? "Sin nombre"}
                    </p>
                    <p>Orden: {media.sort_order}</p>
                    <p>Bucket: {media.bucket}</p>
                    <p className="break-all">Path: {media.storage_path}</p>
                    <p className="break-all">URL: {media.public_url}</p>
                    <p>Alt actual: {media.alt_text ?? "-"}</p>
                  </div>

                  <MediaQuickActions
                    publicUrl={media.public_url}
                    storagePath={media.storage_path}
                  />

                  <div className="flex flex-wrap gap-2">
                    {media.status === "active" && (
                      <>
                        <form action={`/api/admin/media/${media.id}/move`} method="post">
                          <input type="hidden" name="direction" value="up" />
                          <button
                            type="submit"
                            className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/85 transition hover:bg-white/[0.06]"
                          >
                            Subir
                          </button>
                        </form>

                        <form action={`/api/admin/media/${media.id}/move`} method="post">
                          <input type="hidden" name="direction" value="down" />
                          <button
                            type="submit"
                            className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/85 transition hover:bg-white/[0.06]"
                          >
                            Bajar
                          </button>
                        </form>
                      </>
                    )}

                    {!media.is_primary && media.status === "active" && (
                      <form action={`/api/admin/media/${media.id}/set-primary`} method="post">
                        <button
                          type="submit"
                          className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/85 transition hover:bg-white/[0.06]"
                        >
                          Marcar principal
                        </button>
                      </form>
                    )}

                    {media.status === "archived" && (
                      <form action={`/api/admin/media/${media.id}/restore`} method="post">
                        <button
                          type="submit"
                          className="rounded-xl border border-green-500/20 bg-green-500/10 px-3 py-2 text-xs text-green-200 transition hover:bg-green-500/15"
                        >
                          Restaurar
                        </button>
                      </form>
                    )}
                  </div>

                  <form
                    action={`/api/admin/media/${media.id}/alt-text`}
                    method="post"
                    className="space-y-2"
                  >
                    <label className="block text-xs uppercase tracking-[0.18em] text-white/45">
                      Alt text
                    </label>
                    <input
                      name="alt_text"
                      type="text"
                      defaultValue={media.alt_text ?? ""}
                      className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white outline-none"
                      placeholder="Describe la imagen"
                    />
                    <button
                      type="submit"
                      className="rounded-xl bg-white px-3 py-2 text-xs font-medium text-black transition hover:bg-white/90"
                    >
                      Guardar alt text
                    </button>
                  </form>

                  <form
                    action={`/api/admin/media/${media.id}/replace`}
                    method="post"
                    encType="multipart/form-data"
                    className="space-y-2"
                  >
                    <label className="block text-xs uppercase tracking-[0.18em] text-white/45">
                      Reemplazar archivo
                    </label>
                    <input
                      name="file"
                      type="file"
                      accept={
                        media.media_type === "image"
                          ? "image/jpeg,image/png,image/webp,image/avif"
                          : "video/mp4,video/webm,video/quicktime"
                      }
                      className="block w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white"
                      required
                    />
                    <button
                      type="submit"
                      className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/85 transition hover:bg-white/[0.06]"
                    >
                      Reemplazar
                    </button>
                  </form>

                  {media.status === "active" && (
                    <form action={`/api/admin/media/${media.id}/archive`} method="post" className="space-y-2">
                      <label className="flex items-center gap-2 text-xs text-white/55">
                        <input type="checkbox" name="confirm_archive" value="yes" />
                        Confirmar archivado
                      </label>
                      <button
                        type="submit"
                        className="rounded-xl border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-200 transition hover:bg-red-500/15"
                      >
                        Archivar
                      </button>
                    </form>
                  )}

                  <form action={`/api/admin/media/${media.id}/delete`} method="post" className="space-y-2">
                    <label className="flex items-center gap-2 text-xs text-white/55">
                      <input type="checkbox" name="confirm_delete" value="yes" />
                      Confirmar eliminacion permanente
                    </label>
                    <button
                      type="submit"
                      className="rounded-xl border border-red-500/20 bg-red-500/20 px-3 py-2 text-xs text-red-100 transition hover:bg-red-500/25"
                    >
                      Eliminar permanente
                    </button>
                  </form>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}