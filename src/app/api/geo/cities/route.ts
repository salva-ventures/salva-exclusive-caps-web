import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const stateId = (searchParams.get("state_id") ?? "").trim();

  if (!stateId) {
    return NextResponse.json({ cities: [] });
  }

  const { data, error } = await supabaseAdmin
    .from("state_cities")
    .select("id, name")
    .eq("state_id", stateId)
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ cities: data ?? [] });
}