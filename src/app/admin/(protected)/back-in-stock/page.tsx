import { requireAdminUser } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";
import Link from "next/link";
import BackInStockStatusActions from "@/components/admin/BackInStockStatusActions";

type BackInStockProductRow = {
  name: string;
  slug: string;
};

type BackInStockRow = {
  id: string;
  product_id: string;
  email: string | null;
  phone: string | null;
  channel: string;
  status: string;
  source: string | null;
  created_at: string;
  products: BackInStockProductRow[] | null;
};

async function getBackInStockRequests(): Promise<BackInStockRow[]> {
  const { data, error } = await supabaseAdmin
    .from("back_in_stock_requests")
    .select(`
      id,
      product_id,
      email,
      phone,
      channel,
      status,
      source,
      created_at,
      products (
        name,
        slug
      )
    `)
    .order("created_at", { ascending: false })
    .limit(100);

  if (error) {
    throw new Error(error.message);
  }

  return (data ?? []) as BackInStockRow[];
}

function Badge({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: "default" | "green" | "yellow" | "red" | "blue";
}) {
  const styles =
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
    <span className={`rounded-full px-3 py-1 text-xs ${styles}`}>
      {children}
    </span>
  );
}

export default async function BackInStockAdminPage() {
  await requireAdminUser();

  const requests = await getBackInStockRequests();

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-white/50">
          Back in stock
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-white">
          Solicitudes de reposición
        </h2>
        <p className="mt-2 text-white/65">
          Usuarios que quieren ser notificados cuando un producto vuelva a tener stock.
        </p>
      </div>

      <div className="text-sm text-white/50">
        {requests.length} solicitud{requests.length === 1 ? "" : "es"}
      </div>

      <div className="space-y-4">
        {requests.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-white/55">
            No hay solicitudes registradas.
          </div>
        ) : (
          requests.map((req) => {
            const product = req.products?.[0] ?? null;

            return (
              <article
                key={req.id}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge tone="blue">{req.channel}</Badge>

                  <Badge
                    tone={
                      req.status === "pending"
                        ? "yellow"
                        : req.status === "notified"
                          ? "green"
                          : "red"
                    }
                  >
                    {req.status}
                  </Badge>
                </div>

                <p className="mt-3 text-sm font-medium text-white">
                  {product?.name ?? "Producto desconocido"}
                </p>

                <p className="mt-1 text-xs text-white/50">
                  {product?.slug ?? "-"}
                </p>

                <div className="mt-3 space-y-1 text-sm text-white/70">
                  {req.email && <p>Email: {req.email}</p>}
                  {req.phone && <p>Tel: {req.phone}</p>}
                  {req.source && <p>Source: {req.source}</p>}
                </div>

                <p className="mt-3 text-xs text-white/40">
                  {new Date(req.created_at).toLocaleString()}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <Link
                    href={`/admin/products/${req.product_id}/media`}
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:bg-white/[0.04]"
                  >
                    Ver producto
                  </Link>

                  {req.status === "pending" && (
                    <BackInStockStatusActions requestId={req.id} />
                  )}
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}