"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { logAdminMediaEvent } from "@/lib/admin/audit";

export async function loginAdmin(formData: FormData): Promise<void> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect("/admin/login?error=missing");
  }

  const { data: adminRow, error: adminError } = await supabaseAdmin
    .from("admin_users")
    .select("id, email, is_active")
    .eq("email", email)
    .eq("is_active", true)
    .maybeSingle();

  if (adminError || !adminRow) {
    redirect("/admin/login?error=invalid");
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    redirect("/admin/login?error=invalid");
  }

  await logAdminMediaEvent({
    adminEmail: email,
    actionType: "login_admin",
    details: {
      source: "admin_login_form",
    },
  });

  redirect("/admin");
}