import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { logAdminMediaEvent } from "@/lib/admin/audit";
import { listFeaturedSlots } from "@/lib/catalog/featured";
import { supabaseAdmin } from "@/lib/supabase/admin";

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function back(params: string) {
  return `/admin/catalog?${params}`;
}

export async function POST(request: Request) {
  const adminUser = await requireAdminUser();
  const formData = await request.formData();

  const scope = String(formData.get("scope") ?? "retail");
  const productId = String(formData.get("product_id") ?? "");
  const placement = "home" as const;

  if (!["retail", "wholesale"].includes(scope)) {
    redirect(back("error=invalid-scope"));
  }

  if (!isUuid(productId)) {
    redirect(back(`scope=${scope}&error=featured-invalid-product`));
  }

  const existing = await listFeaturedSlots(placement);

  const alreadyExists = existing.find((row) => row.product_id === productId);
  if (alreadyExists) {
    if (!alreadyExists.is_active) {
      const { error: reactivateError } = await supabaseAdmin
        .from("catalog_featured_slots")
        .update({
          is_active: true,
          updated_at: new Date().toISOString(),
        })
        .eq("id", alreadyExists.id);

      if (reactivateError) {
        redirect(back(`scope=${scope}&error=featured-add-failed`));
      }

      redirect(back(`scope=${scope}&success=featured-added`));
    }

    redirect(back(`scope=${scope}&error=featured-already-exists`));
  }

  const nextSortOrder =
    existing.length > 0
      ? Math.max(...existing.map((row) => row.sort_order)) + 1
      : 1;

  const { data: product, error: productError } = await supabaseAdmin
    .from("products")
    .select("id, name, slug")
    .eq("id", productId)
    .maybeSingle();

  if (productError || !product) {
    redirect(back(`scope=${scope}&error=featured-product-not-found`));
  }

  const { error } = await supabaseAdmin
    .from("catalog_featured_slots")
    .insert({
      product_id: productId,
      placement,
      sort_order: nextSortOrder,
      is_active: true,
    });

  if (error) {
    redirect(back(`scope=${scope}&error=featured-add-failed`));
  }

  await logAdminMediaEvent({
    adminEmail: adminUser.email,
    productId,
    actionType: "update_admin_user",
    details: {
      admin_catalog_featured_add: true,
      placement,
      product_name: product.name,
      product_slug: product.slug,
      sort_order: nextSortOrder,
    },
  });

  redirect(back(`scope=${scope}&success=featured-added`));
}