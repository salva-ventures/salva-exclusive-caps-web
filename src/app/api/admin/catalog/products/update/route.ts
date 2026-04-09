import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { logAdminMediaEvent } from "@/lib/admin/audit";
import { supabaseAdmin } from "@/lib/supabase/admin";

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function back(scope: string, params: string) {
  return `/admin/catalog?scope=${scope}&${params}`;
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

  const id = String(formData.get("id") ?? "");
  const scope = String(formData.get("scope") ?? "retail");
  const name = String(formData.get("name") ?? "").trim();
  const retailPrice = toNullableNumber(String(formData.get("retail_price") ?? ""));
  const wholesalePrice = toNullableNumber(String(formData.get("wholesale_price") ?? ""));
  const retailLabel = String(formData.get("retail_label") ?? "").trim();
  const wholesaleLabel = String(formData.get("wholesale_label") ?? "").trim();
  const catalogStatus = String(formData.get("catalog_status") ?? "active");
  const isRetailVisible = String(formData.get("is_retail_visible") ?? "") === "on";
  const isWholesaleVisible = String(formData.get("is_wholesale_visible") ?? "") === "on";

  if (!isUuid(id)) {
    redirect("/admin/catalog?error=invalid-product-id");
  }

  if (!name.length) {
    redirect(back(scope, "error=missing-name"));
  }

  if (!["retail", "wholesale"].includes(scope)) {
    redirect("/admin/catalog?error=invalid-scope");
  }

  if (!["active", "draft", "archived"].includes(catalogStatus)) {
    redirect(back(scope, "error=invalid-status"));
  }

  const { data: product, error: productError } = await supabaseAdmin
    .from("products")
    .select("id, name")
    .eq("id", id)
    .maybeSingle();

  if (productError || !product) {
    redirect(back(scope, "error=product-not-found"));
  }

  const { error } = await supabaseAdmin
    .from("products")
    .update({
      name,
      retail_price: retailPrice,
      wholesale_price: wholesalePrice,
      retail_label: retailLabel.length ? retailLabel : null,
      wholesale_label: wholesaleLabel.length ? wholesaleLabel : null,
      is_retail_visible: isRetailVisible,
      is_wholesale_visible: isWholesaleVisible,
      catalog_status: catalogStatus,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    redirect(back(scope, "error=update-product"));
  }

  await logAdminMediaEvent({
    adminEmail: adminUser.email,
    actionType: "update_admin_user",
    productId: id,
    details: {
      admin_catalog_update: true,
      previous_name: product.name,
      next_name: name,
      retail_price: retailPrice,
      wholesale_price: wholesalePrice,
      retail_label: retailLabel.length ? retailLabel : null,
      wholesale_label: wholesaleLabel.length ? wholesaleLabel : null,
      is_retail_visible: isRetailVisible,
      is_wholesale_visible: isWholesaleVisible,
      catalog_status: catalogStatus,
      scope,
    },
  });

  redirect(back(scope, "success=product-updated"));
}