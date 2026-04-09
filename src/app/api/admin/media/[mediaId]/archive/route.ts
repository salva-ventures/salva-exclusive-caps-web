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
    .select("id, product_id, is_primary")
    .eq("id", mediaId)
    .maybeSingle();

  if (mediaError) {
    return NextResponse.json({ error: mediaError.message }, { status: 500 });
  }

  if (!mediaRow) {
    return NextResponse.json({ error: "Medio no encontrado." }, { status: 404 });
  }

  const { error: archiveError } = await supabaseAdmin
    .from("product_media")
    .update({
      status: "archived",
      is_primary: false,
      deleted_at: new Date().toISOString(),
    })
    .eq("id", mediaId);

  if (archiveError) {
    return NextResponse.json({ error: archiveError.message }, { status: 500 });
  }

  if (mediaRow.is_primary) {
    const { data: candidateRows, error: candidateError } = await supabaseAdmin
      .from("product_media")
      .select("id")
      .eq("product_id", mediaRow.product_id)
      .eq("status", "active")
      .order("sort_order", { ascending: true })
      .limit(1);

    if (candidateError) {
      return NextResponse.json({ error: candidateError.message }, { status: 500 });
    }

    const nextPrimary = candidateRows?.[0];

    if (nextPrimary?.id) {
      const { error: nextPrimaryError } = await supabaseAdmin
        .from("product_media")
        .update({ is_primary: true })
        .eq("id", nextPrimary.id);

      if (nextPrimaryError) {
        return NextResponse.json({ error: nextPrimaryError.message }, { status: 500 });
      }
    }
  }

  return NextResponse.json({ ok: true });
}