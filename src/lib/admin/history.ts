import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";

export type AdminProductHistoryEvent = {
  id: string;
  admin_email: string;
  action_type: string;
  product_id: string | null;
  media_id: string | null;
  details_json: Record<string, unknown> | null;
  created_at: string;
};

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function getAdminProductHistory(
  productId: string,
  limit = 50
): Promise<AdminProductHistoryEvent[]> {
  if (!isUuid(productId)) {
    return [];
  }

  const { data, error } = await supabaseAdmin
    .from("admin_media_events")
    .select("id, admin_email, action_type, product_id, media_id, details_json, created_at")
    .eq("product_id", productId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) {
    throw new Error(`Error cargando historial del producto: ${error.message}`);
  }

  return (data ?? []) as AdminProductHistoryEvent[];
}