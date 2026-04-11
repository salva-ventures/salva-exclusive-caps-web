import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getAnalyticsDateRange } from "@/lib/admin/analytics-date-range";

export async function GET(request: Request) {
  await requireAdminUser();

  const { searchParams } = new URL(request.url);
  const range = getAnalyticsDateRange(searchParams);

  const [
    totalCustomersResult,
    verifiedCustomersResult,
    completedProfilesResult,
    activeCustomersResult,
    active7dResult,
    active30dResult,
    avgCompletionRowsResult,
    totalEventsResult,
  ] = await Promise.all([
    supabaseAdmin
      .from("customer_profiles")
      .select("id", { count: "exact", head: true })
      .gte("last_seen_at", range.fromIso)
      .lte("last_seen_at", range.toIso),

    supabaseAdmin
      .from("customer_profiles")
      .select("id", { count: "exact", head: true })
      .gte("last_seen_at", range.fromIso)
      .lte("last_seen_at", range.toIso)
      .not("email_verified_at", "is", null),

    supabaseAdmin
      .from("customer_profiles")
      .select("id", { count: "exact", head: true })
      .gte("last_seen_at", range.fromIso)
      .lte("last_seen_at", range.toIso)
      .not("profile_completed_at", "is", null),

    supabaseAdmin
      .from("customer_profiles")
      .select("id", { count: "exact", head: true })
      .eq("is_active", true)
      .gte("last_seen_at", range.fromIso)
      .lte("last_seen_at", range.toIso),

    supabaseAdmin
      .from("customer_profiles")
      .select("id", { count: "exact", head: true })
      .gte("last_seen_at", new Date(Date.now() - 7 * 86400000).toISOString()),

    supabaseAdmin
      .from("customer_profiles")
      .select("id", { count: "exact", head: true })
      .gte("last_seen_at", new Date(Date.now() - 30 * 86400000).toISOString()),

    supabaseAdmin
      .from("customer_profiles")
      .select("profile_completion_percent")
      .gte("last_seen_at", range.fromIso)
      .lte("last_seen_at", range.toIso),

    supabaseAdmin
      .from("customer_events")
      .select("id", { count: "exact", head: true })
      .gte("event_timestamp", range.fromIso)
      .lte("event_timestamp", range.toIso),
  ]);

  const errors = [
    totalCustomersResult.error,
    verifiedCustomersResult.error,
    completedProfilesResult.error,
    activeCustomersResult.error,
    active7dResult.error,
    active30dResult.error,
    avgCompletionRowsResult.error,
    totalEventsResult.error,
  ].filter(Boolean);

  if (errors.length > 0) {
    return NextResponse.json({ error: errors[0]?.message ?? "Error cargando overview." }, { status: 500 });
  }

  const avgCompletionRows = avgCompletionRowsResult.data ?? [];
  const avgProfileCompletionPercent =
    avgCompletionRows.length > 0
      ? Number(
          (
            avgCompletionRows.reduce(
              (sum, row) => sum + Number(row.profile_completion_percent ?? 0),
              0
            ) / avgCompletionRows.length
          ).toFixed(2)
        )
      : 0;

  return NextResponse.json({
    overview: {
      total_customers: totalCustomersResult.count ?? 0,
      active_customers: activeCustomersResult.count ?? 0,
      verified_customers: verifiedCustomersResult.count ?? 0,
      customers_with_login: totalCustomersResult.count ?? 0,
      completed_profiles: completedProfilesResult.count ?? 0,
      marketing_opt_in_customers: 0,
      avg_profile_completion_percent: avgProfileCompletionPercent,
      active_last_7d: active7dResult.count ?? 0,
      active_last_30d: active30dResult.count ?? 0,
      total_events_in_range: totalEventsResult.count ?? 0,
      range_from: range.from,
      range_to: range.to,
    },
  });
}