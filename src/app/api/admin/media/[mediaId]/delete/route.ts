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

  const formData = await request.formData();
  const confirmed = String(formData.get("confirm_delete") ?? "");

  if (confirmed !== "yes") {
    redirect("/admin/products?error=delete-not-confirmed");
  }

  const { data: mediaRow, error: mediaError } = await supabaseAdmin
    .from("product_media")
    .select("id, product_id, bucket, storage_path, is_primary")
    .eq("id", mediaId)
    .maybeSingle();

  if (mediaError || !mediaRow) {
    redirect("/admin/products?error=media-not-found");
  }

  const { error: storageError } = await supabaseAdmin.storage
    .from(mediaRow.bucket)
    .remove([mediaRow.storage_path]);

  if (storageError) {
    redirect(backToEditor(mediaRow.product_id, "error=delete-storage"));
  }

  const { error: deleteError } = await supabaseAdmin
    .from("product_media")
    .delete()
    .eq("id", mediaId);

  if (deleteError) {
    redirect(backToEditor(mediaRow.product_id, "error=delete-db"));
  }

  if (mediaRow.is_primary) {
    const { data: candidateRows, error: candidateError } = await supabaseAdmin
      .from("product_media")
      .select("id")
      .eq("product_id", mediaRow.product_id)
      .eq("status", "active")
      .order("sort_order", { ascending: true })
      .limit(1);

    if (!candidateError) {
      const nextPrimary = candidateRows?.[0];
      if (nextPrimary?.id) {
        await supabaseAdmin
          .from("product_media")
          .update({ is_primary: true })
          .eq("id", nextPrimary.id);
      }
    }
  }

  redirect(backToEditor(mediaRow.product_id, "success=deleted"));
}