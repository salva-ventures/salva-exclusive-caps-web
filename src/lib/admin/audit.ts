import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";

export type AdminMediaActionType =
  | "upload_image"
  | "upload_video"
  | "replace_media"
  | "archive_media"
  | "restore_media"
  | "delete_media"
  | "bulk_archive_media"
  | "bulk_restore_media"
  | "bulk_delete_media"
  | "set_primary_media"
  | "move_media"
  | "update_alt_text"
  | "login_admin"
  | "logout_admin"
  | "create_admin_user"
  | "update_admin_user"
  | "deactivate_admin_user";

export async function logAdminMediaEvent(input: {
  adminEmail: string;
  actionType: AdminMediaActionType;
  productId?: string | null;
  mediaId?: string | null;
  details?: Record<string, unknown>;
}) {
  const { error } = await supabaseAdmin
    .from("admin_media_events")
    .insert({
      admin_email: input.adminEmail,
      action_type: input.actionType,
      product_id: input.productId ?? null,
      media_id: input.mediaId ?? null,
      details_json: input.details ?? {},
    });

  if (error) {
    console.error("No se pudo registrar admin_media_event:", error.message);
  }
}