import Link from "next/link";
import { requestPasswordReset } from "@/app/acceso/actions";

function getMessage(error?: string, success?: string, detail?: string) {
  if (success === "sent") {
    return { tone: "success", text: "Te enviamos un correo para restablecer tu contraseña." };
  }

  switch (error) {
    case "missing-email":
      return { tone: "error", text: "Debes capturar tu correo." };
    case "reset-request-failed":
      return {
        tone: "error",
        text: detail ? `No se pudo enviar el correo: ${detail}` : "No se pudo enviar el correo.",
      };
    default:
      return null;
  }
}

export default async function RecuperarPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; success?: string; detail?: string }>;
}) {
  const params = await searchParams;
  const message = getMessage(params.error, params.success, params.detail);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-3xl items-center px-6 py-16">
        <div className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-red-500/80">
            Seguridad
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
            Recuperar contraseña
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
            Te enviaremos un correo para restablecer tu contraseña.
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

          <form action={requestPasswordReset} className="mt-8 space-y-4">
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

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
            >
              Enviar correo
            </button>
          </form>

          <div className="mt-6 text-sm text-white/60">
            <Link href="/acceso/login" className="hover:text-white">
              Volver a iniciar sesión
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}