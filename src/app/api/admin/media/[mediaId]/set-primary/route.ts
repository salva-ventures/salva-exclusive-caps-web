import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function POST(
  _request: Request,
  context: { params: Promise<{ mediaId: string }> }
) {
  await requireAdminUser();

  const { mediaId } = await context.params;

  if (!isUuid(mediaId)) {
    return NextResponse.json({ error: "mediaId invalido." }, { status: 400 });
  }

  const { data: mediaRow, error: mediaError } = await supabaseAdmin
    .from("product_media")
    .select("id, product_id, media_type, status")
    .eq("id", mediaId)
    .maybeSingle();

  if (mediaError) {
    return NextResponse.json({ error: mediaError.message }, { status: 500 });
  }

  if (!mediaRow) {
    return NextResponse.json({ error: "Medio no encontrado." }, { status: 404 });
  }

  if (mediaRow.status !== "active") {
    return NextResponse.json({ error: "Solo medios activos pueden ser principal." }, { status: 400 });
  }

  const { error: clearError } = await supabaseAdmin
    .from("product_media")
    .update({ is_primary: false })
    .eq("product_id", mediaRow.product_id)
    .eq("status", "active")
    .eq("is_primary", true);

  if (clearError) {
    return NextResponse.json({ error: clearError.message }, { status: 500 });
  }

  const { error: setError } = await supabaseAdmin
    .from("product_media")
    .update({ is_primary: true })
    .eq("id", mediaId);

  if (setError) {
    return NextResponse.json({ error: setError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}