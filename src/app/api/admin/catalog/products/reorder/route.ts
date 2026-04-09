import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { logAdminMediaEvent } from "@/lib/admin/audit";
import { supabaseAdmin } from "@/lib/supabase/admin";

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function POST(request: Request) {
  const adminUser = await requireAdminUser();

  const body = await request.json().catch(() => null) as
    | { scope?: "retail" | "wholesale"; orderedIds?: string[] }
    | null;

  const scope = body?.scope;
  const orderedIds = body?.orderedIds ?? [];

  if (!scope || !["retail", "wholesale"].includes(scope)) {
    return NextResponse.json({ error: "Scope invalido." }, { status: 400 });
  }

  if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
    return NextResponse.json({ error: "No se recibio orden." }, { status: 400 });
  }

  if (orderedIds.some((id) => !isUuid(id))) {
    return NextResponse.json({ error: "Hay IDs invalidos." }, { status: 400 });
  }

  const sortField = scope === "retail" ? "retail_sort_order" : "wholesale_sort_order";

  for (let index = 0; index < orderedIds.length; index++) {
    const id = orderedIds[index];
    const sortOrder = index + 1;

    const { error } = await supabaseAdmin
      .from("products")
      .update({
        [sortField]: sortOrder,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: `No se pudo actualizar orden de ${id}: ${error.message}` },
        { status: 500 }
      );
    }
  }

  await logAdminMediaEvent({
    adminEmail: adminUser.email,
    actionType: "move_media",
    details: {
      admin_catalog_bulk_reorder: true,
      scope,
      ordered_ids: orderedIds,
    },
  });

  return NextResponse.json({ ok: true });
}