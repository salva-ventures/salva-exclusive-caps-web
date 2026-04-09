import Link from "next/link";
import { requireAdminUser } from "@/lib/admin/auth";
import {
  getAdminHistory,
  getAdminHistoryActionOptions,
  getAdminHistoryEmails,
} from "@/lib/admin/history-global";

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

function formatActionType(actionType: string) {
  return actionType
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export default async function AdminHistoryPage({
  searchParams,
}: {
  searchParams: Promise<{
    admin_email?: string;
    action_type?: string;
    limit?: string;
  }>;
}) {
  await requireAdminUser();

  const params = await searchParams;
  const adminEmail = params.admin_email ?? "";
  const actionType = params.action_type ?? "all";
  const limit = Number(params.limit ?? "50");

  const [events, emails] = await Promise.all([
    getAdminHistory({
      adminEmail,
      actionType,
      limit: Number.isFinite(limit) ? limit : 50,
    }),
    getAdminHistoryEmails(),
  ]);

  const actionOptions = getAdminHistoryActionOptions();

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-white/50">
          Admin history
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-white">
          Historial global
        </h2>
        <p className="mt-2 text-white/65">
          Actividad reciente del panel administrativo.
        </p>
      </div>

      <form className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <div className="grid gap-4 lg:grid-cols-[1fr_1fr_160px_auto]">
          <select
            name="admin_email"
            defaultValue={adminEmail}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
          >
            <option value="">Todos los admins</option>
            {emails.map((email) => (
              <option key={email} value={email}>
                {email}
              </option>
            ))}
          </select>

          <select
            name="action_type"
            defaultValue={actionType}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
          >
            {actionOptions.map((option) => (
              <option key={option} value={option}>
                {option === "all" ? "Todas las acciones" : option}
              </option>
            ))}
          </select>

          <select
            name="limit"
            defaultValue={String(limit)}
            className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
          >
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="200">200</option>
          </select>

          <div className="flex gap-3">
            <button
              type="submit"
              className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Filtrar
            </button>

            <Link
              href="/admin/history"
              className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/[0.04]"
            >
              Limpiar
            </Link>
          </div>
        </div>
      </form>

      <div className="text-sm text-white/50">
        {events.length} evento{events.length === 1 ? "" : "s"}
      </div>

      <div className="space-y-4">
        {events.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-white/55">
            No hay eventos con esos filtros.
          </div>
        ) : (
          events.map((event) => (
            <article
              key={event.id}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="blue">{formatActionType(event.action_type)}</Badge>
                {event.product_id && <Badge tone="green">Producto</Badge>}
                {event.media_id && <Badge tone="yellow">Media</Badge>}
              </div>

              <p className="mt-3 text-sm font-medium text-white">
                {event.admin_email}
              </p>

              <p className="mt-1 text-sm text-white/50">
                {new Date(event.created_at).toLocaleString()}
              </p>

              <div className="mt-3 grid gap-2 text-sm text-white/55">
                <p className="break-all">product_id: {event.product_id ?? "-"}</p>
                <p className="break-all">media_id: {event.media_id ?? "-"}</p>
              </div>

              {event.product_id && (
                <div className="mt-4">
                  <Link
                    href={`/admin/products/${event.product_id}/media`}
                    className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:bg-white/[0.04]"
                  >
                    Ir al producto
                  </Link>
                </div>
              )}

              {event.details_json && Object.keys(event.details_json).length > 0 && (
                <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-black/30 p-4 text-xs text-white/70">
{JSON.stringify(event.details_json, null, 2)}
                </pre>
              )}
            </article>
          ))
        )}
      </div>
    </section>
  );
}