import Link from "next/link";
import { logoutCustomer } from "@/app/acceso/actions";
import { requireCustomer } from "@/lib/auth/customer";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function CuentaPage() {
  const customer = await requireCustomer();
  const supabase = await createSupabaseServerClient();

  const { data: profile } = await supabase
    .from("customer_profiles")
    .select("full_name, phone")
    .eq("id", customer.id)
    .maybeSingle();

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-red-500/80">
            Cuenta
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Hola{profile?.full_name ? `, ${profile.full_name}` : ""}
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
            Este es el inicio de tu cuenta de cliente. Próximamente aquí también
            aparecerán pedidos, movimientos y herramientas comerciales.
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">Correo</p>
              <p className="mt-2 text-sm text-white">{customer.email}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">Nombre</p>
              <p className="mt-2 text-sm text-white">{profile?.full_name ?? "Sin capturar"}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">Teléfono</p>
              <p className="mt-2 text-sm text-white">{profile?.phone ?? "Sin capturar"}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/cuenta/perfil"
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Editar perfil
            </Link>

            <form action={logoutCustomer}>
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
              >
                Cerrar sesión
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}