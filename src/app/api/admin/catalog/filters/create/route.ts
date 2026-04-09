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

function normalizeKey(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_]+/g, "_")
    .replace(/^_+|_+$/g, "");
}

export async function POST(request: Request) {
  const adminUser = await requireAdminUser();
  const formData = await request.formData();

  const key = normalizeKey(String(formData.get("key") ?? ""));
  const label = String(formData.get("label") ?? "").trim();
  const catalogScope = String(formData.get("catalog_scope") ?? "both");
  const sourceField = String(formData.get("source_field") ?? "");
  const sortOrderRaw = String(formData.get("sort_order") ?? "").trim();

  const sortOrder = sortOrderRaw.length ? Number(sortOrderRaw) : 0;

  if (!key.length) {
    redirect(back("error=missing-key"));
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

  const { error } = await supabaseAdmin
    .from("catalog_filter_definitions")
    .insert({
      key,
      label,
      catalog_scope: catalogScope,
      source_field: sourceField,
      sort_order: sortOrder,
      is_active: true,
    });

  if (error) {
    redirect(back("error=create-filter"));
  }

  await logAdminMediaEvent({
    adminEmail: adminUser.email,
    actionType: "update_admin_user",
    details: {
      admin_catalog_filter_create: true,
      key,
      label,
      catalog_scope: catalogScope,
      source_field: sourceField,
      sort_order: sortOrder,
    },
  });

  redirect(back("success=filter-created"));
}