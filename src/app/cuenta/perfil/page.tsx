import { requireCustomer } from "@/lib/auth/customer";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import CuentaPerfilClient from "./ui";

export default async function CuentaPerfilPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const params = await searchParams;

  const customer = await requireCustomer();
  const supabase = await createSupabaseServerClient();

  const { data: profile } = await supabase
    .from("customer_profiles")
    .select(`
      full_name,
      first_name,
      last_name,
      phone,
      phone_country_code,
      phone_national,
      country,
      state,
      city,
      country_code,
      state_id,
      city_id,
      address_line_1,
      address_line_2,
      postal_code,
      delivery_notes,
      customer_type,
      preferred_contact_channel,
      accepted_marketing,
      profile_completion_percent
    `)
    .eq("id", customer.id)
    .maybeSingle();

  return (
    <CuentaPerfilClient
      customerEmail={customer.email}
      profile={profile}
      error={params.error}
      success={params.success}
    />
  );
}