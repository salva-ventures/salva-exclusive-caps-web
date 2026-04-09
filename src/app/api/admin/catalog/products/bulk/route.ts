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

type BulkAction =
  | "set-active"
  | "set-draft"
  | "set-archived"
  | "show-retail"
  | "hide-retail"
  | "show-wholesale"
  | "hide-wholesale";

export async function POST(request: Request) {
  const adminUser = await requireAdminUser();
  const formData = await request.formData();

  const scope = String(formData.get("scope") ?? "retail");
  const action = String(formData.get("bulk_action") ?? "") as BulkAction;
  const selectedIds = formData
    .getAll("product_ids")
    .map((value) => String(value))
    .filter((value) => isUuid(value));

  if (!["retail", "wholesale"].includes(scope)) {
    redirect("/admin/catalog?error=invalid-scope");
  }

  if (!selectedIds.length) {
    redirect(back(scope, "error=bulk-no-selection"));
  }

  const validActions: BulkAction[] = [
    "set-active",
    "set-draft",
    "set-archived",
    "show-retail",
    "hide-retail",
    "show-wholesale",
    "hide-wholesale",
  ];

  if (!validActions.includes(action)) {
    redirect(back(scope, "error=bulk-invalid-action"));
  }

  const updatePayload: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  if (action === "set-active") {
    updatePayload.catalog_status = "active";
  } else if (action === "set-draft") {
    updatePayload.catalog_status = "draft";
  } else if (action === "set-archived") {
    updatePayload.catalog_status = "archived";
  } else if (action === "show-retail") {
    updatePayload.is_retail_visible = true;
  } else if (action === "hide-retail") {
    updatePayload.is_retail_visible = false;
  } else if (action === "show-wholesale") {
    updatePayload.is_wholesale_visible = true;
  } else if (action === "hide-wholesale") {
    updatePayload.is_wholesale_visible = false;
  }

  const { error } = await supabaseAdmin
    .from("products")
    .update(updatePayload)
    .in("id", selectedIds);

  if (error) {
    redirect(back(scope, "error=bulk-update-failed"));
  }

  await logAdminMediaEvent({
    adminEmail: adminUser.email,
    actionType: "update_admin_user",
    details: {
      admin_catalog_bulk_update: true,
      scope,
      bulk_action: action,
      product_ids: selectedIds,
      count: selectedIds.length,
    },
  });

  redirect(back(scope, `success=bulk-updated&count=${selectedIds.length}`));
}