import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { logAdminMediaEvent } from "@/lib/admin/audit";
import { supabaseAdmin } from "@/lib/supabase/admin";

const VALID_SCOPES = new Set(["retail", "wholesale", "both"]);
const VALID_SOURCE_FIELDS = new Set([
  "brand_name",
  "collab_name",
  "collection_name",
  "model_name",
  "rarity_name",
  "category_name",
  "team_name",
  "colorway",
]);

function back(params: string) {
  return `/admin/catalog/filters?${params}`;
}

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function POST(request: Request) {
  const adminUser = await requireAdminUser();
  const formData = await request.formData();

  const id = String(formData.get("id") ?? "");
  const label = String(formData.get("label") ?? "").trim();
  const catalogScope = String(formData.get("catalog_scope") ?? "both");
  const sourceField = String(formData.get("source_field") ?? "");
  const sortOrderRaw = String(formData.get("sort_order") ?? "").trim();
  const isActive = String(formData.get("is_active") ?? "") === "on";

  const sortOrder = sortOrderRaw.length ? Number(sortOrderRaw) : 0;

  if (!isUuid(id)) {
    redirect(back("error=invalid-filter-id"));
  }

  if (!label.length) {
    redirect(back("error=missing-label"));
  }

  if (!VALID_SCOPES.has(catalogScope)) {
    redirect(back("error=invalid-scope"));
  }

  if (!VALID_SOURCE_FIELDS.has(sourceField)) {
    redirect(back("error=invalid-source-field"));
  }

  if (!Number.isFinite(sortOrder)) {
    redirect(back("error=invalid-sort-order"));
  }

  const { data: existing, error: existingError } = await supabaseAdmin
    .from("catalog_filter_definitions")
    .select("key")
    .eq("id", id)
    .maybeSingle();

  if (existingError || !existing) {
    redirect(back("error=filter-not-found"));
  }

  const { error } = await supabaseAdmin
    .from("catalog_filter_definitions")
    .update({
      label,
      catalog_scope: catalogScope,
      source_field: sourceField,
      sort_order: sortOrder,
      is_active: isActive,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    redirect(back("error=update-filter"));
  }

  await logAdminMediaEvent({
    adminEmail: adminUser.email,
    actionType: "update_admin_user",
    details: {
      admin_catalog_filter_update: true,
      key: existing.key,
      label,
      catalog_scope: catalogScope,
      source_field: sourceField,
      sort_order: sortOrder,
      is_active: isActive,
    },
  });

  redirect(back("success=filter-updated"));
}