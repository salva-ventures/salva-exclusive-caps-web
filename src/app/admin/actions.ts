"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getAuthenticatedAdminUser } from "@/lib/admin/auth";
import { logAdminMediaEvent } from "@/lib/admin/audit";

export async function logoutAdmin(): Promise<void> {
  const adminUser = await getAuthenticatedAdminUser();

  if (adminUser?.email) {
    await logAdminMediaEvent({
      adminEmail: adminUser.email,
      actionType: "logout_admin",
      details: {
        source: "admin_layout_logout",
      },
    });
  }

  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}