"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  FunnelChart,
  Funnel,
  LabelList,
} from "recharts";
import {
  fetchAdminAnalyticsJson,
  type AcquisitionRow,
  type ActivityRow,
  type AnalyticsOverview,
  type EventTypeRow,
  type FunnelRow,
  type InterestRow,
  type RecentEventRow,
  type RecentlyActiveCustomerRow,
  type RegistrationRow,
} from "@/lib/admin/analytics-client";

type DashboardState = {
  overview: AnalyticsOverview | null;
  registrations: RegistrationRow[];
  activity: ActivityRow[];
  funnel: FunnelRow[];
  acquisition: AcquisitionRow[];
  interests: InterestRow[];
  eventTypes: EventTypeRow[];
  recentEvents: RecentEventRow[];
  recentCustomers: RecentlyActiveCustomerRow[];
};

const initialState: DashboardState = {
  overview: null,
  registrations: [],
  activity: [],
  funnel: [],
  acquisition: [],
  interests: [],
  eventTypes: [],
  recentEvents: [],
  recentCustomers: [],
};

function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  return new Date(value).toLocaleString("es-MX");
}

function formatShortDate(value: string) {
  return new Date(value).toLocaleDateString("es-MX", {
    month: "short",
    day: "numeric",
  });
}

export default function AnalyticsDashboardClient() {
  const [state, setState] = useState<DashboardState>(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const [
          overviewJson,
          registrationsJson,
          activityJson,
          funnelJson,
          acquisitionJson,
          interestsJson,
          eventTypesJson,
          recentEventsJson,
          recentCustomersJson,
        ] = await Promise.all([
          fetchAdminAnalyticsJson<{ overview: AnalyticsOverview | null }>("/api/admin/analytics/overview"),
          fetchAdminAnalyticsJson<{ registrations: RegistrationRow[] }>("/api/admin/analytics/registrations"),
          fetchAdminAnalyticsJson<{ activity: ActivityRow[] }>("/api/admin/analytics/activity"),
          fetchAdminAnalyticsJson<{ funnel: FunnelRow[] }>("/api/admin/analytics/funnel"),
          fetchAdminAnalyticsJson<{ acquisition: AcquisitionRow[] }>("/api/admin/analytics/acquisition"),
          fetchAdminAnalyticsJson<{ interests: InterestRow[] }>("/api/admin/analytics/interests"),
          fetchAdminAnalyticsJson<{ eventTypes: EventTypeRow[] }>("/api/admin/analytics/events/by-type"),
          fetchAdminAnalyticsJson<{ recentEvents: RecentEventRow[] }>("/api/admin/analytics/events/recent?limit=25"),
          fetchAdminAnalyticsJson<{ customers: RecentlyActiveCustomerRow[] }>("/api/admin/analytics/customers/recently-active?limit=20"),
        ]);

        if (!cancelled) {
          setState({
            overview: overviewJson.overview,
            registrations: registrationsJson.registrations ?? [],
            activity: activityJson.activity ?? [],
            funnel: funnelJson.funnel ?? [],
            acquisition: acquisitionJson.acquisition ?? [],
            interests: interestsJson.interests ?? [],
            eventTypes: eventTypesJson.eventTypes ?? [],
            recentEvents: recentEventsJson.recentEvents ?? [],
            recentCustomers: recentCustomersJson.customers ?? [],
          });
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : "No se pudo cargar analytics.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const registrationChartData = useMemo(
    () =>
      [...state.registrations]
        .slice(0, 14)
        .reverse()
        .map((item) => ({
          ...item,
          label: formatShortDate(item.day),
        })),
    [state.registrations]
  );

  const activityChartData = useMemo(
    () =>
      [...state.activity]
        .slice(0, 14)
        .reverse()
        .map((item) => ({
          ...item,
          label: formatShortDate(item.day),
        })),
    [state.activity]
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 text-white/70">
          Cargando analítica...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 text-red-300">
        {error}
      </div>
    );
  }

  const overview = state.overview;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-white/40">Clientes</p>
          <p className="mt-3 text-3xl font-semibold text-white">{overview?.total_customers ?? 0}</p>
          <p className="mt-2 text-sm text-white/60">Total registrados</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-white/40">Verificados</p>
          <p className="mt-3 text-3xl font-semibold text-white">{overview?.verified_customers ?? 0}</p>
          <p className="mt-2 text-sm text-white/60">Correo verificado</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-white/40">Activos 7d</p>
          <p className="mt-3 text-3xl font-semibold text-white">{overview?.active_last_7d ?? 0}</p>
          <p className="mt-2 text-sm text-white/60">Últimos 7 días</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-white/40">Activos 30d</p>
          <p className="mt-3 text-3xl font-semibold text-white">{overview?.active_last_30d ?? 0}</p>
          <p className="mt-2 text-sm text-white/60">Últimos 30 días</p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-white/40">Perfil promedio</p>
          <p className="mt-3 text-3xl font-semibold text-white">
            {overview?.avg_profile_completion_percent ?? 0}%
          </p>
          <p className="mt-2 text-sm text-white/60">Completitud promedio</p>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/40">Registros</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Registros por día</h2>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={registrationChartData}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="label" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip />
                <Bar dataKey="registrations" name="Registros" fill="currentColor" className="text-white" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/40">Actividad</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Logins por día</h2>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={activityChartData}>
                <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                <XAxis dataKey="label" stroke="rgba(255,255,255,0.5)" />
                <YAxis stroke="rgba(255,255,255,0.5)" />
                <Tooltip />
                <Line type="monotone" dataKey="logins" name="Logins" stroke="currentColor" className="text-white" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.2fr_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/40">Embudo</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Activación</h2>
          </div>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <Tooltip />
                <Funnel data={state.funnel} dataKey="total" nameKey="stage">
                  <LabelList position="right" fill="currentColor" className="text-white text-xs" stroke="none" dataKey="stage" />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-white/40">Eventos</p>
          <h2 className="mt-2 text-xl font-semibold text-white">Tipos de evento</h2>

          <div className="mt-4 space-y-3">
            {state.eventTypes.slice(0, 10).map((item) => (
              <div
                key={item.event_type}
                className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-medium text-white">{item.event_type}</p>
                  <p className="text-xs text-white/45">
                    {item.unique_customers} clientes únicos
                  </p>
                </div>
                <p className="text-sm font-semibold text-white">{item.total_events}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/40">Adquisición</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Fuentes</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white/80">
              <thead className="text-left text-white/45">
                <tr>
                  <th className="pb-3 pr-4">Fuente</th>
                  <th className="pb-3 pr-4">Clientes</th>
                  <th className="pb-3 pr-4">Verificados</th>
                  <th className="pb-3">Activos 30d</th>
                </tr>
              </thead>
              <tbody>
                {state.acquisition.map((row) => (
                  <tr key={row.code} className="border-t border-white/8">
                    <td className="py-3 pr-4">{row.label}</td>
                    <td className="py-3 pr-4">{row.total_customers}</td>
                    <td className="py-3 pr-4">{row.verified_customers}</td>
                    <td className="py-3">{row.active_last_30d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/40">Intereses</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Top intereses</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white/80">
              <thead className="text-left text-white/45">
                <tr>
                  <th className="pb-3 pr-4">Interés</th>
                  <th className="pb-3 pr-4">Categoría</th>
                  <th className="pb-3 pr-4">Clientes</th>
                  <th className="pb-3">Activos 30d</th>
                </tr>
              </thead>
              <tbody>
                {state.interests.map((row) => (
                  <tr key={row.code} className="border-t border-white/8">
                    <td className="py-3 pr-4">{row.label}</td>
                    <td className="py-3 pr-4">{row.category ?? "general"}</td>
                    <td className="py-3 pr-4">{row.total_customers}</td>
                    <td className="py-3">{row.active_last_30d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/40">Eventos recientes</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Actividad reciente</h2>
          </div>

          <div className="space-y-3">
            {state.recentEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white">{event.event_type}</p>
                    <p className="text-xs text-white/45">
                      {event.email ?? "Sin correo"} · {event.page_path ?? "sin ruta"}
                    </p>
                  </div>
                  <p className="text-xs text-white/45">{formatDate(event.event_timestamp)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="mb-4">
            <p className="text-xs uppercase tracking-[0.18em] text-white/40">Clientes activos</p>
            <h2 className="mt-2 text-xl font-semibold text-white">Recientemente activos</h2>
          </div>

          <div className="space-y-3">
            {state.recentCustomers.map((customer) => (
              <div
                key={customer.id}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-white">
                      {[customer.first_name, customer.last_name].filter(Boolean).join(" ") || customer.email || "Cliente"}
                    </p>
                    <p className="text-xs text-white/45">
                      {customer.email ?? "Sin correo"} · {customer.customer_type ?? "sin tipo"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-white">{customer.profile_completion_percent ?? 0}%</p>
                    <p className="text-xs text-white/45">{formatDate(customer.last_seen_at)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}