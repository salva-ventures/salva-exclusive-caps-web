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
  const confirmed = String(formData.get("confirm_archive") ?? "");

  if (confirmed !== "yes") {
    const { data: mediaPreview } = await supabaseAdmin
      .from("product_media")
      .select("product_id")
      .eq("id", mediaId)
      .maybeSingle();

    if (mediaPreview?.product_id) {
      redirect(backToEditor(mediaPreview.product_id, "error=archive-not-confirmed"));
    }

    redirect("/admin/products?error=archive-not-confirmed");
  }

  const { data: mediaRow, error: mediaError } = await supabaseAdmin
    .from("product_media")
    .select("id, product_id, is_primary")
    .eq("id", mediaId)
    .maybeSingle();

  if (mediaError || !mediaRow) {
    redirect("/admin/products?error=media-not-found");
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
    redirect(backToEditor(mediaRow.product_id, "error=archive-failed"));
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
      redirect(backToEditor(mediaRow.product_id, "error=archive-failed"));
    }

    const nextPrimary = candidateRows?.[0];

    if (nextPrimary?.id) {
      const { error: nextPrimaryError } = await supabaseAdmin
        .from("product_media")
        .update({ is_primary: true })
        .eq("id", nextPrimary.id);

      if (nextPrimaryError) {
        redirect(backToEditor(mediaRow.product_id, "error=archive-failed"));
      }
    }
  }

  redirect(backToEditor(mediaRow.product_id, "success=archived"));
}