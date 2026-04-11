import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getAnalyticsDateRange } from "@/lib/admin/analytics-date-range";

export async function GET(request: Request) {
  await requireAdminUser();

  const { searchParams } = new URL(request.url);
  const range = getAnalyticsDateRange(searchParams);

  const limitParam = Number(searchParams.get("limit") ?? "50");
  const limit = Number.isFinite(limitParam) ? Math.max(1, Math.min(limitParam, 200)) : 50;

  const { data, error } = await supabaseAdmin
    .from("analytics_customer_events_recent_v")
    .select("*")
    .gte("event_timestamp", range.fromIso)
    .lte("event_timestamp", range.toIso)
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    recentEvents: data ?? [],
    range: { from: range.from, to: range.to },
  });
}