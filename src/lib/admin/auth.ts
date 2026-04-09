import "server-only";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getAllowedAdminEmails(): string[] {
  const raw = process.env.ADMIN_EMAILS ?? "";

  return raw
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function getAuthenticatedUser() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    return null;
  }

  return data.user ?? null;
}

export async function requireAdminUser() {
  const user = await getAuthenticatedUser();

  if (!user?.email) {
    redirect("/admin/login");
  }

  const allowedEmails = getAllowedAdminEmails();
  const email = user.email.toLowerCase();

  if (!allowedEmails.includes(email)) {
    redirect("/admin/login");
  }

  return user;
}