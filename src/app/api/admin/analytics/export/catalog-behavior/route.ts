import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function escapeCsvValue(value: unknown) {
  if (value === null || value === undefined) return "";

  const stringValue =
    typeof value === "object" ? JSON.stringify(value) : String(value);

  if (/[",\n\r]/.test(stringValue)) {
    return `"${stringValue.replace(/"/g, '""')}"`;
  }

  return stringValue;
}

function toCsv(rows: Record<string, unknown>[]) {
  if (rows.length === 0) return "";

  const headers = Array.from(
    rows.reduce<Set<string>>((set, row) => {
      Object.keys(row).forEach((key) => set.add(key));
      return set;
    }, new Set<string>())
  );

  const lines = [
    headers.join(","),
    ...rows.map((row) =>
      headers.map((header) => escapeCsvValue(row[header])).join(",")
    ),
  ];

  return lines.join("\r\n");
}

export async function GET(request: Request) {
  const supabase = await createSupabaseServerClient();
  const { searchParams } = new URL(request.url);
  const format = searchParams.get("format") ?? "json";

  const { data, error } = await supabase
    .from("analytics_export_catalog_behavior_v")
    .select("*")
    .limit(5000);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const rows = (data ?? []) as Record<string, unknown>[];

  if (format === "csv") {
    const csv = toCsv(rows);

    return new Response(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="analytics_export_catalog_behavior.csv"',
      },
    });
  }

  return NextResponse.json({ rows });
}
