import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { logAdminMediaEvent } from "@/lib/admin/audit";
import {
  generateUniqueProductSlug,
  getNextCatalogSortOrders,
  slugifyProductName,
} from "@/lib/admin/catalog-create";
import { supabaseAdmin } from "@/lib/supabase/admin";

function back(params: string) {
  return `/admin/catalog?${params}`;
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function POST(request: Request) {
  const adminUser = await requireAdminUser();
  const formData = await request.formData();

  const scope = String(formData.get("scope") ?? "retail");
  const sourceProductId = String(formData.get("source_product_id") ?? "");
  const newName = String(formData.get("new_name") ?? "").trim();
  const newSlugInput = String(formData.get("new_slug") ?? "").trim();
  const copyTags = String(formData.get("copy_tags") ?? "") === "on";

  if (!["retail", "wholesale"].includes(scope)) {
    redirect(back("error=invalid-scope"));
  }

  if (!isUuid(sourceProductId)) {
    redirect(back(`scope=${scope}&error=duplicate-invalid-source`));
  }

  const { data: sourceProduct, error: sourceError } = await supabaseAdmin
    .from("products")
    .select(`
      id,
      name,
      slug,
      sku,
      brand_name,
      collab_name,
      category_name,
      rarity_name,
      retail_price,
      wholesale_price,
      retail_label,
      wholesale_label,
      is_retail_visible,
      is_wholesale_visible,
      catalog_status
    `)
    .eq("id", sourceProductId)
    .maybeSingle();

  if (sourceError || !sourceProduct) {
    redirect(back(`scope=${scope}&error=duplicate-source-not-found`));
  }

  const finalName = newName.length ? newName : `${sourceProduct.name} Copia`;
  const slugSeed = newSlugInput.length
    ? slugifyProductName(newSlugInput)
    : slugifyProductName(finalName);

  if (!slugSeed.length) {
    redirect(back(`scope=${scope}&error=duplicate-invalid-slug`));
  }

  const finalSlug = await generateUniqueProductSlug(slugSeed);
  const { retailSortOrder, wholesaleSortOrder } = await getNextCatalogSortOrders();

  const { data: insertedProduct, error: insertError } = await supabaseAdmin
    .from("products")
    .insert({
      name: finalName,
      slug: finalSlug,
      sku: sourceProduct.sku,
      brand_name: sourceProduct.brand_name,
      collab_name: sourceProduct.collab_name,
      category_name: sourceProduct.category_name,
      rarity_name: sourceProduct.rarity_name,
      retail_price: sourceProduct.retail_price,
      wholesale_price: sourceProduct.wholesale_price,
      retail_label: sourceProduct.retail_label,
      wholesale_label: sourceProduct.wholesale_label,
      is_retail_visible: sourceProduct.is_retail_visible,
      is_wholesale_visible: sourceProduct.is_wholesale_visible,
      catalog_status: sourceProduct.catalog_status,
      retail_sort_order: retailSortOrder,
      wholesale_sort_order: wholesaleSortOrder,
    })
    .select("id, name, slug")
    .maybeSingle();

  if (insertError || !insertedProduct) {
    redirect(back(`scope=${scope}&error=duplicate-insert-failed`));
  }

  if (copyTags) {
    const { data: sourceTags, error: sourceTagsError } = await supabaseAdmin
      .from("product_catalog_tags")
      .select("tag, catalog_scope, sort_order, is_active")
      .eq("product_id", sourceProductId)
      .order("sort_order", { ascending: true });

    if (!sourceTagsError && sourceTags && sourceTags.length > 0) {
      const duplicatedTags = sourceTags.map((tag) => ({
        product_id: insertedProduct.id,
        tag: tag.tag,
        catalog_scope: tag.catalog_scope,
        sort_order: tag.sort_order,
        is_active: tag.is_active,
      }));

      const { error: insertTagsError } = await supabaseAdmin
        .from("product_catalog_tags")
        .insert(duplicatedTags);

      if (insertTagsError) {
        redirect(back(`scope=${scope}&error=duplicate-tags-failed`));
      }
    }
  }

  await logAdminMediaEvent({
    adminEmail: adminUser.email,
    actionType: "update_admin_user",
    productId: insertedProduct.id,
    details: {
      admin_catalog_duplicate_product: true,
      source_product_id: sourceProductId,
      source_slug: sourceProduct.slug,
      new_name: insertedProduct.name,
      new_slug: insertedProduct.slug,
      copy_tags: copyTags,
      scope,
    },
  });

  redirect(back(`scope=${scope}&success=product-duplicated`));
}