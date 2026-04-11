import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { logAdminMediaEvent } from "@/lib/admin/audit";
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

  const { data: row, error: rowError } = await supabaseAdmin
    .from("catalog_featured_slots")
    .select("id, product_id, placement")
    .eq("product_id", productId)
    .eq("placement", placement)
    .maybeSingle();

  if (rowError || !row) {
    redirect(back(`scope=${scope}&error=featured-not-found`));
  }

  const { error } = await supabaseAdmin
    .from("catalog_featured_slots")
    .update({
      is_active: false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", row.id);

  if (error) {
    redirect(back(`scope=${scope}&error=featured-remove-failed`));
  }

  await logAdminMediaEvent({
    adminEmail: adminUser.email,
    productId,
    actionType: "update_admin_user",
    details: {
      admin_catalog_featured_remove: true,
      placement,
    },
  });

  redirect(back(`scope=${scope}&success=featured-removed`));
}