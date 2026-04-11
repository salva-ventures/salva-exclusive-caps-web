import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth/admin";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  await requireAdminUser();

  const { data, error } = await supabaseAdmin
    .from("analytics_customer_events_by_type_v")
    .select("*")
    .order("total_events", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ eventTypes: data ?? [] });
}