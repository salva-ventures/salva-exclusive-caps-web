import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

const BUCKET = "product-images";
const MAX_FILES = 10;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/avif",
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

export async function POST(
  request: Request,
  context: { params: Promise<{ productId: string }> }
) {
  await requireAdminUser();

  const { productId } = await context.params;

  if (!isUuid(productId)) {
    return NextResponse.json({ error: "productId invalido." }, { status: 400 });
  }

  const formData = await request.formData();
  const files = formData.getAll("files").filter((value): value is File => value instanceof File);

  if (!files.length) {
    return NextResponse.json({ error: "No se recibieron archivos." }, { status: 400 });
  }

  if (files.length > MAX_FILES) {
    return NextResponse.json(
      { error: `Solo se permiten hasta ${MAX_FILES} archivos por carga.` },
      { status: 400 }
    );
  }

  for (const file of files) {
    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: `Tipo no permitido: ${file.type || "desconocido"}` },
        { status: 400 }
      );
    }
  }

  const { data: product, error: productError } = await supabaseAdmin
    .from("products")
    .select("id, slug")
    .eq("id", productId)
    .maybeSingle();

  if (productError) {
    return NextResponse.json({ error: productError.message }, { status: 500 });
  }

  if (!product) {
    return NextResponse.json({ error: "Producto no encontrado." }, { status: 404 });
  }

  const { data: existingMedia, error: existingMediaError } = await supabaseAdmin
    .from("product_media")
    .select("id, sort_order, is_primary, status, media_type")
    .eq("product_id", productId)
    .eq("media_type", "image")
    .eq("status", "active")
    .order("sort_order", { ascending: true });

  if (existingMediaError) {
    return NextResponse.json({ error: existingMediaError.message }, { status: 500 });
  }

  const currentImages = existingMedia ?? [];
  const currentCount = currentImages.length;

  if (currentCount + files.length > 10) {
    return NextResponse.json(
      { error: "Este producto superaria el limite de 10 imagenes activas." },
      { status: 400 }
    );
  }

  const hasPrimary = currentImages.some((item) => item.is_primary === true);
  let nextSortOrder =
    currentImages.reduce((max, item) => Math.max(max, item.sort_order ?? 0), 0) + 1;

  const insertedRows: Array<Record<string, unknown>> = [];

  for (let index = 0; index < files.length; index++) {
    const file = files[index];
    const originalFilename = file.name || `archivo-${index + 1}`;
    const ext = originalFilename.includes(".")
      ? `.${originalFilename.split(".").pop()!.toLowerCase()}`
      : "";
    const baseName = originalFilename.replace(/\.[^/.]+$/, "");
    const safeBase = slugifyFileBase(baseName) || "imagen";
    const sortOrder = nextSortOrder++;
    const storagePath = `products/${product.slug}/images/${pad(sortOrder)}-${safeBase}${ext}`;

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
      return NextResponse.json({ error: uploadError.message }, { status: 500 });
    }

    const { data: publicData } = supabaseAdmin.storage
      .from(BUCKET)
      .getPublicUrl(storagePath);

    insertedRows.push({
      product_id: product.id,
      bucket: BUCKET,
      storage_path: storagePath,
      public_url: publicData.publicUrl,
      media_type: "image",
      original_filename: originalFilename,
      alt_text: null,
      sort_order: sortOrder,
      is_primary: !hasPrimary && index === 0,
      status: "active",
      mime_type: file.type || null,
      file_size_bytes: file.size || null,
    });
  }

  const { error: insertError } = await supabaseAdmin
    .from("product_media")
    .insert(insertedRows);

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    uploaded: insertedRows.length,
  });
}