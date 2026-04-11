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
  country_code: string;
  state_id: string;
  city_id: string;
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
    (values.country_code ? 10 : 0) +
    (values.state_id ? 10 : 0) +
    (values.city_id ? 10 : 0) +
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

  const countryCode = cleanText(formData.get("country_code"), 10).toUpperCase();
  const stateId = cleanText(formData.get("state_id"), 50);
  const cityId = cleanText(formData.get("city_id"), 50);

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

  let countryName: string | null = null;
  let stateName: string | null = null;
  let cityName: string | null = null;

  if (countryCode) {
    const { data: country } = await supabase
      .from("countries")
      .select("code, name, phone_code")
      .eq("code", countryCode)
      .eq("is_active", true)
      .maybeSingle();

    if (!country) {
      redirect("/cuenta/perfil?error=invalid-country");
    }

    countryName = country.name;

    if (!phoneCountryCode && country.phone_code) {
      redirect("/cuenta/perfil?error=missing-phone-country-code");
    }
  }

  if (stateId) {
    const { data: state } = await supabase
      .from("country_states")
      .select("id, name, country_code")
      .eq("id", stateId)
      .eq("is_active", true)
      .maybeSingle();

    if (!state || (countryCode && state.country_code !== countryCode)) {
      redirect("/cuenta/perfil?error=invalid-state");
    }

    stateName = state.name;
  }

  if (cityId) {
    const { data: city } = await supabase
      .from("state_cities")
      .select("id, name, state_id")
      .eq("id", cityId)
      .eq("is_active", true)
      .maybeSingle();

    if (!city || (stateId && city.state_id !== stateId)) {
      redirect("/cuenta/perfil?error=invalid-city");
    }

    cityName = city.name;
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
    country_code: countryCode,
    state_id: stateId,
    city_id: cityId,
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
      country_code: countryCode || null,
      state_id: stateId || null,
      city_id: cityId || null,
      country: countryName,
      state: stateName,
      city: cityName,
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