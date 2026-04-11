import Link from "next/link";
import { getAuthenticatedCustomer } from "@/lib/auth/customer";

export default async function AccesoPage() {
  const customer = await getAuthenticatedCustomer();

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-red-500/80">
            Cuenta
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Acceso a tu cuenta
          </h1>
          <p className="mt-5 text-base leading-7 text-white/70 sm:text-lg">
            Desde aquí puedes iniciar sesión, crear tu cuenta o entrar a tu
            panel de cliente. El acceso a administración se mantiene por separado.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/45">
              Clientes
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Cuenta de cliente
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
              Gestiona tu acceso de cliente. Próximamente aquí también se
              integrarán pedidos, historial y herramientas comerciales.
            </p>

            {customer ? (
              <div className="mt-8 space-y-3">
                <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-300">
                  Ya tienes una sesión activa como {customer.email}.
                </div>

                <Link
                  href="/cuenta"
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Ir a mi cuenta
                </Link>
              </div>
            ) : (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/acceso/login"
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
                >
                  Iniciar sesión
                </Link>

                <Link
                  href="/acceso/registro"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/[0.08]"
                >
                  Crear cuenta
                </Link>
              </div>
            )}
          </article>

          <article className="rounded-3xl border border-red-500/20 bg-red-500/[0.06] p-7 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-red-300/80">
              Administración
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-white">
              Panel administrativo
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
              Este acceso es exclusivo para administradores autorizados del
              sistema. Los clientes tienen su propio flujo independiente de cuenta.
            </p>

            <div className="mt-8">
              <Link
                href="/admin/login"
                className="inline-flex w-full items-center justify-center rounded-full bg-red-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-red-500"
              >
                Ir a administración
              </Link>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}