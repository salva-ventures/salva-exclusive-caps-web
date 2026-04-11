import Link from "next/link";
import { requireCustomer } from "@/lib/auth/customer";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { updateCustomerProfile } from "@/app/cuenta/perfil/actions";

function getMessage(error?: string, success?: string) {
  if (success === "updated") {
    return { tone: "success", text: "Perfil actualizado correctamente." };
  }

  switch (error) {
    case "missing-name":
      return { tone: "error", text: "Debes capturar tu nombre." };
    case "update-failed":
      return { tone: "error", text: "No se pudo actualizar el perfil." };
    default:
      return null;
  }
}

export default async function CuentaPerfilPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string }>;
}) {
  const params = await searchParams;
  const message = getMessage(params.error, params.success);

  const customer = await requireCustomer();
  const supabase = await createSupabaseServerClient();

  const { data: profile } = await supabase
    .from("customer_profiles")
    .select("full_name, phone")
    .eq("id", customer.id)
    .maybeSingle();

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-red-500/80">
            Perfil
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Editar perfil
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
            Ajusta tu información base de cliente.
          </p>

          {message ? (
            <div
              className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${
                message.tone === "success"
                  ? "border-green-500/20 bg-green-500/10 text-green-300"
                  : "border-red-500/20 bg-red-500/10 text-red-300"
              }`}
            >
              {message.text}
            </div>
          ) : null}

          <form action={updateCustomerProfile} className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm text-white/80">Nombre completo</label>
              <input
                name="full_name"
                type="text"
                defaultValue={profile?.full_name ?? ""}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/80">Teléfono</label>
              <input
                name="phone"
                type="tel"
                defaultValue={profile?.phone ?? ""}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                placeholder="Tu teléfono"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/80">Correo</label>
              <input
                type="email"
                value={customer.email}
                disabled
                className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white/60 outline-none"
              />
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
              >
                Guardar cambios
              </button>

              <Link
                href="/cuenta"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
              >
                Volver a cuenta
              </Link>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}