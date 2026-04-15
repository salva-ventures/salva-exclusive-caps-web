import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
    await requireAdminUser();

    const body = (await request.json().catch(() => null)) as
        | {
            requestId?: string;
            status?: "pending" | "notified" | "cancelled";
        }
        | null;

    const requestId = body?.requestId;
    const status = body?.status;

    if (!requestId) {
        return NextResponse.json(
            { error: "requestId requerido" },
            { status: 400 }
        );
    }

    if (!status || !["pending", "notified", "cancelled"].includes(status)) {
        return NextResponse.json(
            { error: "status invalido" },
            { status: 400 }
        );
    }

    const updateData: Record<string, unknown> = {
        status,
    };

    if (status === "notified") {
        updateData.notified_at = new Date().toISOString();
    }

    const { error } = await supabaseAdmin
        .from("back_in_stock_requests")
        .update(updateData)
        .eq("id", requestId);

    if (error) {
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        );
    }

    return NextResponse.json({
        ok: true,
        status,
    });
}