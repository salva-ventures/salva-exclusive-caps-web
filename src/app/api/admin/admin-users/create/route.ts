import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { logAdminMediaEvent } from "@/lib/admin/audit";
import { supabaseAdmin } from "@/lib/supabase/admin";

function back(params: string) {
  return `/admin/admins?${params}`;
}

export async function POST(request: Request) {
  const adminUser = await requireAdminUser();
  const formData = await request.formData();

  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const notes = String(formData.get("notes") ?? "").trim();

  if (!email) {
    redirect(back("error=missing-email"));
  }

  const { error } = await supabaseAdmin
    .from("admin_users")
    .upsert({
      email,
      role: "super_admin",
      is_active: true,
      notes: notes.length ? notes : null,
    }, { onConflict: "email" });

  if (error) {
    redirect(back("error=create-admin"));
  }

  await logAdminMediaEvent({
    adminEmail: adminUser.email,
    actionType: "create_admin_user",
    details: {
      target_email: email,
      notes: notes.length ? notes : null,
    },
  });

  redirect(back("success=admin-created"));
}