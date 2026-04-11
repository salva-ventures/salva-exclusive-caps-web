import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  await requireAdminUser();

  const { data, error } = await supabaseAdmin
    .from("analytics_customer_activation_funnel_v")
    .select("*");

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ funnel: data ?? [] });
}