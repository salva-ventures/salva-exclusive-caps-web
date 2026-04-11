"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { trackCustomerEvent } from "@/lib/analytics/customer-events";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function safeMessage(message: string) {
  return encodeURIComponent(message.slice(0, 180));
}

function isStrongPassword(password: string) {
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/.test(password);
}

function cleanText(value: FormDataEntryValue | null, maxLength: number) {
  return String(value ?? "").trim().replace(/\s+/g, " ").slice(0, maxLength);
}

export async function loginCustomer(formData: FormData) {
  const email = normalizeEmail(cleanText(formData.get("email"), 120));
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    redirect("/acceso/login?error=missing-fields");
  }

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("loginCustomer error:", error);
    redirect(`/acceso/login?error=invalid-credentials&detail=${safeMessage(error.message)}`);
  }

  if (data.user?.id) {
    await supabase.rpc("touch_customer_last_login", {
      p_customer_id: data.user.id,
    });

    if (data.user.email_confirmed_at) {
      await supabase.rpc("touch_customer_email_verified", {
        p_customer_id: data.user.id,
      });
    }

    await trackCustomerEvent({
      eventType: "customer_logged_in",
      customerId: data.user.id,
      pagePath: "/acceso/login",
      eventData: {
        email_confirmed: Boolean(data.user.email_confirmed_at),
      },
    });
  }

  redirect("/cuenta");
}

export async function registerCustomer(formData: FormData) {
  const fullName = cleanText(formData.get("full_name"), 80);
  const phone = cleanText(formData.get("phone"), 30);
  const email = normalizeEmail(cleanText(formData.get("email"), 120));
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");

  if (!fullName || !email || !password || !confirmPassword) {
    redirect("/acceso/registro?error=missing-fields");
  }

  if (fullName.length < 2) {
    redirect("/acceso/registro?error=invalid-name");
  }

  if (!isStrongPassword(password)) {
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
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/acceso/login?success=verified-email`,
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

  if (data.user?.id) {
    await trackCustomerEvent({
      eventType: "customer_registered",
      customerId: data.user.id,
      pagePath: "/acceso/registro",
      eventData: {
        has_session: Boolean(data.session),
        email: data.user.email ?? null,
      },
    });
  }

  redirect("/acceso/login?success=registered");
}

export async function logoutCustomer() {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase.auth.getUser();

  if (data.user?.id) {
    await trackCustomerEvent({
      eventType: "customer_logged_out",
      customerId: data.user.id,
      pagePath: "/cuenta",
    });
  }

  await supabase.auth.signOut();
  redirect("/acceso/login?success=logged-out");
}

export async function requestPasswordReset(formData: FormData) {
  const email = normalizeEmail(cleanText(formData.get("email"), 120));

  if (!email) {
    redirect("/acceso/recuperar?error=missing-email");
  }

  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"}/acceso/restablecer`,
  });

  if (!error) {
    await trackCustomerEvent({
      eventType: "customer_password_reset_requested",
      pagePath: "/acceso/recuperar",
      eventData: {
        email,
      },
    });
  }

  if (error) {
    console.error("requestPasswordReset error:", error);
    redirect(`/acceso/recuperar?error=reset-request-failed&detail=${safeMessage(error.message)}`);
  }

  redirect("/acceso/recuperar?success=sent");
}

export async function updateCustomerPassword(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");

  if (!password || !confirmPassword) {
    redirect("/acceso/restablecer?error=missing-fields");
  }

  if (!isStrongPassword(password)) {
    redirect("/acceso/restablecer?error=weak-password");
  }

  if (password !== confirmPassword) {
    redirect("/acceso/restablecer?error=password-mismatch");
  }

  const supabase = await createSupabaseServerClient();

  const { data: userData } = await supabase.auth.getUser();
  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    console.error("updateCustomerPassword error:", error);
    redirect(`/acceso/restablecer?error=update-failed&detail=${safeMessage(error.message)}`);
  }

  if (userData.user?.id) {
    await supabase.rpc("touch_customer_password_changed", {
      p_customer_id: userData.user.id,
    });

    await trackCustomerEvent({
      eventType: "customer_password_reset_completed",
      customerId: userData.user.id,
      pagePath: "/acceso/restablecer",
    });
  }

  redirect("/acceso/login?success=password-updated");
}

export async function changeCustomerPassword(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");

  if (!password || !confirmPassword) {
    redirect("/cuenta/seguridad?error=missing-fields");
  }

  if (!isStrongPassword(password)) {
    redirect("/cuenta/seguridad?error=weak-password");
  }

  if (password !== confirmPassword) {
    redirect("/cuenta/seguridad?error=password-mismatch");
  }

  const supabase = await createSupabaseServerClient();
  const { data: userData } = await supabase.auth.getUser();

  const { error } = await supabase.auth.updateUser({
    password,
  });

  if (error) {
    console.error("changeCustomerPassword error:", error);
    redirect(`/cuenta/seguridad?error=update-failed&detail=${safeMessage(error.message)}`);
  }

  if (userData.user?.id) {
    await supabase.rpc("touch_customer_password_changed", {
      p_customer_id: userData.user.id,
    });

    await trackCustomerEvent({
      eventType: "customer_password_changed",
      customerId: userData.user.id,
      pagePath: "/cuenta/seguridad",
    });
  }

  redirect("/cuenta/seguridad?success=password-updated");
}