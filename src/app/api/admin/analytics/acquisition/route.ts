import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/auth/admin";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET() {
  await requireAdminUser();

  const { data, error } = await supabaseAdmin
    .from("analytics_customer_acquisition_v")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ acquisition: data ?? [] });
}