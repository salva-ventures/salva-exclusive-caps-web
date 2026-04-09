import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function backToEditor(productId: string, params: string) {
  return `/admin/products/${productId}/media?${params}`;
}

export async function POST(
  request: Request,
  context: { params: Promise<{ mediaId: string }> }
) {
  await requireAdminUser();

  const { mediaId } = await context.params;

  if (!isUuid(mediaId)) {
    redirect("/admin/products?error=invalid-media");
  }

  const { data: mediaRow, error: mediaError } = await supabaseAdmin
    .from("product_media")
    .select("id, product_id")
    .eq("id", mediaId)
    .maybeSingle();

  if (mediaError || !mediaRow) {
    redirect("/admin/products?error=media-not-found");
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
    redirect(backToEditor(mediaRow.product_id, "error=alt-text-failed"));
  }

  redirect(backToEditor(mediaRow.product_id, "success=alt-text"));
}