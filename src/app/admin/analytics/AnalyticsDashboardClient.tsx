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
  if (!value) return "â€”";
  return new Date(value).toLocaleString("es-MX");
}

function formatShortDate(value: string) {
  return new Date(value).toLocaleDateString("es-MX", {
    month: "short",
    day: "numeric",
  });
}

function formatPercent(value: number | null | undefined) {
  return `${value ?? 0}%`;
}

function stageLabel(stage: string) {
  switch (stage) {
    case "registered":
      return "Registrados";
    case "verified_email":
      return "Correo verificado";
    case "logged_in":
      return "Con login";
    case "profile_completed":
      return "Perfil completo";
    default:
      return stage;
  }
}

function eventLabel(value: string) {
  return value
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function customerName(customer: RecentlyActiveCustomerRow) {
  const name = [customer.first_name, customer.last_name].filter(Boolean).join(" ").trim();
  return name || customer.email || "Cliente";
}

function SectionCard({
  eyebrow,
  title,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
      <div className="flex items-start justify-between gap-4 border-b border-white/8 px-6 py-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">{eyebrow}</p>
          <h2 className="mt-2 text-xl font-semibold text-white">{title}</h2>
        </div>
        {aside ? <div>{aside}</div> : null}
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

function MetricCard({
  label,
  value,
  helper,
}: {
  label: string;
  value: string | number;
  helper: string;
}) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-gradient-to-b from-white/[0.05] to-white/[0.02] p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)]">
      <p className="text-[11px] uppercase tracking-[0.22em] text-white/40">{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-white">{value}</p>
      <p className="mt-2 text-sm text-white/55">{helper}</p>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return (
    <div className="flex min-h-[220px] items-center justify-center rounded-[1.5rem] border border-dashed border-white/10 bg-black/20 px-6 text-center text-sm text-white/45">
      {text}
    </div>
  );
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

  const topAcquisition = useMemo(
    () => [...state.acquisition].sort((a, b) => b.total_customers - a.total_customers).slice(0, 6),
    [state.acquisition]
  );

  const topInterests = useMemo(
    () => [...state.interests].sort((a, b) => b.total_customers - a.total_customers).slice(0, 8),
    [state.interests]
  );

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-32 animate-pulse rounded-[1.5rem] border border-white/10 bg-white/[0.03]"
            />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <div className="h-[420px] animate-pulse rounded-[1.75rem] border border-white/10 bg-white/[0.03]" />
          <div className="h-[420px] animate-pulse rounded-[1.75rem] border border-white/10 bg-white/[0.03]" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[1.75rem] border border-red-500/20 bg-red-500/10 p-6 text-red-300">
        {error}
      </div>
    );
  }

  const overview = state.overview;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Clientes"
          value={overview?.total_customers ?? 0}
          helper="Total registrados"
        />
        <MetricCard
          label="Verificados"
          value={overview?.verified_customers ?? 0}
          helper="Correo confirmado"
        />
        <MetricCard
          label="Activos 7d"
          value={overview?.active_last_7d ?? 0}
          helper="Vistos recientemente"
        />
        <MetricCard
          label="Activos 30d"
          value={overview?.active_last_30d ?? 0}
          helper="Ventana mensual"
        />
        <MetricCard
          label="Perfil promedio"
          value={formatPercent(overview?.avg_profile_completion_percent)}
          helper="Calidad de datos"
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SectionCard eyebrow="Registros" title="Registros por dÃ­a">
          {registrationChartData.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={registrationChartData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="label" stroke="rgba(255,255,255,0.5)" tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.5)" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(10,10,10,0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 16,
                      color: "#fff",
                    }}
                  />
                  <Bar dataKey="registrations" name="Registros" radius={[10, 10, 0, 0]} fill="rgba(255,255,255,0.9)" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyState text="AÃºn no hay datos de registros para mostrar." />
          )}
        </SectionCard>

        <SectionCard eyebrow="Actividad" title="Logins por dÃ­a">
          {activityChartData.length > 0 ? (
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={activityChartData}>
                  <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
                  <XAxis dataKey="label" stroke="rgba(255,255,255,0.5)" tickLine={false} axisLine={false} />
                  <YAxis stroke="rgba(255,255,255,0.5)" tickLine={false} axisLine={false} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(10,10,10,0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: 16,
                      color: "#fff",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="logins"
                    name="Logins"
                    stroke="rgba(255,255,255,0.92)"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyState text="AÃºn no hay actividad suficiente para graficar." />
          )}
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SectionCard eyebrow="Funnel" title="Embudo de activaciÃ³n">
          {state.funnel.length > 0 ? (
            <div className="grid gap-5 lg:grid-cols-[1fr_280px]">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <FunnelChart>
                    <Tooltip
                      contentStyle={{
                        background: "rgba(10,10,10,0.95)",
                        border: "1px solid rgba(255,255,255,0.1)",
                        borderRadius: 16,
                        color: "#fff",
                      }}
                    />
                    <Funnel data={state.funnel} dataKey="total" nameKey="stage" isAnimationActive>
                      <LabelList
                        position="right"
                        fill="rgba(255,255,255,0.8)"
                        stroke="none"
                        dataKey="stage"
                        formatter={(value) => stageLabel(String(value ?? ""))}
                      />
                    </Funnel>
                  </FunnelChart>
                </ResponsiveContainer>
              </div>

              <div className="space-y-3">
                {state.funnel.map((item) => (
                  <div
                    key={item.stage}
                    className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                  >
                    <p className="text-sm font-medium text-white">{stageLabel(item.stage)}</p>
                    <p className="mt-1 text-2xl font-semibold text-white">{item.total}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <EmptyState text="AÃºn no hay datos del funnel de activaciÃ³n." />
          )}
        </SectionCard>

        <SectionCard eyebrow="Eventos" title="Tipos de evento">
          <div className="space-y-3">
            {state.eventTypes.length > 0 ? (
              state.eventTypes.slice(0, 10).map((item) => (
                <div
                  key={item.event_type}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
                >
                  <div>
                    <p className="text-sm font-medium text-white">{eventLabel(item.event_type)}</p>
                    <p className="text-xs text-white/45">
                      {item.unique_customers} clientes Ãºnicos
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-white">{item.total_events}</p>
                </div>
              ))
            ) : (
              <EmptyState text="TodavÃ­a no hay eventos registrados." />
            )}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SectionCard eyebrow="AdquisiciÃ³n" title="Fuentes mÃ¡s fuertes">
          {topAcquisition.length > 0 ? (
            <div className="space-y-3">
              {topAcquisition.map((row) => (
                <div
                  key={row.code}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-white">{row.label}</p>
                      <p className="text-xs text-white/45">
                        Verificados: {row.verified_customers} Â· Activos 30d: {row.active_last_30d}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-white">{row.total_customers}</p>
                      <p className="text-xs text-white/45">clientes</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="No hay fuentes de adquisiciÃ³n con datos aÃºn." />
          )}
        </SectionCard>

        <SectionCard eyebrow="Intereses" title="Intereses principales">
          {topInterests.length > 0 ? (
            <div className="grid gap-3 sm:grid-cols-2">
              {topInterests.map((row) => (
                <div
                  key={row.code}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
                >
                  <p className="text-sm font-medium text-white">{row.label}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-white/35">
                    {row.category ?? "general"}
                  </p>
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <p className="text-xl font-semibold text-white">{row.total_customers}</p>
                    <p className="text-xs text-white/45">Activos 30d: {row.active_last_30d}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="TodavÃ­a no hay intereses capturados." />
          )}
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SectionCard eyebrow="Eventos recientes" title="Actividad reciente">
          {state.recentEvents.length > 0 ? (
            <div className="space-y-3">
              {state.recentEvents.map((event) => (
                <div
                  key={event.id}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-white">
                          {eventLabel(event.event_type)}
                        </p>
                        {event.customer_type ? (
                          <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-white/55">
                            {event.customer_type}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-1 text-xs text-white/45">
                        {event.email ?? "Sin correo"} Â· {event.page_path ?? "sin ruta"}
                      </p>
                    </div>
                    <p className="text-xs text-white/45">{formatDate(event.event_timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="AÃºn no hay eventos recientes para listar." />
          )}
        </SectionCard>

        <SectionCard eyebrow="Clientes activos" title="Recientemente activos">
          {state.recentCustomers.length > 0 ? (
            <div className="space-y-3">
              {state.recentCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-white">{customerName(customer)}</p>
                      <p className="mt-1 text-xs text-white/45">
                        {customer.email ?? "Sin correo"} Â· {customer.customer_type ?? "sin tipo"}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {customer.country_code ? (
                          <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-white/55">
                            {customer.country_code}
                          </span>
                        ) : null}
                        {customer.acquisition_source ? (
                          <span className="rounded-full border border-white/10 bg-white/[0.05] px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-white/55">
                            {customer.acquisition_source}
                          </span>
                        ) : null}
                        {customer.email_verified_at ? (
                          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.16em] text-emerald-300">
                            Verificado
                          </span>
                        ) : null}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-white">
                        {formatPercent(customer.profile_completion_percent)}
                      </p>
                      <p className="text-xs text-white/45">{formatDate(customer.last_seen_at)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="TodavÃ­a no hay clientes activos recientes." />
          )}
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SectionCard eyebrow="Detalle" title="Tabla de adquisiciÃ³n completa">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white/80">
              <thead className="text-left text-white/40">
                <tr className="border-b border-white/8">
                  <th className="pb-3 pr-4 font-medium">Fuente</th>
                  <th className="pb-3 pr-4 font-medium">Clientes</th>
                  <th className="pb-3 pr-4 font-medium">Verificados</th>
                  <th className="pb-3 font-medium">Completos</th>
                </tr>
              </thead>
              <tbody>
                {state.acquisition.map((row) => (
                  <tr key={row.code} className="border-b border-white/6 last:border-b-0">
                    <td className="py-3 pr-4">{row.label}</td>
                    <td className="py-3 pr-4">{row.total_customers}</td>
                    <td className="py-3 pr-4">{row.verified_customers}</td>
                    <td className="py-3">{row.completed_profiles}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        <SectionCard eyebrow="Detalle" title="Tabla de intereses completa">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white/80">
              <thead className="text-left text-white/40">
                <tr className="border-b border-white/8">
                  <th className="pb-3 pr-4 font-medium">InterÃ©s</th>
                  <th className="pb-3 pr-4 font-medium">CategorÃ­a</th>
                  <th className="pb-3 pr-4 font-medium">Clientes</th>
                  <th className="pb-3 font-medium">Activos 30d</th>
                </tr>
              </thead>
              <tbody>
                {state.interests.map((row) => (
                  <tr key={row.code} className="border-b border-white/6 last:border-b-0">
                    <td className="py-3 pr-4">{row.label}</td>
                    <td className="py-3 pr-4">{row.category ?? "general"}</td>
                    <td className="py-3 pr-4">{row.total_customers}</td>
                    <td className="py-3">{row.active_last_30d}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </section>
    </div>
  );
}