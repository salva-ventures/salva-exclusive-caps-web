import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

function isUuid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function normalizeEmail(value: string): string {
    return value.trim().toLowerCase();
}

function normalizePhone(value: string): string {
    return value.trim();
}

function isValidEmail(value: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
    const body = (await request.json().catch(() => null)) as
        | {
            productId?: string;
            channel?: "email" | "whatsapp";
            email?: string;
            phone?: string;
            source?: string;
            notes?: string;
        }
        | null;

    const productId = String(body?.productId ?? "").trim();
    const channel = body?.channel;
    const email = typeof body?.email === "string" ? normalizeEmail(body.email) : "";
    const phone = typeof body?.phone === "string" ? normalizePhone(body.phone) : "";
    const source = typeof body?.source === "string" ? body.source.trim() : null;
    const notes = typeof body?.notes === "string" ? body.notes.trim() : null;

    if (!isUuid(productId)) {
        return NextResponse.json(
            { error: "productId invalido." },
            { status: 400 }
        );
    }

    if (channel !== "email" && channel !== "whatsapp") {
        return NextResponse.json(
            { error: "channel invalido." },
            { status: 400 }
        );
    }

    if (channel === "email") {
        if (!email || !isValidEmail(email)) {
            return NextResponse.json(
                { error: "Debes proporcionar un email valido." },
                { status: 400 }
            );
        }
    }

    if (channel === "whatsapp") {
        if (!phone) {
            return NextResponse.json(
                { error: "Debes proporcionar un telefono valido." },
                { status: 400 }
            );
        }
    }

    const { data: product, error: productError } = await supabaseAdmin
        .from("products")
        .select("id, slug, name")
        .eq("id", productId)
        .maybeSingle();

    if (productError) {
        return NextResponse.json(
            { error: `No se pudo validar el producto: ${productError.message}` },
            { status: 500 }
        );
    }

    if (!product) {
        return NextResponse.json(
            { error: "Producto no encontrado." },
            { status: 404 }
        );
    }

    const requestInsert = {
        product_id: product.id,
        customer_id: null,
        email: channel === "email" ? email : null,
        phone: channel === "whatsapp" ? phone : null,
        channel,
        status: "pending",
        source,
        notes,
    };

    const { data: insertedRequest, error: insertError } = await supabaseAdmin
        .from("back_in_stock_requests")
        .insert(requestInsert)
        .select("id, product_id, customer_id, channel, status, requested_at")
        .maybeSingle();

    if (insertError) {
        if (insertError.code === "23505") {
            return NextResponse.json(
                { error: "Ya existe una solicitud pendiente para este producto con ese contacto." },
                { status: 409 }
            );
        }

        return NextResponse.json(
            { error: `No se pudo registrar la solicitud: ${insertError.message}` },
            { status: 500 }
        );
    }

    await supabaseAdmin.from("customer_events").insert({
        customer_id: null,
        event_type: "back_in_stock_requested",
        page_path: `/catalogo/${product.slug}`,
        source,
        medium: channel,
        campaign: null,
        referrer: request.headers.get("referer"),
        device_type: null,
        country_code: null,
        event_data: {
            back_in_stock_request_id: insertedRequest?.id ?? null,
            channel,
            email: channel === "email" ? email : null,
            phone: channel === "whatsapp" ? phone : null,
            source,
        },
        event_value: null,
        page_title: `Back in stock request | ${product.name}`,
        entity_type: "product",
        entity_id: product.id,
        entity_slug: product.slug,
        session_id: null,
        anonymous_id: null,
        search_query: null,
        filter_payload: {},
        utm_source: null,
        utm_medium: null,
        utm_campaign: null,
        ip_country_code: null,
    });

    return NextResponse.json({
        ok: true,
        message: "Solicitud registrada correctamente.",
        request: insertedRequest,
    });
}