"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { registerCustomer } from "@/app/acceso/actions";

function getMessage(error?: string, detail?: string) {
  switch (error) {
    case "missing-fields":
      return "Debes capturar nombre, correo y ambas contraseñas.";
    case "invalid-name":
      return "Debes capturar un nombre válido.";
    case "weak-password":
      return "La contraseña debe tener entre 8 y 64 caracteres, una mayúscula, una minúscula y un número.";
    case "password-mismatch":
      return "Las contraseñas no coinciden.";
    case "register-failed":
      return detail ? `No se pudo crear la cuenta: ${detail}` : "No se pudo crear la cuenta.";
    default:
      return null;
  }
}

function passwordChecks(password: string) {
  return {
    length: password.length >= 8 && password.length <= 64,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /\d/.test(password),
  };
}

export default function AccesoRegistroClient({
  error,
  detail,
}: {
  error?: string;
  detail?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");

  const errorMessage = getMessage(error, detail);
  const checks = useMemo(() => passwordChecks(password), [password]);

  const checkClass = (ok: boolean) =>
    ok ? "text-green-300" : "text-white/40";

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-16">
        <div className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-red-500/80">
            Cuenta
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Crear cuenta
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
            Registra tu cuenta con seguridad reforzada.
          </p>

          {errorMessage ? (
            <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {errorMessage}
            </div>
          ) : null}

          <form action={registerCustomer} className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-sm text-white/80">Nombre completo</label>
              <input
                name="full_name"
                type="text"
                autoComplete="name"
                maxLength={80}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                placeholder="Tu nombre"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/80">Teléfono (opcional)</label>
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={30}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                placeholder="Tu teléfono"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/80">Correo</label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                maxLength={120}
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/80">Contraseña</label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  maxLength={64}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 pr-14 text-white outline-none placeholder:text-white/35"
                  placeholder="Mínimo 8 caracteres"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/55 transition hover:text-white"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>

              <div className="mt-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-xs">
                <ul className="space-y-1">
                  <li className={checkClass(checks.length)}>• Entre 8 y 64 caracteres</li>
                  <li className={checkClass(checks.upper)}>• Al menos una mayúscula</li>
                  <li className={checkClass(checks.lower)}>• Al menos una minúscula</li>
                  <li className={checkClass(checks.number)}>• Al menos un número</li>
                </ul>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/80">Confirmar contraseña</label>
              <div className="relative">
                <input
                  name="confirm_password"
                  type={showConfirmPassword ? "text" : "password"}
                  autoComplete="new-password"
                  maxLength={64}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 pr-14 text-white outline-none placeholder:text-white/35"
                  placeholder="Repite tu contraseña"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/55 transition hover:text-white"
                  aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Crear cuenta
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-3 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/acceso/login" className="hover:text-white">
              Ya tengo cuenta
            </Link>
            <Link href="/acceso" className="hover:text-white">
              Volver a acceso
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}