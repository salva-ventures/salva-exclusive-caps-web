import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { logAdminMediaEvent } from "@/lib/admin/audit";
import { supabaseAdmin } from "@/lib/supabase/admin";

const BUCKET = "product-videos";
const MAX_FILES = 3;
const ALLOWED_TYPES = new Set([
  "video/mp4",
  "video/webm",
  "video/quicktime",
]);

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function slugifyFileBase(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");
}

function pad(num: number): string {
  return String(num).padStart(2, "0");
}

function backToEditor(productId: string, params: string) {
  return `/admin/products/${productId}/media?${params}`;
}

export async function POST(
  request: Request,
  context: { params: Promise<{ productId: string }> }
) {
  const adminUser = await requireAdminUser();
  const { productId } = await context.params;

  if (!isUuid(productId)) {
    redirect("/admin/products?error=invalid-product");
  }

  const formData = await request.formData();
  const files = formData.getAll("files").filter((value): value is File => value instanceof File);

  if (!files.length) {
    redirect(backToEditor(productId, "error=no-files"));
  }

  if (files.length > MAX_FILES) {
    redirect(backToEditor(productId, "error=too-many-videos"));
  }

  for (const file of files) {
    if (!ALLOWED_TYPES.has(file.type)) {
      redirect(backToEditor(productId, "error=invalid-video-type"));
    }
  }

  const { data: product, error: productError } = await supabaseAdmin
    .from("products")
    .select("id, slug")
    .eq("id", productId)
    .maybeSingle();

  if (productError || !product) {
    redirect("/admin/products?error=product-not-found");
  }

  const { data: existingMedia, error: existingMediaError } = await supabaseAdmin
    .from("product_media")
    .select("id, sort_order, is_primary, status, media_type")
    .eq("product_id", productId)
    .eq("media_type", "video")
    .eq("status", "active")
    .order("sort_order", { ascending: true });

  if (existingMediaError) {
    redirect(backToEditor(productId, "error=load-videos"));
  }

  const currentVideos = existingMedia ?? [];
  const currentCount = currentVideos.length;

  if (currentCount + files.length > 3) {
    redirect(backToEditor(productId, "error=video-limit"));
  }

  let nextSortOrder =
    currentVideos.reduce((max, item) => Math.max(max, item.sort_order ?? 0), 0) + 1;

  const insertedRows: Array<Record<string, unknown>> = [];

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const originalFilename = file.name || `video-${index + 1}`;
    const ext = originalFilename.includes(".")
      ? `.${originalFilename.split(".").pop()!.toLowerCase()}`
      : "";
    const baseName = originalFilename.replace(/\.[^/.]+$/, "");
    const safeBase = slugifyFileBase(baseName) || "video";
    const sortOrder = nextSortOrder++;
    const storagePath = `products/${product.slug}/videos/${pad(sortOrder)}-${safeBase}${ext}`;

    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(storagePath, fileBuffer, {
        upsert: true,
        cacheControl: "31536000",
        contentType: file.type,
      });

    if (uploadError) {
      redirect(backToEditor(productId, "error=video-upload"));
    }

    const { data: publicData } = supabaseAdmin.storage
      .from(BUCKET)
      .getPublicUrl(storagePath);

    insertedRows.push({
      product_id: product.id,
      bucket: BUCKET,
      storage_path: storagePath,
      public_url: publicData.publicUrl,
      media_type: "video",
      original_filename: originalFilename,
      alt_text: null,
      sort_order: sortOrder,
      is_primary: false,
      status: "active",
      mime_type: file.type || null,
      file_size_bytes: file.size || null,
    });
  }

  const { data: insertedData, error: insertError } = await supabaseAdmin
    .from("product_media")
    .insert(insertedRows)
    .select("id");

  if (insertError) {
    redirect(backToEditor(productId, "error=video-insert"));
  }

  await logAdminMediaEvent({
    adminEmail: adminUser.email,
    actionType: "upload_video",
    productId: product.id,
    details: {
      count: insertedRows.length,
      mediaIds: (insertedData ?? []).map((row) => row.id),
    },
  });

  redirect(backToEditor(productId, `success=videos-uploaded&count=${insertedRows.length}`));
}