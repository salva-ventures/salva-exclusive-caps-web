import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function backToEditor(productId: string, params: string) {
  return `/admin/products/${productId}/media?${params}`;
}

export async function POST(request: Request) {
  await requireAdminUser();

  const formData = await request.formData();
  const action = String(formData.get("bulk_action") ?? "");
  const productId = String(formData.get("product_id") ?? "");
  const selectedMediaIds = formData
    .getAll("media_ids")
    .map((value) => String(value))
    .filter((value) => isUuid(value));

  if (!isUuid(productId)) {
    redirect("/admin/products?error=invalid-product");
  }

  if (!selectedMediaIds.length) {
    redirect(backToEditor(productId, "error=bulk-no-selection"));
  }

  const { data: rows, error: rowsError } = await supabaseAdmin
    .from("product_media")
    .select("id, product_id, media_type, status, is_primary, sort_order, bucket, storage_path")
    .in("id", selectedMediaIds)
    .eq("product_id", productId);

  if (rowsError || !rows) {
    redirect(backToEditor(productId, "error=bulk-load-failed"));
  }

  if (!rows.length) {
    redirect(backToEditor(productId, "error=bulk-no-selection"));
  }

  if (action === "archive") {
    const archivedIds = rows.map((row) => row.id);

    const { error: archiveError } = await supabaseAdmin
      .from("product_media")
      .update({
        status: "archived",
        is_primary: false,
        deleted_at: new Date().toISOString(),
      })
      .in("id", archivedIds);

    if (archiveError) {
      redirect(backToEditor(productId, "error=bulk-archive-failed"));
    }

    const archivedPrimary = rows.some((row) => row.is_primary);

    if (archivedPrimary) {
      const { data: candidateRows } = await supabaseAdmin
        .from("product_media")
        .select("id")
        .eq("product_id", productId)
        .eq("status", "active")
        .order("sort_order", { ascending: true })
        .limit(1);

      const nextPrimary = candidateRows?.[0];

      if (nextPrimary?.id) {
        await supabaseAdmin
          .from("product_media")
          .update({ is_primary: true })
          .eq("id", nextPrimary.id);
      }
    }

    redirect(backToEditor(productId, `success=bulk-archived&count=${archivedIds.length}`));
  }

  if (action === "restore") {
    const imageRows = rows.filter((row) => row.media_type === "image");
    const videoRows = rows.filter((row) => row.media_type === "video");

    const { data: activeImages } = await supabaseAdmin
      .from("product_media")
      .select("id, sort_order, is_primary")
      .eq("product_id", productId)
      .eq("media_type", "image")
      .eq("status", "active");

    const { data: activeVideos } = await supabaseAdmin
      .from("product_media")
      .select("id, sort_order")
      .eq("product_id", productId)
      .eq("media_type", "video")
      .eq("status", "active");

    const activeImageCount = activeImages?.length ?? 0;
    const activeVideoCount = activeVideos?.length ?? 0;

    if (activeImageCount + imageRows.length > 10) {
      redirect(backToEditor(productId, "error=restore-image-limit"));
    }

    if (activeVideoCount + videoRows.length > 3) {
      redirect(backToEditor(productId, "error=restore-video-limit"));
    }

    let nextImageSort =
      (activeImages ?? []).reduce((max, item) => Math.max(max, item.sort_order ?? 0), 0) + 1;

    let nextVideoSort =
      (activeVideos ?? []).reduce((max, item) => Math.max(max, item.sort_order ?? 0), 0) + 1;

    const hasImagePrimary = (activeImages ?? []).some((item) => item.is_primary === true);

    for (const row of rows) {
      const updatePayload: Record<string, unknown> = {
        status: "active",
        deleted_at: null,
        updated_at: new Date().toISOString(),
      };

      if (row.media_type === "image") {
        updatePayload.sort_order = nextImageSort++;
        updatePayload.is_primary = !hasImagePrimary && nextImageSort === 2;
      } else {
        updatePayload.sort_order = nextVideoSort++;
        updatePayload.is_primary = false;
      }

      const { error } = await supabaseAdmin
        .from("product_media")
        .update(updatePayload)
        .eq("id", row.id);

      if (error) {
        redirect(backToEditor(productId, "error=bulk-restore-failed"));
      }
    }

    redirect(backToEditor(productId, `success=bulk-restored&count=${rows.length}`));
  }

  if (action === "delete") {
    const storageByBucket = new Map<string, string[]>();

    for (const row of rows) {
      const current = storageByBucket.get(row.bucket) ?? [];
      current.push(row.storage_path);
      storageByBucket.set(row.bucket, current);
    }

    for (const [bucket, paths] of storageByBucket.entries()) {
      const { error: removeError } = await supabaseAdmin.storage
        .from(bucket)
        .remove(paths);

      if (removeError) {
        redirect(backToEditor(productId, "error=bulk-delete-storage"));
      }
    }

    const hadPrimary = rows.some((row) => row.is_primary);

    const { error: deleteError } = await supabaseAdmin
      .from("product_media")
      .delete()
      .in("id", rows.map((row) => row.id));

    if (deleteError) {
      redirect(backToEditor(productId, "error=bulk-delete-db"));
    }

    if (hadPrimary) {
      const { data: candidateRows } = await supabaseAdmin
        .from("product_media")
        .select("id")
        .eq("product_id", productId)
        .eq("status", "active")
        .order("sort_order", { ascending: true })
        .limit(1);

      const nextPrimary = candidateRows?.[0];

      if (nextPrimary?.id) {
        await supabaseAdmin
          .from("product_media")
          .update({ is_primary: true })
          .eq("id", nextPrimary.id);
      }
    }

    redirect(backToEditor(productId, `success=bulk-deleted&count=${rows.length}`));
  }

  redirect(backToEditor(productId, "error=bulk-invalid-action"));
}