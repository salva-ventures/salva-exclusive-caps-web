import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const countryCode = (searchParams.get("country_code") ?? "").trim();

  if (!countryCode) {
    return NextResponse.json({ states: [] });
  }

  const { data, error } = await supabaseAdmin
    .from("country_states")
    .select("id, code, name")
    .eq("country_code", countryCode)
    .eq("is_active", true)
    .order("name", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ states: data ?? [] });
}