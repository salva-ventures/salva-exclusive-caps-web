import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { logAdminMediaEvent } from "@/lib/admin/audit";
import { supabaseAdmin } from "@/lib/supabase/admin";

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function back(params: string) {
  return `/admin/admins?${params}`;
}

export async function POST(request: Request) {
  const adminUser = await requireAdminUser();
  const formData = await request.formData();

  const id = String(formData.get("id") ?? "");
  const confirmToggle = String(formData.get("confirm_toggle") ?? "");
  const confirmEmail = String(formData.get("confirm_email") ?? "").trim().toLowerCase();
  const confirmWord = String(formData.get("confirm_word") ?? "").trim();

  if (!isUuid(id)) {
    redirect(back("error=invalid-admin-id"));
  }

  const { data: target, error: targetError } = await supabaseAdmin
    .from("admin_users")
    .select("id, email, is_active")
    .eq("id", id)
    .maybeSingle();

  if (targetError || !target) {
    redirect(back("error=admin-not-found"));
  }

  if (target.email.toLowerCase() === adminUser.email.toLowerCase() && target.is_active) {
    redirect(back("error=cannot-deactivate-self"));
  }

  const nextActive = !target.is_active;

  if (!nextActive) {
    if (confirmToggle !== "yes") {
      redirect(back("error=missing-deactivate-confirmation"));
    }

    if (confirmEmail !== target.email.toLowerCase()) {
      redirect(back("error=wrong-deactivate-email"));
    }

    if (confirmWord !== "DESACTIVAR") {
      redirect(back("error=wrong-deactivate-word"));
    }
  }

  const { error } = await supabaseAdmin
    .from("admin_users")
    .update({
      is_active: nextActive,
    })
    .eq("id", id);

  if (error) {
    redirect(back("error=toggle-admin"));
  }

  await logAdminMediaEvent({
    adminEmail: adminUser.email,
    actionType: nextActive ? "update_admin_user" : "deactivate_admin_user",
    details: {
      target_email: target.email,
      is_active: nextActive,
    },
  });

  redirect(back(`success=${nextActive ? "admin-activated" : "admin-deactivated"}`));
}