import Link from "next/link";
import { logoutCustomer } from "@/app/acceso/actions";
import { requireCustomer } from "@/lib/auth/customer";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export default async function CuentaPage() {
  const customer = await requireCustomer();
  const supabase = await createSupabaseServerClient();

  const { data: profile } = await supabase
    .from("customer_profiles")
    .select(`
      full_name,
      phone,
      city,
      state,
      country,
      delivery_notes,
      customer_type,
      preferred_contact_channel,
      accepted_marketing,
      is_active
    `)
    .eq("id", customer.id)
    .maybeSingle();

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-red-500/80">
            Cuenta
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Hola{profile?.full_name ? `, ${profile.full_name}` : ""}
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
            Tu cuenta ya está lista como base comercial para futuras compras,
            pedidos y seguimiento.
          </p>

          {!profile?.is_active ? (
            <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-300">
              Tu perfil está marcado como inactivo.
            </div>
          ) : null}

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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

            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">Tipo</p>
              <p className="mt-2 text-sm capitalize text-white">{profile?.customer_type ?? "retail"}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">Ciudad</p>
              <p className="mt-2 text-sm text-white">{profile?.city ?? "Sin capturar"}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">Estado</p>
              <p className="mt-2 text-sm text-white">{profile?.state ?? "Sin capturar"}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">País</p>
              <p className="mt-2 text-sm text-white">{profile?.country ?? "Sin capturar"}</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">Canal preferido</p>
              <p className="mt-2 text-sm capitalize text-white">
                {profile?.preferred_contact_channel ?? "whatsapp"}
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">Notas de entrega</p>
              <p className="mt-2 text-sm text-white/80">
                {profile?.delivery_notes?.trim() ? profile.delivery_notes : "Sin notas de entrega."}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 px-5 py-4">
              <p className="text-xs uppercase tracking-[0.18em] text-white/40">Marketing</p>
              <p className="mt-2 text-sm text-white/80">
                {profile?.accepted_marketing ? "Acepta comunicaciones comerciales." : "No acepta comunicaciones comerciales."}
              </p>
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
