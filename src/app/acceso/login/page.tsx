import { redirectIfAuthenticatedCustomer } from "@/lib/auth/customer";
import AccesoLoginClient from "./ui";

export default async function AccesoLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string; detail?: string }>;
}) {
  await redirectIfAuthenticatedCustomer();
  const params = await searchParams;

  return (
    <AccesoLoginClient
      error={params.error}
      success={params.success}
      detail={params.detail}
    />
  );
}