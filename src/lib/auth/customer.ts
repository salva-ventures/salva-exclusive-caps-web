import "server-only";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AuthenticatedCustomer = {
  id: string;
  email: string;
};

export async function getAuthenticatedCustomer(): Promise<AuthenticatedCustomer | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user?.id || !data.user.email) {
    return null;
  }

  return {
    id: data.user.id,
    email: data.user.email,
  };
}

export async function requireCustomer(): Promise<AuthenticatedCustomer> {
  const customer = await getAuthenticatedCustomer();

  if (!customer) {
    redirect("/acceso/login");
  }

  return customer;
}

export async function redirectIfAuthenticatedCustomer() {
  const customer = await getAuthenticatedCustomer();

  if (customer) {
    redirect("/cuenta");
  }
}