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
        .from("back_in_stock_requests")
        .select(`
      id,
      product_id,
      customer_id,
      email,
      phone,
      channel,
      status,
      requested_at,
      notified_at,
      source,
      notes,
      created_at,
      updated_at,
      products (
        name,
        slug
      )
    `)
        .order("created_at", { ascending: false })
        .limit(5000);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const rows = ((data ?? []) as Array<{
        id: string;
        product_id: string;
        customer_id: string | null;
        email: string | null;
        phone: string | null;
        channel: string;
        status: string;
        requested_at: string;
        notified_at: string | null;
        source: string | null;
        notes: string | null;
        created_at: string;
        updated_at: string;
        products: Array<{ name: string; slug: string }> | null;
    }>).map((row) => {
        const product = row.products?.[0] ?? null;

        return {
            id: row.id,
            product_id: row.product_id,
            product_name: product?.name ?? null,
            product_slug: product?.slug ?? null,
            customer_id: row.customer_id,
            email: row.email,
            phone: row.phone,
            channel: row.channel,
            status: row.status,
            requested_at: row.requested_at,
            notified_at: row.notified_at,
            source: row.source,
            notes: row.notes,
            created_at: row.created_at,
            updated_at: row.updated_at,
        };
    });

    if (format === "csv") {
        const csv = toCsv(rows);

        return new Response(csv, {
            status: 200,
            headers: {
                "Content-Type": "text/csv; charset=utf-8",
                "Content-Disposition": 'attachment; filename="back_in_stock_requests.csv"',
            },
        });
    }

    return NextResponse.json({ rows });
}