import "server-only";

import { supabaseAdmin } from "@/lib/supabase/admin";

export type AdminUserRow = {
  id: string;
  email: string;
  role: "super_admin";
  is_active: boolean;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export async function listAdminUsers(): Promise<AdminUserRow[]> {
  const { data, error } = await supabaseAdmin
    .from("admin_users")
    .select("id, email, role, is_active, notes, created_at, updated_at")
    .order("created_at", { ascending: true });

  if (error) {
    throw new Error(`Error cargando admin_users: ${error.message}`);
  }

  return (data ?? []) as AdminUserRow[];
}