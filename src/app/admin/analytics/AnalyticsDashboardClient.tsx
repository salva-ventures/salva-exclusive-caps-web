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
  overview: (AnalyticsOverview & {
    total_events_in_range?: number;
    range_from?: string;
    range_to?: string;
  }) | null;
  registrations: RegistrationRow[];
  activity: ActivityRow[];
  funnel: FunnelRow[];
  acquisition: AcquisitionRow[];
  interests: InterestRow[];
  eventTypes: EventTypeRow[];
  recentEvents: RecentEventRow[];
  recentCustomers: RecentlyActiveCustomerRow[];
};

type DatePreset = "7d" | "30d" | "90d" | "custom";

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
      return "Con acceso";
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
  description,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <section className="rounded-[1.75rem] border border-white/10 bg-white/[0.03] shadow-[0_18px_50px_rgba(0,0,0,0.22)]">
      <div className="flex items-start justify-between gap-4 border-b border-white/8 px-6 py-5">
        <div>
          <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">{eyebrow}</p>
          <h2 className="mt-2 text-xl font-semibold text-white">{title}</h2>
          {description ? (
            <p className="mt-2 max-w-2xl text-sm leading-6 text-white/50">{description}</p>
          ) : null}
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

function toInputDate(date: Date) {
  const offset = date.getTimezoneOffset();
  const adjusted = new Date(date.getTime() - offset * 60000);
  return adjusted.toISOString().slice(0, 10);
}

