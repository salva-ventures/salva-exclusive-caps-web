import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { logAdminMediaEvent } from "@/lib/admin/audit";
import { supabaseAdmin } from "@/lib/supabase/admin";

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function POST(request: Request) {
  const adminUser = await requireAdminUser();

  const body = (await request.json().catch(() => null)) as
    | { orderedMediaIds?: string[] }
    | null;

  const orderedMediaIds = body?.orderedMediaIds ?? [];

  if (!Array.isArray(orderedMediaIds) || orderedMediaIds.length === 0) {
    return NextResponse.json(
      { error: "No se recibieron medios para reordenar." },
      { status: 400 }
    );
  }

  if (orderedMediaIds.some((id) => !isUuid(id))) {
    return NextResponse.json(
      { error: "Hay IDs de medios invalidos." },
      { status: 400 }
    );
  }

  if (new Set(orderedMediaIds).size !== orderedMediaIds.length) {
    return NextResponse.json(
      { error: "Hay IDs de medios duplicados." },
      { status: 400 }
    );
  }

  const { data: mediaRows, error: mediaError } = await supabaseAdmin
    .from("product_media")
    .select("id, product_id, status")
    .in("id", orderedMediaIds);

  if (mediaError) {
    return NextResponse.json(
      { error: `No se pudieron cargar los medios: ${mediaError.message}` },
      { status: 500 }
    );
  }

  const rows = mediaRows ?? [];

  if (rows.length !== orderedMediaIds.length) {
    return NextResponse.json(
      { error: "Uno o mas medios no existen." },
      { status: 400 }
    );
  }

  const productIds = [...new Set(rows.map((row) => row.product_id))];

  if (productIds.length !== 1) {
    return NextResponse.json(
      { error: "Todos los medios deben pertenecer al mismo producto." },
      { status: 400 }
    );
  }

  const hasInactive = rows.some((row) => row.status !== "active");

  if (hasInactive) {
    return NextResponse.json(
      { error: "Solo se pueden reordenar medios activos." },
      { status: 400 }
    );
  }

  const productId = productIds[0];

  for (let index = 0; index < orderedMediaIds.length; index++) {
    const mediaId = orderedMediaIds[index];
    const sortOrder = index + 1;

    const { error } = await supabaseAdmin
      .from("product_media")
      .update({
        sort_order: sortOrder,
        updated_at: new Date().toISOString(),
      })
      .eq("id", mediaId);

    if (error) {
      return NextResponse.json(
        { error: `No se pudo actualizar el orden de ${mediaId}: ${error.message}` },
        { status: 500 }
      );
    }
  }

  await logAdminMediaEvent({
    adminEmail: adminUser.email,
    actionType: "move_media",
    productId,
    details: {
      admin_media_bulk_reorder: true,
      ordered_media_ids: orderedMediaIds,
    },
  });

  return NextResponse.json({ ok: true });
}