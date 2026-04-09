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

  const id = String(formData.get("id") ?? "");
  const scope = String(formData.get("scope") ?? "retail");

  if (!isUuid(id)) {
    redirect("/admin/catalog?error=invalid-tag-id");
  }

  const { data: tagRow, error: tagError } = await supabaseAdmin
    .from("product_catalog_tags")
    .select("id, product_id, tag, catalog_scope")
    .eq("id", id)
    .maybeSingle();

  if (tagError || !tagRow) {
    redirect(back(scope, "error=tag-not-found"));
  }

  const { error } = await supabaseAdmin
    .from("product_catalog_tags")
    .delete()
    .eq("id", id);

  if (error) {
    redirect(back(scope, "error=delete-tag"));
  }

  await logAdminMediaEvent({
    adminEmail: adminUser.email,
    actionType: "update_admin_user",
    productId: tagRow.product_id,
    details: {
      admin_catalog_tag_delete: true,
      tag: tagRow.tag,
      catalog_scope: tagRow.catalog_scope,
    },
  });

  redirect(back(scope, "success=tag-deleted"));
}