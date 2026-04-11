"use server";

import { redirect } from "next/navigation";
import { requireCustomer } from "@/lib/auth/customer";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { trackCustomerEvent } from "@/lib/analytics/customer-events";

const allowedCustomerTypes = new Set(["retail", "wholesale"]);
const allowedContactChannels = new Set(["whatsapp", "email", "instagram"]);
const allowedAgeRanges = new Set(["under_18", "18_24", "25_34", "35_44", "45_plus", ""]);

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
  const ageRange = cleanText(formData.get("age_range"), 20).toLowerCase();
  const acquisitionSource = cleanText(formData.get("acquisition_source"), 50).toLowerCase();
  const acquisitionSourceDetail = cleanText(formData.get("acquisition_source_detail"), 120);
  const acceptedMarketing = formData.get("accepted_marketing") === "on";

  const selectedInterests = formData
    .getAll("interests")
    .map((value) => cleanText(value, 50).toLowerCase())
    .filter(Boolean);

  const uniqueInterests = Array.from(new Set(selectedInterests));

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

  if (!allowedAgeRanges.has(ageRange)) {
    redirect("/cuenta/perfil?error=invalid-age-range");
  }

  if (uniqueInterests.length > 5) {
    redirect("/cuenta/perfil?error=too-many-interests");
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

  if (acquisitionSource) {
    const { data: source } = await supabase
      .from("customer_acquisition_source_catalog")
      .select("code")
      .eq("code", acquisitionSource)
      .eq("is_active", true)
      .maybeSingle();

    if (!source) {
      redirect("/cuenta/perfil?error=invalid-acquisition-source");
    }
  }

  if (uniqueInterests.length > 0) {
    const { data: validInterests } = await supabase
      .from("customer_interest_catalog")
      .select("code")
      .in("code", uniqueInterests)
      .eq("is_active", true);

    const validCodes = new Set((validInterests ?? []).map((item) => item.code));
    const invalidInterest = uniqueInterests.find((code) => !validCodes.has(code));

    if (invalidInterest) {
      redirect("/cuenta/perfil?error=invalid-interest");
    }
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
      age_range: ageRange || null,
      acquisition_source: acquisitionSource || null,
      acquisition_source_detail: acquisitionSourceDetail || null,
      profile_completion_percent: profileCompletionPercent,
      last_seen_at: new Date().toISOString(),
    })
    .eq("id", customer.id);

  if (error) {
    redirect("/cuenta/perfil?error=update-failed");
  }

  const { error: deleteError } = await supabase
    .from("customer_interests")
    .delete()
    .eq("customer_id", customer.id);

  if (deleteError) {
    redirect("/cuenta/perfil?error=update-failed");
  }

  if (uniqueInterests.length > 0) {
    const { error: insertError } = await supabase
      .from("customer_interests")
      .insert(
        uniqueInterests.map((interestCode) => ({
          customer_id: customer.id,
          interest_code: interestCode,
        }))
      );

    if (insertError) {
      redirect("/cuenta/perfil?error=update-failed");
    }
  }

  await trackCustomerEvent({
    eventType: "customer_profile_updated",
    customerId: customer.id,
    pagePath: "/cuenta/perfil",
    eventData: {
      country_code: countryCode || null,
      state_id: stateId || null,
      city_id: cityId || null,
      customer_type: customerType,
      preferred_contact_channel: preferredContactChannel,
      age_range: ageRange || null,
      acquisition_source: acquisitionSource || null,
      interests_count: uniqueInterests.length,
      profile_completion_percent: profileCompletionPercent,
      accepted_marketing: acceptedMarketing,
    },
  });

  redirect("/cuenta/perfil?success=updated");
}