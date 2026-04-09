import Image from "next/image";
import { notFound } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { getAdminProductMedia } from "@/lib/admin/product-media";

export default async function AdminProductMediaPage({
  params,
}: {
  params: Promise<{ productId: string }>;
}) {
  await requireAdminUser();
  const { productId } = await params;

  const product = await getAdminProductMedia(productId);

  if (!product) {
    notFound();
  }

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
      </div>

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

        <p className="mt-3 text-sm text-white/45">
          Maximo 10 imagenes activas por producto. Formatos: JPG, PNG, WEBP, AVIF.
        </p>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {product.media.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-white/55">
              Este producto todavia no tiene medios.
            </div>
          ) : (
            product.media.map((media) => (
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

                <div className="space-y-2 p-4 text-sm text-white/70">
                  <p className="font-medium text-white">
                    {media.original_filename ?? "Sin nombre"}
                  </p>
                  <p>Tipo: {media.media_type}</p>
                  <p>Orden: {media.sort_order}</p>
                  <p>Estado: {media.status}</p>
                  <p>Principal: {media.is_primary ? "Si" : "No"}</p>
                  <p>Bucket: {media.bucket}</p>
                  <p className="break-all">Path: {media.storage_path}</p>
                  <p className="break-all">URL: {media.public_url}</p>
                  <p>Alt: {media.alt_text ?? "-"}</p>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}