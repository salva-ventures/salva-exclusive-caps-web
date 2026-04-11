"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { updateCustomerProfile } from "@/app/cuenta/perfil/actions";
import {
  fetchCities,
  fetchCountries,
  fetchStates,
  type GeoCity,
  type GeoCountry,
  type GeoState,
} from "@/lib/geo/client";

type ProfileData = {
  full_name: string | null;
  first_name: string | null;
  last_name: string | null;
  phone: string | null;
  phone_country_code: string | null;
  phone_national: string | null;
  country: string | null;
  state: string | null;
  city: string | null;
  country_code: string | null;
  state_id: string | null;
  city_id: string | null;
  address_line_1: string | null;
  address_line_2: string | null;
  postal_code: string | null;
  delivery_notes: string | null;
  customer_type: string | null;
  preferred_contact_channel: string | null;
  accepted_marketing: boolean | null;
  profile_completion_percent: number | null;
  age_range: string | null;
  acquisition_source: string | null;
  acquisition_source_detail: string | null;
} | null;

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
    case "invalid-country":
      return { tone: "error", text: "País inválido." };
    case "invalid-state":
      return { tone: "error", text: "Estado inválido para el país seleccionado." };
    case "invalid-city":
      return { tone: "error", text: "Ciudad inválida para el estado seleccionado." };
    case "missing-phone-country-code":
      return { tone: "error", text: "Debes capturar la lada país." };
    case "invalid-age-range":
      return { tone: "error", text: "Rango de edad inválido." };
    case "invalid-acquisition-source":
      return { tone: "error", text: "Origen de adquisición inválido." };
    case "update-failed":
      return { tone: "error", text: "No se pudo actualizar el perfil." };
    default:
      return null;
  }
}

export default function CuentaPerfilClient({
  customerEmail,
  profile,
  error,
  success,
}: {
  customerEmail: string;
  profile: ProfileData;
  error?: string;
  success?: string;
}) {
  const message = getMessage(error, success);

  const [countries, setCountries] = useState<GeoCountry[]>([]);
  const [states, setStates] = useState<GeoState[]>([]);
  const [cities, setCities] = useState<GeoCity[]>([]);

  const [selectedCountryCode, setSelectedCountryCode] = useState(profile?.country_code ?? "");
  const [selectedStateId, setSelectedStateId] = useState(profile?.state_id ?? "");
  const [selectedCityId, setSelectedCityId] = useState(profile?.city_id ?? "");
  const [phoneCountryCode, setPhoneCountryCode] = useState(profile?.phone_country_code ?? "");

  useEffect(() => {
    let cancelled = false;

    async function loadCountries() {
      try {
        const data = await fetchCountries();
        if (!cancelled) {
          setCountries(data);
        }
      } catch {}
    }

    loadCountries();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    async function loadStates() {
      if (!selectedCountryCode) {
        setStates([]);
        setCities([]);
        setSelectedStateId("");
        setSelectedCityId("");
        return;
      }

      try {
        const data = await fetchStates(selectedCountryCode);
        if (!cancelled) {
          setStates(data);
        }
      } catch {}
    }

    loadStates();
    return () => {
      cancelled = true;
    };
  }, [selectedCountryCode]);

  useEffect(() => {
    let cancelled = false;

    async function loadCities() {
      if (!selectedStateId) {
        setCities([]);
        setSelectedCityId("");
        return;
      }

      try {
        const data = await fetchCities(selectedStateId);
        if (!cancelled) {
          setCities(data);
        }
      } catch {}
    }

    loadCities();
    return () => {
      cancelled = true;
    };
  }, [selectedStateId]);

  useEffect(() => {
    if (!selectedCountryCode || countries.length === 0) return;
    const country = countries.find((item) => item.code === selectedCountryCode);
    if (country && !phoneCountryCode) {
      setPhoneCountryCode(country.phone_code);
    }
  }, [selectedCountryCode, countries, phoneCountryCode]);

  const completion = profile?.profile_completion_percent ?? 0;

  const normalizedPhoneCountryCode = useMemo(
    () => phoneCountryCode.replace(/\D/g, "").slice(0, 10),
    [phoneCountryCode]
  );

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
            <p className="text-xs uppercase tracking-[0.18em] text-white/40">Perfil completado</p>
            <p className="mt-2 text-2xl font-semibold text-white">{completion}%</p>
            <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
              <div className="h-full rounded-full bg-white transition-all" style={{ width: `${completion}%` }} />
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
                <label className="mb-2 block text-sm text-white/80">País</label>
                <select
                  name="country_code"
                  value={selectedCountryCode}
                  onChange={(e) => {
                    setSelectedCountryCode(e.target.value);
                    setSelectedStateId("");
                    setSelectedCityId("");
                  }}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                >
                  <option value="">Selecciona un país</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/80">Lada país</label>
                <input
                  name="phone_country_code"
                  type="text"
                  inputMode="numeric"
                  maxLength={10}
                  value={normalizedPhoneCountryCode}
                  onChange={(e) => setPhoneCountryCode(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                  placeholder="52"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/80">Estado</label>
                <select
                  name="state_id"
                  value={selectedStateId}
                  onChange={(e) => {
                    setSelectedStateId(e.target.value);
                    setSelectedCityId("");
                  }}
                  disabled={!selectedCountryCode}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none disabled:cursor-not-allowed disabled:text-white/35"
                >
                  <option value="">
                    {selectedCountryCode ? "Selecciona un estado" : "Primero selecciona país"}
                  </option>
                  {states.map((state) => (
                    <option key={state.id} value={state.id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/80">Ciudad</label>
                <select
                  name="city_id"
                  value={selectedCityId}
                  onChange={(e) => setSelectedCityId(e.target.value)}
                  disabled={!selectedStateId}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none disabled:cursor-not-allowed disabled:text-white/35"
                >
                  <option value="">
                    {selectedStateId ? "Selecciona una ciudad" : "Primero selecciona estado"}
                  </option>
                  {cities.map((city) => (
                    <option key={city.id} value={city.id}>
                      {city.name}
                    </option>
                  ))}
                </select>
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

              <div>
                <label className="mb-2 block text-sm text-white/80">Rango de edad (opcional)</label>
                <select
                  name="age_range"
                  defaultValue={profile?.age_range ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                >
                  <option value="">Prefiero no decirlo</option>
                  <option value="under_18">Menor de 18</option>
                  <option value="18_24">18 a 24</option>
                  <option value="25_34">25 a 34</option>
                  <option value="35_44">35 a 44</option>
                  <option value="45_plus">45+</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-white/80">¿Cómo nos conociste? (opcional)</label>
                <select
                  name="acquisition_source"
                  defaultValue={profile?.acquisition_source ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                >
                  <option value="">Prefiero no decirlo</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="recomendacion">Recomendación</option>
                  <option value="google">Google</option>
                  <option value="tiktok">TikTok</option>
                  <option value="evento">Evento</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-white/80">Detalle adicional (opcional)</label>
                <input
                  name="acquisition_source_detail"
                  type="text"
                  maxLength={120}
                  defaultValue={profile?.acquisition_source_detail ?? ""}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                  placeholder="Ejemplo: Recomendación de un amigo, anuncio, historia, etc."
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-white/80">Correo</label>
                <input
                  type="email"
                  value={customerEmail}
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

            <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-4 text-sm text-white/70">
              Estos datos analíticos son opcionales y nos ayudan a entender mejor a nuestra comunidad sin hacer el registro pesado.
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