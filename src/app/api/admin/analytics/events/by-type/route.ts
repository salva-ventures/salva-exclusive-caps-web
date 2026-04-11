import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { getAnalyticsDateRange } from "@/lib/admin/analytics-date-range";

export async function GET(request: Request) {
  await requireAdminUser();

  const { searchParams } = new URL(request.url);
  const range = getAnalyticsDateRange(searchParams);

  const { data, error } = await supabaseAdmin
    .from("customer_events")
    .select("event_type, customer_id, event_timestamp")
    .gte("event_timestamp", range.fromIso)
    .lte("event_timestamp", range.toIso)
    .order("event_timestamp", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const map = new Map();

  for (const row of data ?? []) {
    const current = map.get(row.event_type) ?? {
      event_type: row.event_type,
      total_events: 0,
      unique_customers: new Set(),
      first_event_at: row.event_timestamp,
      last_event_at: row.event_timestamp,
    };

    current.total_events += 1;
    if (row.customer_id) current.unique_customers.add(row.customer_id);

    if (row.event_timestamp < current.first_event_at) current.first_event_at = row.event_timestamp;
    if (row.event_timestamp > current.last_event_at) current.last_event_at = row.event_timestamp;

    map.set(row.event_type, current);
  }

  const eventTypes = Array.from(map.values())
    .map((item) => ({
      event_type: item.event_type,
      total_events: item.total_events,
      unique_customers: item.unique_customers.size,
      first_event_at: item.first_event_at,
      last_event_at: item.last_event_at,
    }))
    .sort((a, b) => b.total_events - a.total_events);

  return NextResponse.json({
    eventTypes,
    range: { from: range.from, to: range.to },
  });
}