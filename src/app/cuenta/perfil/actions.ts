"use server";

import { redirect } from "next/navigation";
import { requireCustomer } from "@/lib/auth/customer";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function updateCustomerProfile(formData: FormData) {
  const customer = await requireCustomer();
  const supabase = await createSupabaseServerClient();

  const fullName = String(formData.get("full_name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  if (!fullName) {
    redirect("/cuenta/perfil?error=missing-name");
  }

  const { error } = await supabase
    .from("customer_profiles")
    .update({
      full_name: fullName,
      phone: phone || null,
    })
    .eq("id", customer.id);

  if (error) {
    redirect("/cuenta/perfil?error=update-failed");
  }

  redirect("/cuenta/perfil?success=updated");
}