import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function backToEditor(productId: string, params: string) {
  return `/admin/products/${productId}/media?${params}`;
}

function getAllowedTypes(mediaType: string): Set<string> {
  if (mediaType === "image") {
    return new Set([
      "image/jpeg",
      "image/png",
      "image/webp",
      "image/avif",
    ]);
  }

  if (mediaType === "video") {
    return new Set([
      "video/mp4",
      "video/webm",
      "video/quicktime",
    ]);
  }

  return new Set();
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
    .select(`
      id,
      product_id,
      bucket,
      storage_path,
      public_url,
      media_type,
      original_filename,
      alt_text,
      sort_order,
      is_primary,
      status
    `)
    .eq("id", mediaId)
    .maybeSingle();

  if (mediaError || !mediaRow) {
    redirect("/admin/products?error=media-not-found");
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    redirect(backToEditor(mediaRow.product_id, "error=replace-no-file"));
  }

  const allowedTypes = getAllowedTypes(mediaRow.media_type);

  if (!allowedTypes.has(file.type)) {
    redirect(backToEditor(mediaRow.product_id, "error=replace-invalid-type"));
  }

  const arrayBuffer = await file.arrayBuffer();
  const fileBuffer = Buffer.from(arrayBuffer);

  const { error: uploadError } = await supabaseAdmin.storage
    .from(mediaRow.bucket)
    .upload(mediaRow.storage_path, fileBuffer, {
      upsert: true,
      cacheControl: "31536000",
      contentType: file.type,
    });

  if (uploadError) {
    redirect(backToEditor(mediaRow.product_id, "error=replace-upload"));
  }

  const { data: publicData } = supabaseAdmin.storage
    .from(mediaRow.bucket)
    .getPublicUrl(mediaRow.storage_path);

  const { error: updateError } = await supabaseAdmin
    .from("product_media")
    .update({
      public_url: publicData.publicUrl,
      original_filename: file.name || mediaRow.original_filename,
      mime_type: file.type || null,
      file_size_bytes: file.size || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", mediaId);

  if (updateError) {
    redirect(backToEditor(mediaRow.product_id, "error=replace-update"));
  }

  redirect(backToEditor(mediaRow.product_id, "success=replaced"));
}