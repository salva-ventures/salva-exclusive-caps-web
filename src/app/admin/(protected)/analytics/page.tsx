import { requireAdminUser } from "@/lib/admin/auth";
import AnalyticsDashboardClient from "@/app/admin/analytics/AnalyticsDashboardClient";

export default async function AdminAnalyticsPage() {
  await requireAdminUser();

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-red-500/80">
            Admin
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Analytics
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-7 text-white/70 sm:text-base">
            Vista interna de métricas de clientes, activación, adquisición, intereses y eventos.
          </p>
        </div>

        <AnalyticsDashboardClient />
      </section>
    </main>
  );
}