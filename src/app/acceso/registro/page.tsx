import { redirectIfAuthenticatedCustomer } from "@/lib/auth/customer";
import AccesoRegistroClient from "./ui";

export default async function AccesoRegistroPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; detail?: string }>;
}) {
  await redirectIfAuthenticatedCustomer();
  const params = await searchParams;

  return (
    <AccesoRegistroClient
      error={params.error}
      detail={params.detail}
    />
  );
}