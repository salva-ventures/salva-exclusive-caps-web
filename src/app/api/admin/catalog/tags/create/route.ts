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

export async function POST(request: Request) {
  const adminUser = await requireAdminUser();
  const formData = await request.formData();

  const productId = String(formData.get("product_id") ?? "");
  const scope = String(formData.get("scope") ?? "retail");
  const tag = String(formData.get("tag") ?? "").trim();
  const catalogScope = String(formData.get("catalog_scope") ?? scope);

  if (!isUuid(productId)) {
    redirect("/admin/catalog?error=invalid-product-id");
  }

  if (!["retail", "wholesale"].includes(scope)) {
    redirect("/admin/catalog?error=invalid-scope");
  }

  if (!["retail", "wholesale", "both"].includes(catalogScope)) {
    redirect(back(scope, "error=invalid-tag-scope"));
  }

  if (!tag.length) {
    redirect(back(scope, "error=missing-tag"));
  }

  const { data: existingRows } = await supabaseAdmin
    .from("product_catalog_tags")
    .select("sort_order")
    .eq("product_id", productId)
    .eq("catalog_scope", catalogScope)
    .order("sort_order", { ascending: false })
    .limit(1);

  const nextSort = (existingRows?.[0]?.sort_order ?? 0) + 1;

  const { error } = await supabaseAdmin
    .from("product_catalog_tags")
    .insert({
      product_id: productId,
      catalog_scope: catalogScope,
      tag,
      sort_order: nextSort,
      is_active: true,
    });

  if (error) {
    redirect(back(scope, "error=create-tag"));
  }

  await logAdminMediaEvent({
    adminEmail: adminUser.email,
    actionType: "update_admin_user",
    productId,
    details: {
      admin_catalog_tag_create: true,
      tag,
      catalog_scope: catalogScope,
    },
  });

  redirect(back(scope, "success=tag-created"));
}