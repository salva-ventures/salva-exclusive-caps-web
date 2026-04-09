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
    .select("id, product_id, media_type, sort_order, status")
    .eq("id", mediaId)
    .maybeSingle();

  if (mediaError || !mediaRow) {
    redirect("/admin/products?error=media-not-found");
  }

  if (mediaRow.status !== "archived") {
    redirect(backToEditor(mediaRow.product_id, "error=restore-not-archived"));
  }

  const { data: activeRows, error: activeError } = await supabaseAdmin
    .from("product_media")
    .select("id, is_primary, sort_order")
    .eq("product_id", mediaRow.product_id)
    .eq("media_type", mediaRow.media_type)
    .eq("status", "active")
    .order("sort_order", { ascending: true });

  if (activeError) {
    redirect(backToEditor(mediaRow.product_id, "error=restore-failed"));
  }

  const activeCount = activeRows?.length ?? 0;

  if (mediaRow.media_type === "image" && activeCount >= 10) {
    redirect(backToEditor(mediaRow.product_id, "error=restore-image-limit"));
  }

  if (mediaRow.media_type === "video" && activeCount >= 3) {
    redirect(backToEditor(mediaRow.product_id, "error=restore-video-limit"));
  }

  const nextSortOrder =
    (activeRows ?? []).reduce((max, item) => Math.max(max, item.sort_order ?? 0), 0) + 1;

  const hasPrimary = (activeRows ?? []).some((item) => item.is_primary === true);

  const { error: restoreError } = await supabaseAdmin
    .from("product_media")
    .update({
      status: "active",
      deleted_at: null,
      sort_order: nextSortOrder,
      is_primary: !hasPrimary && mediaRow.media_type === "image",
      updated_at: new Date().toISOString(),
    })
    .eq("id", mediaId);

  if (restoreError) {
    redirect(backToEditor(mediaRow.product_id, "error=restore-failed"));
  }

  redirect(backToEditor(mediaRow.product_id, "success=restored"));
}