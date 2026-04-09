import dotenv from "dotenv"
dotenv.config({ path: ".env.local" })

import fs from "node:fs"
import path from "node:path"
import { createClient } from "@supabase/supabase-js"
import { parse } from "csv-parse/sync"
import mime from "mime-types"

type CsvRow = {
  folder_name: string
  product_slug: string
}

type ProductRow = {
  id: string
  slug: string
}

const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const MEDIA_IMPORT_PATH = process.env.MEDIA_IMPORT_PATH

if (!SUPABASE_URL) throw new Error("Falta SUPABASE_URL")
if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error("Falta SUPABASE_SERVICE_ROLE_KEY")
if (!MEDIA_IMPORT_PATH) throw new Error("Falta MEDIA_IMPORT_PATH")

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

const CSV_PATH = path.join(MEDIA_IMPORT_PATH, "folder-product-map.csv")
const BUCKET = "product-images"
const ALLOWED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"])

function normalizeFileBase(value: string): string {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-")
}

function pad(num: number): string {
  return String(num).padStart(2, "0")
}

function readCsv(): CsvRow[] {
  if (!fs.existsSync(CSV_PATH)) {
    throw new Error(`No existe el CSV: ${CSV_PATH}`)
  }

  const raw = fs.readFileSync(CSV_PATH, "utf8")
  const rows = parse(raw, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
    bom: true
  }) as CsvRow[]

  const cleanedRows = rows.filter((row) => {
    const folderName = String(row.folder_name ?? "").trim()
    const productSlug = String(row.product_slug ?? "").trim()
    return folderName.length > 0 && productSlug.length > 0
  })

  if (!cleanedRows.length) {
    throw new Error("El CSV está vacío")
  }

  return cleanedRows
}

async function fetchProducts(slugs: string[]): Promise<Map<string, ProductRow>> {
  const uniqueSlugs = [...new Set(slugs)]

  const { data, error } = await supabase
    .from("products")
    .select("id, slug")
    .in("slug", uniqueSlugs)

  if (error) {
    throw new Error(`Error leyendo products: ${error.message}`)
  }

  const map = new Map<string, ProductRow>()
  for (const row of data ?? []) {
    map.set(row.slug, row)
  }

  return map
}

function getFilesFromFolder(folderPath: string): string[] {
  if (!fs.existsSync(folderPath)) {
    throw new Error(`No existe la carpeta: ${folderPath}`)
  }

  return fs
    .readdirSync(folderPath)
    .map((name) => path.join(folderPath, name))
    .filter((fullPath) => fs.statSync(fullPath).isFile())
    .filter((fullPath) => ALLOWED_EXTENSIONS.has(path.extname(fullPath).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" }))
}

async function clearPrimary(productId: string) {
  const { error } = await supabase
    .from("product_media")
    .update({ is_primary: false })
    .eq("product_id", productId)
    .eq("media_type", "image")
    .eq("is_primary", true)

  if (error) {
    throw new Error(`Error limpiando imagen principal: ${error.message}`)
  }
}

async function uploadFolder(row: CsvRow, productMap: Map<string, ProductRow>) {
  const folderName = String(row.folder_name ?? "").trim()
  const productSlug = String(row.product_slug ?? "").trim()

  if (!folderName || !productSlug) {
    console.warn("Fila inválida en CSV:", row)
    return
  }

  const product = productMap.get(productSlug)
  if (!product) {
    throw new Error(`No existe product_slug en products: ${productSlug}`)
  }

  const folderPath = path.join(MEDIA_IMPORT_PATH, folderName)
  const files = getFilesFromFolder(folderPath)

  if (!files.length) {
    console.warn(`Carpeta sin imágenes válidas: ${folderName}`)
    return
  }

  await clearPrimary(product.id)

  for (let index = 0; index < files.length; index++) {
    const filePath = files[index]
    const originalFilename = path.basename(filePath)
    const ext = path.extname(originalFilename).toLowerCase()
    const base = path.basename(originalFilename, ext)
    const safeBase = normalizeFileBase(base) || "imagen"
    const sortOrder = index + 1
    const storagePath = `products/${productSlug}/images/${pad(sortOrder)}-${safeBase}${ext}`
    const contentType = mime.lookup(originalFilename) || "application/octet-stream"
    const fileBuffer = fs.readFileSync(filePath)

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(storagePath, fileBuffer, {
        upsert: true,
        cacheControl: "31536000",
        contentType: String(contentType)
      })

    if (uploadError) {
      throw new Error(`Error subiendo ${originalFilename}: ${uploadError.message}`)
    }

    const { data: publicData } = supabase.storage
      .from(BUCKET)
      .getPublicUrl(storagePath)

    const payload = {
      product_id: product.id,
      bucket: BUCKET,
      storage_path: storagePath,
      public_url: publicData.publicUrl,
      media_type: "image",
      original_filename: originalFilename,
      alt_text: null,
      sort_order: sortOrder,
      is_primary: sortOrder === 1,
      status: "active"
    }

    const { error: upsertError } = await supabase
      .from("product_media")
      .upsert(payload, { onConflict: "storage_path" })

    if (upsertError) {
      throw new Error(`Error guardando media ${originalFilename}: ${upsertError.message}`)
    }

    console.log(`OK  ${folderName} -> ${storagePath}`)
  }
}

async function main() {
  const rows = readCsv()
  const productMap = await fetchProducts(rows.map((r) => r.product_slug))

  const missing = [...new Set(rows.map((r) => r.product_slug))].filter((slug) => !productMap.has(slug))
  if (missing.length) {
    throw new Error(`Faltan slugs en products: ${missing.join(", ")}`)
  }

  for (const row of rows) {
    await uploadFolder(row, productMap)
  }

  console.log("Carga finalizada")
}

main().catch((error) => {
  console.error("Fallo en la carga")
  console.error(error instanceof Error ? error.message : error)
  process.exit(1)
})