import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  await requireAdminUser();

  const { searchParams } = new URL(request.url);
  const limitParam = Number(searchParams.get("limit") ?? "50");
  const limit = Number.isFinite(limitParam) ? Math.max(1, Math.min(limitParam, 200)) : 50;

  const { data, error } = await supabaseAdmin
    .from("analytics_customer_events_recent_v")
    .select("*")
    .limit(limit);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ recentEvents: data ?? [] });
}