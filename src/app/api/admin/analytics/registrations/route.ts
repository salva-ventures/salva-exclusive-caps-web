import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getAnalyticsDateRange } from "@/lib/admin/analytics-date-range";

export async function GET(request: Request) {
  await requireAdminUser();

  const { searchParams } = new URL(request.url);
  const range = getAnalyticsDateRange(searchParams);

  const { data, error } = await supabaseAdmin
    .from("analytics_customer_registrations_daily_v")
    .select("*")
    .gte("day", range.from)
    .lte("day", range.to)
    .order("day", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    registrations: data ?? [],
    range: { from: range.from, to: range.to },
  });
}