export default function AnalyticsDashboardClient() {
  const [state, setState] = useState<DashboardState>(initialState);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const today = useMemo(() => new Date(), []);
  const [preset, setPreset] = useState<DatePreset>("30d");
  const [fromDate, setFromDate] = useState(
    toInputDate(new Date(today.getTime() - 29 * 86400000))
  );
  const [toDate, setToDate] = useState(toInputDate(today));

  useEffect(() => {
    const base = new Date(today);

    if (preset === "7d") {
      setFromDate(toInputDate(new Date(base.getTime() - 6 * 86400000)));
      setToDate(toInputDate(base));
    }

    if (preset === "30d") {
      setFromDate(toInputDate(new Date(base.getTime() - 29 * 86400000)));
      setToDate(toInputDate(base));
    }

    if (preset === "90d") {
      setFromDate(toInputDate(new Date(base.getTime() - 89 * 86400000)));
      setToDate(toInputDate(base));
    }
  }, [preset, today]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams({
          from: fromDate,
          to: toDate,
        }).toString();

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
          fetchAdminAnalyticsJson<{
            overview: DashboardState["overview"];
          }>(`/api/admin/analytics/overview?${params}`),
          fetchAdminAnalyticsJson<{
            registrations: RegistrationRow[];
          }>(`/api/admin/analytics/registrations?${params}`),
          fetchAdminAnalyticsJson<{
            activity: ActivityRow[];
          }>(`/api/admin/analytics/activity?${params}`),
          fetchAdminAnalyticsJson<{
            funnel: FunnelRow[];
          }>(`/api/admin/analytics/funnel?${params}`),
          fetchAdminAnalyticsJson<{
            acquisition: AcquisitionRow[];
          }>(`/api/admin/analytics/acquisition?${params}`),
          fetchAdminAnalyticsJson<{
            interests: InterestRow[];
          }>(`/api/admin/analytics/interests?${params}`),
          fetchAdminAnalyticsJson<{
            eventTypes: EventTypeRow[];
          }>(`/api/admin/analytics/events/by-type?${params}`),
          fetchAdminAnalyticsJson<{
            recentEvents: RecentEventRow[];
          }>(`/api/admin/analytics/events/recent?${params}&limit=100`),
          fetchAdminAnalyticsJson<{
            customers: RecentlyActiveCustomerRow[];
          }>(`/api/admin/analytics/customers/recently-active?${params}&limit=100`),
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
  }, [fromDate, toDate]);

  const registrationChartData = useMemo(
    () =>
      [...state.registrations]
        .slice()
        .reverse()
        .slice(-14)
        .map((item) => ({
          ...item,
          label: formatShortDate(item.day),
        })),
    [state.registrations]
  );

  const activityChartData = useMemo(
    () =>
      [...state.activity]
        .slice()
        .reverse()
        .slice(-14)
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
      <SectionCard
        eyebrow="Control"
        title="Rango de fechas"
        description="Ahora el rango sí­ se calcula desde backend. Todo el dashboard consume datos ya filtrados en servidor."
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {[
              { value: "7d", label: "Últimos 7 días" },
              { value: "30d", label: "Últimos 30 días" },
              { value: "90d", label: "Últimos 90 días" },
              { value: "custom", label: "Personalizado" },
            ].map((item) => (
              <button
                key={item.value}
                type="button"
                onClick={() => setPreset(item.value as DatePreset)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  preset === item.value
                    ? "border-white/25 bg-white/[0.10] text-white"
                    : "border-white/10 bg-black/20 text-white/70 hover:border-white/20 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="text-sm text-white/70">
              <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/40">
                Desde
              </span>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => {
                  setPreset("custom");
                  setFromDate(e.target.value);
                }}
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
              />
            </label>

            <label className="text-sm text-white/70">
              <span className="mb-2 block text-xs uppercase tracking-[0.18em] text-white/40">
                Hasta
              </span>
              <input
                type="date"
                value={toDate}
                onChange={(e) => {
                  setPreset("custom");
                  setToDate(e.target.value);
                }}
                className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-white outline-none"
              />
            </label>
          </div>
        </div>
      </SectionCard>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard
          label="Clientes visibles"
          value={overview?.total_customers ?? 0}
          helper="Con actividad en el rango"
        />
        <MetricCard
          label="Verificados"
          value={overview?.verified_customers ?? 0}
          helper="Correo confirmado"
        />
        <MetricCard
          label="Eventos visibles"
          value={overview?.total_events_in_range ?? 0}
          helper="Eventos en el rango"
        />
        <MetricCard
          label="Perfiles completos"
          value={overview?.completed_profiles ?? 0}
          helper="Completados al 100%"
        />
        <MetricCard
          label="Perfil promedio"
          value={formatPercent(overview?.avg_profile_completion_percent)}
          helper={`Ventana ${overview?.range_from ?? fromDate} a ${overview?.range_to ?? toDate}`}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SectionCard
          eyebrow="Registros"
          title="Registros por día"
          description="Lectura de altas diarias dentro del rango seleccionado."
        >
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
            <EmptyState text="No hay datos de registros dentro del rango seleccionado." />
          )}
        </SectionCard>

        <SectionCard
          eyebrow="Actividad"
          title="Accesos por día"
          description="Mide el ritmo de uso real del módulo de cuenta en el periodo actual."
        >
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
                    name="Accesos"
                    stroke="rgba(255,255,255,0.92)"
                    strokeWidth={3}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <EmptyState text="No hay accesos suficientes para graficar en este rango." />
          )}
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <SectionCard
          eyebrow="Embudo"
          title="Embudo de activación"
          description="Resume el paso desde registro hasta perfil completo."
        >
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
            <EmptyState text="Todavía no hay datos suficientes para mostrar el embudo." />
          )}
        </SectionCard>

        <SectionCard
          eyebrow="Eventos"
          title="Tipos de evento en el rango"
          description="Distribución de los eventos visibles ya filtrados desde backend."
        >
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
                      {item.unique_customers} clientes únicos
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-white">{item.total_events}</p>
                </div>
              ))
            ) : (
              <EmptyState text="No hay eventos dentro del rango seleccionado." />
            )}
          </div>
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SectionCard
          eyebrow="Adquisición"
          title="Fuentes principales"
          description="Canales declarados por los clientes al completar su perfil."
        >
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
                        Verificados: {row.verified_customers} · Activos en rango: {row.active_last_30d}
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
            <EmptyState text="Aún no hay fuentes de adquisición con datos útiles." />
          )}
        </SectionCard>

        <SectionCard
          eyebrow="Intereses"
          title="Intereses principales"
          description="Qué temas y preferencias capturan más atención dentro del perfil."
        >
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
                    <p className="text-xs text-white/45">Activos en rango: {row.active_last_30d}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="Todavía no hay intereses capturados para mostrar." />
          )}
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SectionCard
          eyebrow="Eventos recientes"
          title="Actividad reciente"
          description="Lectura cronológica de los eventos capturados para clientes."
        >
          {state.recentEvents.length > 0 ? (
            <div className="space-y-3">
              {state.recentEvents.slice(0, 25).map((event) => (
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
                        {event.email ?? "Sin correo"} · {event.page_path ?? "sin ruta"}
                      </p>
                    </div>
                    <p className="text-xs text-white/45">{formatDate(event.event_timestamp)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="No hay eventos recientes dentro del rango seleccionado." />
          )}
        </SectionCard>

        <SectionCard
          eyebrow="Clientes activos"
          title="Clientes recientemente activos"
          description="Perfiles con actividad reciente detectada en el periodo visible."
        >
          {state.recentCustomers.length > 0 ? (
            <div className="space-y-3">
              {state.recentCustomers.slice(0, 20).map((customer) => (
                <div
                  key={customer.id}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-white">{customerName(customer)}</p>
                      <p className="mt-1 text-xs text-white/45">
                        {customer.email ?? "Sin correo"} · {customer.customer_type ?? "sin tipo"}
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
            <EmptyState text="No hay clientes activos recientes dentro del rango seleccionado." />
          )}
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-2">
        <SectionCard
          eyebrow="Detalle"
          title="Adquisición completa"
          description="Tabla compacta para lectura rápida y validación manual."
        >
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

        <SectionCard
          eyebrow="Detalle"
          title="Intereses completos"
          description="Tabla completa de intereses declarados y su peso relativo."
        >
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-white/80">
              <thead className="text-left text-white/40">
                <tr className="border-b border-white/8">
                  <th className="pb-3 pr-4 font-medium">Interés</th>
                  <th className="pb-3 pr-4 font-medium">Categoría</th>
                  <th className="pb-3 pr-4 font-medium">Clientes</th>
                  <th className="pb-3 font-medium">Activos en rango</th>
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





