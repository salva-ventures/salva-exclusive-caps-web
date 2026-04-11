import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { logAdminMediaEvent } from "@/lib/admin/audit";
import { supabaseAdmin } from "@/lib/supabase/admin";

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function POST(request: Request) {
  const adminUser = await requireAdminUser();
  const body = await request.json();

  const placement = body?.placement === "home" ? "home" : null;
  const orderedProductIds = Array.isArray(body?.orderedProductIds)
    ? body.orderedProductIds.filter((value: unknown): value is string => typeof value === "string" && isUuid(value))
    : [];

  if (!placement) {
    return NextResponse.json({ error: "Placement invÃ¡lido." }, { status: 400 });
  }

  if (!orderedProductIds.length) {
    return NextResponse.json({ error: "No se recibieron productos para reordenar." }, { status: 400 });
  }

  const { data: existingRows, error: existingError } = await supabaseAdmin
    .from("catalog_featured_slots")
    .select("id, product_id")
    .eq("placement", placement)
    .eq("is_active", true);

  if (existingError) {
    return NextResponse.json({ error: existingError.message }, { status: 500 });
  }

  const rowsByProductId = new Map(
    (existingRows ?? []).map((row) => [row.product_id as string, row.id as string])
  );

  const updates = orderedProductIds
    .map((productId: string, index: number) => {
      const rowId = rowsByProductId.get(productId);
      if (!rowId) return null;

      return supabaseAdmin
        .from("catalog_featured_slots")
        .update({
          sort_order: index + 1,
          updated_at: new Date().toISOString(),
        })
        .eq("id", rowId);
    })
    .filter(Boolean);

  const results = await Promise.all(updates);

  const failed = results.find((result) => result?.error);
  if (failed?.error) {
    return NextResponse.json({ error: failed.error.message }, { status: 500 });
  }

  await logAdminMediaEvent({
    adminEmail: adminUser.email,
    actionType: "update_admin_user",
    details: {
      admin_catalog_featured_reorder: true,
      placement,
      ordered_product_ids: orderedProductIds,
    },
  });

  return NextResponse.json({ ok: true });
}