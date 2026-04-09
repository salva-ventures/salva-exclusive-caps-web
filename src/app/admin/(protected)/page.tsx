import Link from "next/link";
import { requireAdminUser } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

async function getAdminDashboardData() {
  const { count: totalProducts } = await supabaseAdmin
    .from("products")
    .select("*", { count: "exact", head: true });

  const { count: totalActiveImages } = await supabaseAdmin
    .from("product_media")
    .select("*", { count: "exact", head: true })
    .eq("media_type", "image")
    .eq("status", "active");

  const { count: totalActiveVideos } = await supabaseAdmin
    .from("product_media")
    .select("*", { count: "exact", head: true })
    .eq("media_type", "video")
    .eq("status", "active");

  const { count: totalArchivedMedia } = await supabaseAdmin
    .from("product_media")
    .select("*", { count: "exact", head: true })
    .eq("status", "archived");

  const { data: products } = await supabaseAdmin
    .from("products")
    .select(`
      id,
      name,
      slug,
      product_media (
        id,
        media_type,
        status
      )
    `)
    .order("created_at", { ascending: false });

  const rows = products ?? [];

  const productsWithoutMedia = rows.filter((product) => {
    const media = product.product_media ?? [];
    return media.filter((item) => item.status === "active").length === 0;
  });

  const productsWithFewImages = rows.filter((product) => {
    const media = product.product_media ?? [];
    const activeImages = media.filter(
      (item) => item.status === "active" && item.media_type === "image"
    ).length;
    return activeImages > 0 && activeImages < 3;
  });

  const productsWithVideos = rows.filter((product) => {
    const media = product.product_media ?? [];
    return media.some(
      (item) => item.status === "active" && item.media_type === "video"
    );
  });

  return {
    totalProducts: totalProducts ?? 0,
    totalActiveImages: totalActiveImages ?? 0,
    totalActiveVideos: totalActiveVideos ?? 0,
    totalArchivedMedia: totalArchivedMedia ?? 0,
    productsWithoutMedia: productsWithoutMedia.slice(0, 10),
    productsWithFewImages: productsWithFewImages.slice(0, 10),
    productsWithVideos: productsWithVideos.slice(0, 10),
  };
}

function StatCard({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-xs uppercase tracking-[0.18em] text-white/45">{label}</p>
      <p className="mt-3 text-3xl font-semibold text-white">{value}</p>
    </div>
  );
}

function ProductListCard({
  title,
  items,
}: {
  title: string;
  items: Array<{ id: string; name: string; slug: string }>;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <h3 className="text-lg font-semibold text-white">{title}</h3>

      {items.length === 0 ? (
        <p className="mt-4 text-sm text-white/55">Sin elementos.</p>
      ) : (
        <div className="mt-4 space-y-3">
          {items.map((item) => (
            <Link
              key={item.id}
              href={`/admin/products/${item.id}/media`}
              className="block rounded-2xl border border-white/10 px-4 py-3 transition hover:bg-white/[0.04]"
            >
              <p className="font-medium text-white">{item.name}</p>
              <p className="mt-1 text-sm text-white/45">{item.slug}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default async function AdminHomePage() {
  await requireAdminUser();
  const data = await getAdminDashboardData();

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-white/50">
          Panel interno
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-white">
          Resumen operativo
        </h2>
        <p className="mt-2 max-w-2xl text-white/65">
          Vista rapida del estado actual del catalogo y de los medios.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Productos" value={data.totalProducts} />
        <StatCard label="Imagenes activas" value={data.totalActiveImages} />
        <StatCard label="Videos activos" value={data.totalActiveVideos} />
        <StatCard label="Medios archivados" value={data.totalArchivedMedia} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <ProductListCard
          title="Productos sin medios"
          items={data.productsWithoutMedia}
        />
        <ProductListCard
          title="Productos con pocas imagenes"
          items={data.productsWithFewImages}
        />
        <ProductListCard
          title="Productos con videos"
          items={data.productsWithVideos}
        />
      </div>
    </section>
  );
}