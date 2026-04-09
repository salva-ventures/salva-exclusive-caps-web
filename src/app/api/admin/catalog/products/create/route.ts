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

function toNullableNumber(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed.length) return null;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function POST(request: Request) {
  const adminUser = await requireAdminUser();
  const formData = await request.formData();

  const scope = String(formData.get("scope") ?? "retail");
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const sku = String(formData.get("sku") ?? "").trim();
  const brandName = String(formData.get("brand_name") ?? "").trim();
  const collabName = String(formData.get("collab_name") ?? "").trim();
  const categoryName = String(formData.get("category_name") ?? "").trim();
  const rarityName = String(formData.get("rarity_name") ?? "").trim();
  const retailPrice = toNullableNumber(String(formData.get("retail_price") ?? ""));
  const wholesalePrice = toNullableNumber(String(formData.get("wholesale_price") ?? ""));
  const retailLabel = String(formData.get("retail_label") ?? "").trim();
  const wholesaleLabel = String(formData.get("wholesale_label") ?? "").trim();
  const catalogStatus = String(formData.get("catalog_status") ?? "draft");
  const isRetailVisible = String(formData.get("is_retail_visible") ?? "") === "on";
  const isWholesaleVisible = String(formData.get("is_wholesale_visible") ?? "") === "on";

  if (!["retail", "wholesale"].includes(scope)) {
    redirect(back("error=invalid-scope"));
  }

  if (!name.length) {
    redirect(back(`scope=${scope}&error=create-missing-name`));
  }

  if (!["active", "draft", "archived"].includes(catalogStatus)) {
    redirect(back(`scope=${scope}&error=invalid-status`));
  }

  const requestedSlug = slugInput.length ? slugifyProductName(slugInput) : slugifyProductName(name);

  if (!requestedSlug.length) {
    redirect(back(`scope=${scope}&error=create-invalid-slug`));
  }

  const slug = await generateUniqueProductSlug(requestedSlug);
  const { retailSortOrder, wholesaleSortOrder } = await getNextCatalogSortOrders();

  const insertPayload = {
    name,
    slug,
    sku: sku.length ? sku : null,
    brand_name: brandName.length ? brandName : null,
    collab_name: collabName.length ? collabName : null,
    category_name: categoryName.length ? categoryName : null,
    rarity_name: rarityName.length ? rarityName : null,
    retail_price: retailPrice,
    wholesale_price: wholesalePrice,
    retail_label: retailLabel.length ? retailLabel : null,
    wholesale_label: wholesaleLabel.length ? wholesaleLabel : null,
    is_retail_visible: isRetailVisible,
    is_wholesale_visible: isWholesaleVisible,
    retail_sort_order: retailSortOrder,
    wholesale_sort_order: wholesaleSortOrder,
    catalog_status: catalogStatus,
  };

  const { data, error } = await supabaseAdmin
    .from("products")
    .insert(insertPayload)
    .select("id, name, slug")
    .maybeSingle();

  if (error || !data) {
    redirect(back(`scope=${scope}&error=create-product-failed`));
  }

  await logAdminMediaEvent({
    adminEmail: adminUser.email,
    actionType: "update_admin_user",
    productId: data.id,
    details: {
      admin_catalog_create_product: true,
      name: data.name,
      slug: data.slug,
      scope,
      catalog_status: catalogStatus,
      is_retail_visible: isRetailVisible,
      is_wholesale_visible: isWholesaleVisible,
    },
  });

  redirect(back(`scope=${scope}&success=product-created`));
}