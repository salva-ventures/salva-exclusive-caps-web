import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getAnalyticsDateRange } from "@/lib/admin/analytics-date-range";

export async function GET(request: Request) {
  await requireAdminUser();

  const { searchParams } = new URL(request.url);
  const range = getAnalyticsDateRange(searchParams);

  const { data, error } = await supabaseAdmin
    .from("customer_profiles")
    .select("id, created_at, email_verified_at, last_login_at, profile_completed_at")
    .gte("created_at", range.fromIso)
    .lte("created_at", range.toIso);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = data ?? [];

  const funnel = [
    { stage: "registered", total: rows.length },
    { stage: "verified_email", total: rows.filter((row) => row.email_verified_at).length },
    { stage: "logged_in", total: rows.filter((row) => row.last_login_at).length },
    { stage: "profile_completed", total: rows.filter((row) => row.profile_completed_at).length },
  ];

  return NextResponse.json({
    funnel,
    range: { from: range.from, to: range.to },
  });
}