import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";

export type AdminHistoryEventRow = {
  id: string;
  admin_email: string;
  action_type: string;
  product_id: string | null;
  media_id: string | null;
  details_json: Record<string, unknown> | null;
  created_at: string;
};

export type AdminHistoryFilters = {
  adminEmail?: string;
  actionType?: string;
  limit?: number;
};

export async function getAdminHistory(
  filters: AdminHistoryFilters = {}
): Promise<AdminHistoryEventRow[]> {
  const adminEmail = (filters.adminEmail ?? "").trim().toLowerCase();
  const actionType = (filters.actionType ?? "").trim();
  const limit = Math.min(Math.max(filters.limit ?? 50, 1), 200);

  let query = supabaseAdmin
    .from("admin_media_events")
    .select("id, admin_email, action_type, product_id, media_id, details_json, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (adminEmail) {
    query = query.eq("admin_email", adminEmail);
  }

  if (actionType && actionType !== "all") {
    query = query.eq("action_type", actionType);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`Error cargando historial global: ${error.message}`);
  }

  return (data ?? []) as AdminHistoryEventRow[];
}

export async function getAdminHistoryEmails(): Promise<string[]> {
  const { data, error } = await supabaseAdmin
    .from("admin_media_events")
    .select("admin_email")
    .order("admin_email", { ascending: true });

  if (error) {
    throw new Error(`Error cargando emails del historial: ${error.message}`);
  }

  const unique = [...new Set((data ?? []).map((row) => row.admin_email).filter(Boolean))];
  return unique.sort((a, b) => a.localeCompare(b));
}

export function getAdminHistoryActionOptions(): string[] {
  return [
    "all",
    "upload_image",
    "upload_video",
    "replace_media",
    "archive_media",
    "restore_media",
    "delete_media",
    "bulk_archive_media",
    "bulk_restore_media",
    "bulk_delete_media",
    "set_primary_media",
    "move_media",
    "update_alt_text",
    "login_admin",
    "logout_admin",
    "create_admin_user",
    "update_admin_user",
    "deactivate_admin_user",
  ];
}