"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function safeMessage(message: string) {
  return encodeURIComponent(message.slice(0, 180));
}

export async function loginCustomer(formData: FormData) {
  const email = normalizeEmail(String(formData.get("email") ?? ""));
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect("/acceso/login?error=missing-fields");
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("loginCustomer error:", error);
    redirect(`/acceso/login?error=invalid-credentials&detail=${safeMessage(error.message)}`);
  }

  redirect("/cuenta");
}

export async function registerCustomer(formData: FormData) {
  const fullName = String(formData.get("full_name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = normalizeEmail(String(formData.get("email") ?? ""));
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");

  if (!fullName || !email || !password || !confirmPassword) {
    redirect("/acceso/registro?error=missing-fields");
  }

  if (password.length < 6) {
    redirect("/acceso/registro?error=weak-password");
  }

  if (password !== confirmPassword) {
    redirect("/acceso/registro?error=password-mismatch");
  }

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone || null,
      },
    },
  });

  if (error) {
    console.error("registerCustomer error:", error);
    redirect(`/acceso/registro?error=register-failed&detail=${safeMessage(error.message)}`);
  }

  console.log("registerCustomer success:", {
    userId: data.user?.id ?? null,
    email: data.user?.email ?? null,
    session: Boolean(data.session),
  });

  redirect("/acceso/login?success=registered");
}

export async function logoutCustomer() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/acceso/login?success=logged-out");
}