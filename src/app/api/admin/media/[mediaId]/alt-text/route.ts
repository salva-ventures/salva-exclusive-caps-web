import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function POST(
  request: Request,
  context: { params: Promise<{ mediaId: string }> }
) {
  await requireAdminUser();

  const { mediaId } = await context.params;

  if (!isUuid(mediaId)) {
    return NextResponse.json({ error: "mediaId invalido." }, { status: 400 });
  }

  const formData = await request.formData();
  const altTextRaw = String(formData.get("alt_text") ?? "");
  const altText = altTextRaw.trim();

  const { error } = await supabaseAdmin
    .from("product_media")
    .update({
      alt_text: altText.length ? altText : null,
    })
    .eq("id", mediaId);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}