import Link from "next/link";
import { loginCustomer } from "@/app/acceso/actions";
import { redirectIfAuthenticatedCustomer } from "@/lib/auth/customer";

function getMessage(error?: string, success?: string, detail?: string) {
  if (success === "registered") {
    return { tone: "success", text: "Cuenta creada correctamente. Ya puedes iniciar sesión." };
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

export default async function AccesoLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string; detail?: string }>;
}) {
  await redirectIfAuthenticatedCustomer();

  const params = await searchParams;
  const message = getMessage(params.error, params.success, params.detail);

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
            Entra a tu cuenta de cliente. Próximamente aquí también se
            integrarán pedidos y movimientos.
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
                autoComplete="current-password"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none placeholder:text-white/35"
                placeholder="Tu contraseña"
                required
              />
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
            <Link href="/acceso" className="hover:text-white">
              Volver a acceso
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}