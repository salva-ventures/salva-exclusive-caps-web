import Link from "next/link";
import { requireCustomer } from "@/lib/auth/customer";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { updateCustomerProfile } from "@/app/cuenta/perfil/actions";

function getMessage(error?: string, success?: string) {
  if (success === "updated") {
    return { tone: "success", text: "Perfil actualizado correctamente." };
  }

  switch (error) {
    case "missing-first-name":
      return { tone: "error", text: "Debes capturar tu nombre." };
    case "missing-last-name":
      return { tone: "error", text: "Debes capturar tus apellidos." };
    case "invalid-customer-type":
      return { tone: "error", text: "Tipo de cliente inválido." };
    case "invalid-contact-channel":
      return { tone: "error", text: "Canal de contacto inválido." };
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
    .select(`
      full_name,
      first_name,
      last_name,
      phone,
      phone_country_code,
      phone_national,
      city,
      state,
      country,
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
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-red-500/80">
            Perfil
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Editar perfil comercial
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
            Completa tu información base para futuras compras, pedidos y contacto.
          </p>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-white/40">
                  Perfil completado
                </p>
                <p className="mt-2 text-2xl font-semibold text-white">
                  {profile?.profile_completion_percent ?? 0}%
                </p>
              </div>
            </div>

            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-white transition-all"
                style={{ width: `${profile?.profile_completion_percent ?? 0}%` }}
              />
            </div>
          </div>

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

          <form action={updateCustomerProfile} className="mt-8 space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-white/80">Nombre</label>
                <input
                  name="first_name"
                  type="text"
                  maxLength={50}
                  defaultValue={profile?.first_name ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                  placeholder="Tu nombre"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/80">Apellidos</label>
                <input
                  name="last_name"
                  type="text"
                  maxLength={70}
                  defaultValue={profile?.last_name ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                  placeholder="Tus apellidos"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/80">Lada país</label>
                <input
                  name="phone_country_code"
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  defaultValue={profile?.phone_country_code ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                  placeholder="52"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/80">Teléfono</label>
                <input
                  name="phone_national"
                  type="text"
                  inputMode="numeric"
                  maxLength={20}
                  defaultValue={profile?.phone_national ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                  placeholder="8123456789"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/80">Ciudad</label>
                <input
                  name="city"
                  type="text"
                  maxLength={80}
                  defaultValue={profile?.city ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                  placeholder="Tu ciudad"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/80">Estado</label>
                <input
                  name="state"
                  type="text"
                  maxLength={80}
                  defaultValue={profile?.state ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                  placeholder="Tu estado"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/80">País</label>
                <input
                  name="country"
                  type="text"
                  maxLength={80}
                  defaultValue={profile?.country ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                  placeholder="Tu país"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/80">Código postal</label>
                <input
                  name="postal_code"
                  type="text"
                  maxLength={20}
                  defaultValue={profile?.postal_code ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                  placeholder="Tu código postal"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/80">Dirección principal</label>
                <input
                  name="address_line_1"
                  type="text"
                  maxLength={140}
                  defaultValue={profile?.address_line_1 ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                  placeholder="Calle, número, colonia"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/80">Dirección adicional</label>
                <input
                  name="address_line_2"
                  type="text"
                  maxLength={140}
                  defaultValue={profile?.address_line_2 ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                  placeholder="Departamento, interior, referencia"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/80">Tipo de cliente</label>
                <select
                  name="customer_type"
                  defaultValue={profile?.customer_type ?? "retail"}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                >
                  <option value="retail">Retail</option>
                  <option value="wholesale">Wholesale</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/80">Canal preferido</label>
                <select
                  name="preferred_contact_channel"
                  defaultValue={profile?.preferred_contact_channel ?? "whatsapp"}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                >
                  <option value="whatsapp">WhatsApp</option>
                  <option value="email">Email</option>
                  <option value="instagram">Instagram</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-white/80">Correo</label>
                <input
                  type="email"
                  value={customer.email}
                  disabled
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-white/60 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/80">Notas de entrega</label>
              <textarea
                name="delivery_notes"
                rows={4}
                maxLength={300}
                defaultValue={profile?.delivery_notes ?? ""}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                placeholder="Referencias, indicaciones o notas útiles para futuras entregas"
              />
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/80">
              <input
                name="accepted_marketing"
                type="checkbox"
                defaultChecked={profile?.accepted_marketing ?? false}
                className="mt-1 h-4 w-4 rounded border-white/20 bg-transparent"
              />
              <span>
                Acepto recibir comunicaciones comerciales, novedades y mensajes relacionados con productos y disponibilidad.
              </span>
            </label>

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