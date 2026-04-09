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
  const notesRaw = String(formData.get("notes") ?? "");
  const notes = notesRaw.trim();

  if (!isUuid(id)) {
    redirect(back("error=invalid-admin-id"));
  }

  const { data: target, error: targetError } = await supabaseAdmin
    .from("admin_users")
    .select("email")
    .eq("id", id)
    .maybeSingle();

  if (targetError || !target) {
    redirect(back("error=admin-not-found"));
  }

  const { error } = await supabaseAdmin
    .from("admin_users")
    .update({
      notes: notes.length ? notes : null,
    })
    .eq("id", id);

  if (error) {
    redirect(back("error=update-admin"));
  }

  await logAdminMediaEvent({
    adminEmail: adminUser.email,
    actionType: "update_admin_user",
    details: {
      target_email: target.email,
      notes: notes.length ? notes : null,
    },
  });

  redirect(back("success=admin-updated"));
}