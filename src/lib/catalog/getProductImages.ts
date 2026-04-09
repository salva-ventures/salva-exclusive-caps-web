import { supabase } from "@/lib/supabase/client"

export type ProductImage = {
  public_url: string
  sort_order: number
  is_primary: boolean
}

export type ProductImagesMap = Record<string, ProductImage[]>

type ProductRow = {
  slug: string
  product_media: ProductImage[] | null
}

export async function getProductImagesBySlugs(
  slugs: string[]
): Promise<ProductImagesMap> {
  const uniqueSlugs = [...new Set(slugs)].filter(Boolean)

  if (!uniqueSlugs.length) {
    return {}
  }

  const { data, error } = await supabase
    .from("products")
    .select(`
      slug,
      product_media (
        public_url,
        sort_order,
        is_primary
      )
    `)
    .in("slug", uniqueSlugs)

  if (error) {
    throw new Error(`Error cargando imágenes desde Supabase: ${error.message}`)
  }

  const rows = (data ?? []) as ProductRow[]

  const map: ProductImagesMap = {}

  for (const row of rows) {
    const images = (row.product_media ?? [])
      .slice()
      .sort((a, b) => a.sort_order - b.sort_order)

    map[row.slug] = images
  }

  return map
}

export function getPrimaryImageUrl(
  imagesMap: ProductImagesMap,
  slug: string,
  fallbackUrl?: string
): string {
  const images = imagesMap[slug] ?? []
  const primary = images.find((img) => img.is_primary) ?? images[0]
  return primary?.public_url ?? fallbackUrl ?? ""
}

export function getGalleryImages(
  imagesMap: ProductImagesMap,
  slug: string
): ProductImage[] {
  return imagesMap[slug] ?? []
}
