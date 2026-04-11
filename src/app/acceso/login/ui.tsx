"use client";

import Link from "next/link";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginCustomer } from "@/app/acceso/actions";

function getMessage(error?: string, success?: string, detail?: string) {
  if (success === "registered") {
    return { tone: "success", text: "Cuenta creada correctamente. Revisa tu correo para verificar tu cuenta." };
  }

  if (success === "verified-email") {
    return { tone: "success", text: "Correo verificado correctamente. Ya puedes iniciar sesión." };
  }

  if (success === "password-updated") {
    return { tone: "success", text: "Contraseña actualizada correctamente." };
  }

  if (success === "logged-out") {
    return { tone: "success", text: "Sesión cerrada correctamente." };
  }

  switch (error) {
    case "missing-fields":
      return { tone: "error", text: "Debes capturar correo y contraseña." };
    case "invalid-credentials":
      return {
        tone: "error",
        text: detail ? `Correo o contraseña inválidos: ${detail}` : "Correo o contraseña inválidos.",
      };
    default:
      return null;
  }
}

export default function AccesoLoginClient({
  error,
  success,
  detail,
}: {
  error?: string;
  success?: string;
  detail?: string;
}) {
  const [showPassword, setShowPassword] = useState(false);
  const message = getMessage(error, success, detail);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-16">
        <div className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-red-500/80">
            Cuenta
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Iniciar sesión
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
            Entra a tu cuenta de cliente.
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

          <form action={loginCustomer} className="mt-8 space-y-4">
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
                  autoComplete="current-password"
                  maxLength={64}
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 pr-14 text-white outline-none placeholder:text-white/35"
                  placeholder="Tu contraseña"
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
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Entrar
            </button>
          </form>

          <div className="mt-6 flex flex-col gap-3 text-sm text-white/60 sm:flex-row sm:items-center sm:justify-between">
            <Link href="/acceso/registro" className="hover:text-white">
              Crear cuenta
            </Link>
            <Link href="/acceso/recuperar" className="hover:text-white">
              Olvidé mi contraseña
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