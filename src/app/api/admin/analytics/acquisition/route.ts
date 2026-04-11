import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getAnalyticsDateRange } from "@/lib/admin/analytics-date-range";

export async function GET(request: Request) {
  await requireAdminUser();

  const { searchParams } = new URL(request.url);
  const range = getAnalyticsDateRange(searchParams);

  const [{ data: sources, error: sourcesError }, { data: profiles, error: profilesError }] = await Promise.all([
    supabaseAdmin
      .from("customer_acquisition_source_catalog")
      .select("code, label, sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),

    supabaseAdmin
      .from("customer_profiles")
      .select("id, acquisition_source, email_verified_at, profile_completed_at, last_seen_at")
      .gte("last_seen_at", range.fromIso)
      .lte("last_seen_at", range.toIso),
  ]);

  if (sourcesError || profilesError) {
    return NextResponse.json({ error: sourcesError?.message ?? profilesError?.message ?? "Error cargando acquisition." }, { status: 500 });
  }

  const acquisition = (sources ?? []).map((source) => {
    const matching = (profiles ?? []).filter((profile) => profile.acquisition_source === source.code);

    return {
      code: source.code,
      label: source.label,
      sort_order: source.sort_order,
      total_customers: matching.length,
      verified_customers: matching.filter((item) => item.email_verified_at).length,
      completed_profiles: matching.filter((item) => item.profile_completed_at).length,
      active_last_30d: matching.length,
    };
  });

  return NextResponse.json({
    acquisition,
    range: { from: range.from, to: range.to },
  });
}