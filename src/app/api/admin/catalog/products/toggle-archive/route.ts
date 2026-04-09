import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { logAdminMediaEvent } from "@/lib/admin/audit";
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
  const productId = String(formData.get("product_id") ?? "");
  const action = String(formData.get("archive_action") ?? "");
  const confirmWord = String(formData.get("confirm_word") ?? "").trim();

  if (!["retail", "wholesale"].includes(scope)) {
    redirect(back("error=invalid-scope"));
  }

  if (!isUuid(productId)) {
    redirect(back(`scope=${scope}&error=archive-invalid-product`));
  }

  if (!["archive", "restore"].includes(action)) {
    redirect(back(`scope=${scope}&error=archive-invalid-action`));
  }

  const { data: product, error: productError } = await supabaseAdmin
    .from("products")
    .select("id, name, slug, catalog_status, is_retail_visible, is_wholesale_visible")
    .eq("id", productId)
    .maybeSingle();

  if (productError || !product) {
    redirect(back(`scope=${scope}&error=archive-product-not-found`));
  }

  if (action === "archive") {
    if (confirmWord !== "ARCHIVAR") {
      redirect(back(`scope=${scope}&error=archive-confirmation-required`));
    }

    const { error } = await supabaseAdmin
      .from("products")
      .update({
        catalog_status: "archived",
        is_retail_visible: false,
        is_wholesale_visible: false,
        updated_at: new Date().toISOString(),
      })
      .eq("id", productId);

    if (error) {
      redirect(back(`scope=${scope}&error=archive-failed`));
    }

    await logAdminMediaEvent({
      adminEmail: adminUser.email,
      productId,
      actionType: "update_admin_user",
      details: {
        admin_catalog_archive_product: true,
        name: product.name,
        slug: product.slug,
      },
    });

    redirect(back(`scope=${scope}&success=product-archived`));
  }

  if (confirmWord !== "RESTAURAR") {
    redirect(back(`scope=${scope}&error=restore-confirmation-required`));
  }

  const { error } = await supabaseAdmin
    .from("products")
    .update({
      catalog_status: "draft",
      is_retail_visible: false,
      is_wholesale_visible: false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", productId);

  if (error) {
    redirect(back(`scope=${scope}&error=restore-failed`));
  }

  await logAdminMediaEvent({
    adminEmail: adminUser.email,
    productId,
    actionType: "update_admin_user",
    details: {
      admin_catalog_restore_product: true,
      name: product.name,
      slug: product.slug,
      restored_to_status: "draft",
    },
  });

  redirect(back(`scope=${scope}&success=product-restored`));
}