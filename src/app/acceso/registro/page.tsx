import Link from "next/link";
import { registerCustomer } from "@/app/acceso/actions";

function getMessage(error?: string, detail?: string) {
  switch (error) {
    case "missing-fields":
      return "Debes capturar nombre, correo y ambas contraseñas.";
    case "weak-password":
      return "La contraseña debe tener al menos 6 caracteres.";
    case "password-mismatch":
      return "Las contraseñas no coinciden.";
    case "register-failed":
      return detail ? `No se pudo crear la cuenta: ${detail}` : "No se pudo crear la cuenta.";
    default:
      return null;
  }
}

export default async function AccesoRegistroPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; detail?: string }>;
}) {
  const params = await searchParams;
  const errorMessage = getMessage(params.error, params.detail);

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
            Registra tu cuenta de cliente. Más adelante esta cuenta te servirá
            para compras, seguimiento y herramientas de cliente.
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
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/80">Contraseña</label>
              <input
                name="password"
                type="password"
                autoComplete="new-password"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                placeholder="Mínimo 6 caracteres"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-white/80">Confirmar contraseña</label>
              <input
                name="confirm_password"
                type="password"
                autoComplete="new-password"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                placeholder="Repite tu contraseña"
                required
              />
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