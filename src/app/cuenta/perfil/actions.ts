"use server";

import { redirect } from "next/navigation";
import { requireCustomer } from "@/lib/auth/customer";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const allowedCustomerTypes = new Set(["retail", "wholesale"]);
const allowedContactChannels = new Set(["whatsapp", "email", "instagram"]);

export async function updateCustomerProfile(formData: FormData) {
  const customer = await requireCustomer();
  const supabase = await createSupabaseServerClient();

  const fullName = String(formData.get("full_name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const city = String(formData.get("city") ?? "").trim();
  const state = String(formData.get("state") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  const deliveryNotes = String(formData.get("delivery_notes") ?? "").trim();
  const customerType = String(formData.get("customer_type") ?? "retail").trim();
  const preferredContactChannel = String(formData.get("preferred_contact_channel") ?? "whatsapp").trim();
  const acceptedMarketing = formData.get("accepted_marketing") === "on";

  if (!fullName) {
    redirect("/cuenta/perfil?error=missing-name");
  }

  if (!allowedCustomerTypes.has(customerType)) {
    redirect("/cuenta/perfil?error=invalid-customer-type");
  }

  if (!allowedContactChannels.has(preferredContactChannel)) {
    redirect("/cuenta/perfil?error=invalid-contact-channel");
  }

  const { error } = await supabase
    .from("customer_profiles")
    .update({
      full_name: fullName,
      phone: phone || null,
      city: city || null,
      state: state || null,
      country: country || null,
      delivery_notes: deliveryNotes || null,
      customer_type: customerType,
      preferred_contact_channel: preferredContactChannel,
      accepted_marketing: acceptedMarketing,
    })
    .eq("id", customer.id);

  if (error) {
    redirect("/cuenta/perfil?error=update-failed");
  }

  redirect("/cuenta/perfil?success=updated");
}