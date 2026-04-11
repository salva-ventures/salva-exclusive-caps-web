"use server";

import { redirect } from "next/navigation";
import { requireCustomer } from "@/lib/auth/customer";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const allowedCustomerTypes = new Set(["retail", "wholesale"]);
const allowedContactChannels = new Set(["whatsapp", "email", "instagram"]);

function cleanText(value: FormDataEntryValue | null, maxLength: number) {
  return String(value ?? "").trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function digitsOnly(value: string, maxLength: number) {
  return value.replace(/\D/g, "").slice(0, maxLength);
}

function calculateProfileCompletion(values: {
  first_name: string;
  last_name: string;
  phone_country_code: string;
  phone_national: string;
  country: string;
  state: string;
  city: string;
  address_line_1: string;
  postal_code: string;
  customer_type: string;
  preferred_contact_channel: string;
}) {
  const percent =
    (values.first_name ? 12 : 0) +
    (values.last_name ? 10 : 0) +
    (values.phone_country_code ? 8 : 0) +
    (values.phone_national ? 10 : 0) +
    (values.country ? 10 : 0) +
    (values.state ? 10 : 0) +
    (values.city ? 10 : 0) +
    (values.address_line_1 ? 12 : 0) +
    (values.postal_code ? 8 : 0) +
    (values.customer_type ? 5 : 0) +
    (values.preferred_contact_channel ? 5 : 0);

  return Math.min(percent, 100);
}

export async function updateCustomerProfile(formData: FormData) {
  const customer = await requireCustomer();
  const supabase = await createSupabaseServerClient();

  const firstName = cleanText(formData.get("first_name"), 50);
  const lastName = cleanText(formData.get("last_name"), 70);
  const phoneCountryCode = digitsOnly(cleanText(formData.get("phone_country_code"), 10), 10);
  const phoneNational = digitsOnly(cleanText(formData.get("phone_national"), 20), 20);
  const city = cleanText(formData.get("city"), 80);
  const state = cleanText(formData.get("state"), 80);
  const country = cleanText(formData.get("country"), 80);
  const addressLine1 = cleanText(formData.get("address_line_1"), 140);
  const addressLine2 = cleanText(formData.get("address_line_2"), 140);
  const postalCode = cleanText(formData.get("postal_code"), 20);
  const deliveryNotes = cleanText(formData.get("delivery_notes"), 300);
  const customerType = cleanText(formData.get("customer_type"), 20).toLowerCase();
  const preferredContactChannel = cleanText(formData.get("preferred_contact_channel"), 20).toLowerCase();
  const acceptedMarketing = formData.get("accepted_marketing") === "on";

  if (!firstName) {
    redirect("/cuenta/perfil?error=missing-first-name");
  }

  if (!lastName) {
    redirect("/cuenta/perfil?error=missing-last-name");
  }

  if (!allowedCustomerTypes.has(customerType)) {
    redirect("/cuenta/perfil?error=invalid-customer-type");
  }

  if (!allowedContactChannels.has(preferredContactChannel)) {
    redirect("/cuenta/perfil?error=invalid-contact-channel");
  }

  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();
  const legacyPhone = [phoneCountryCode ? `+${phoneCountryCode}` : "", phoneNational]
    .filter(Boolean)
    .join(" ")
    .trim();

  const profileCompletionPercent = calculateProfileCompletion({
    first_name: firstName,
    last_name: lastName,
    phone_country_code: phoneCountryCode,
    phone_national: phoneNational,
    country,
    state,
    city,
    address_line_1: addressLine1,
    postal_code: postalCode,
    customer_type: customerType,
    preferred_contact_channel: preferredContactChannel,
  });

  const { error } = await supabase
    .from("customer_profiles")
    .update({
      full_name: fullName,
      first_name: firstName,
      last_name: lastName,
      phone: legacyPhone || null,
      phone_country_code: phoneCountryCode || null,
      phone_national: phoneNational || null,
      city: city || null,
      state: state || null,
      country: country || null,
      address_line_1: addressLine1 || null,
      address_line_2: addressLine2 || null,
      postal_code: postalCode || null,
      delivery_notes: deliveryNotes || null,
      customer_type: customerType,
      preferred_contact_channel: preferredContactChannel,
      accepted_marketing: acceptedMarketing,
      profile_completion_percent: profileCompletionPercent,
    })
    .eq("id", customer.id);

  if (error) {
    redirect("/cuenta/perfil?error=update-failed");
  }

  redirect("/cuenta/perfil?success=updated");
}