import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getAnalyticsDateRange } from "@/lib/admin/analytics-date-range";

export async function GET(request: Request) {
  await requireAdminUser();

  const { searchParams } = new URL(request.url);
  const range = getAnalyticsDateRange(searchParams);

  const [
    { data: catalog, error: catalogError },
    { data: links, error: linksError },
    { data: activeCustomers, error: customersError },
  ] = await Promise.all([
    supabaseAdmin
      .from("customer_interest_catalog")
      .select("code, label, category, sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),

    supabaseAdmin
      .from("customer_interests")
      .select("customer_id, interest_code"),

    supabaseAdmin
      .from("customer_profiles")
      .select("id")
      .gte("last_seen_at", range.fromIso)
      .lte("last_seen_at", range.toIso),
  ]);

  if (catalogError || linksError || customersError) {
    return NextResponse.json({ error: catalogError?.message ?? linksError?.message ?? customersError?.message ?? "Error cargando interests." }, { status: 500 });
  }

  const activeIds = new Set((activeCustomers ?? []).map((item) => item.id));

  const interests = (catalog ?? []).map((interest) => {
    const matching = (links ?? []).filter(
      (row) => row.interest_code === interest.code && activeIds.has(row.customer_id)
    );

    return {
      code: interest.code,
      label: interest.label,
      category: interest.category,
      sort_order: interest.sort_order,
      total_customers: matching.length,
      active_last_30d: matching.length,
    };
  });

  return NextResponse.json({
    interests,
    range: { from: range.from, to: range.to },
  });
}