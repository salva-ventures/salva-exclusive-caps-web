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
  _request: Request,
  context: { params: Promise<{ mediaId: string }> }
) {
  await requireAdminUser();

  const { mediaId } = await context.params;

  if (!isUuid(mediaId)) {
    redirect("/admin/products?error=invalid-media");
  }

  const { data: mediaRow, error: mediaError } = await supabaseAdmin
    .from("product_media")
    .select("id, product_id, media_type, status")
    .eq("id", mediaId)
    .maybeSingle();

  if (mediaError || !mediaRow) {
    redirect("/admin/products?error=media-not-found");
  }

  if (mediaRow.status !== "active") {
    redirect(backToEditor(mediaRow.product_id, "error=primary-inactive"));
  }

  const { error: clearError } = await supabaseAdmin
    .from("product_media")
    .update({ is_primary: false })
    .eq("product_id", mediaRow.product_id)
    .eq("status", "active")
    .eq("is_primary", true);

  if (clearError) {
    redirect(backToEditor(mediaRow.product_id, "error=primary-failed"));
  }

  const { error: setError } = await supabaseAdmin
    .from("product_media")
    .update({ is_primary: true })
    .eq("id", mediaId);

  if (setError) {
    redirect(backToEditor(mediaRow.product_id, "error=primary-failed"));
  }

  redirect(backToEditor(mediaRow.product_id, "success=primary"));
}