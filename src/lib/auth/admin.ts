import "server-only";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export type AdminRole = "super_admin";

export type AuthenticatedAdminUser = {
  id: string;
  email: string;
  role: AdminRole;
};

export async function getAuthenticatedUser() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return data.user ?? null;
}

export async function getAuthenticatedAdminUser(): Promise<AuthenticatedAdminUser | null> {
  const user = await getAuthenticatedUser();

  if (!user?.email) {
    return null;
  }

  const email = user.email.toLowerCase();

  const { data, error } = await supabaseAdmin
    .from("admin_users")
    .select("id, email, role, is_active")
    .eq("email", email)
    .eq("is_active", true)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return {
    id: data.id,
    email: data.email,
    role: data.role,
  } as AuthenticatedAdminUser;
}

export async function requireAdminUser(): Promise<AuthenticatedAdminUser> {
  const adminUser = await getAuthenticatedAdminUser();

  if (!adminUser?.email) {
    redirect("/admin/login?error=invalid");
  }

  return adminUser;
}