import Link from "next/link";

export default function AccesoPage() {
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
            Desde aquí podrás iniciar sesión, crear tu cuenta y, próximamente,
            consultar pedidos y movimientos de cliente. El acceso a
            administración sigue disponible por separado.
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
              Crea tu cuenta o inicia sesión para preparar la base del sistema de
              clientes. Próximamente también se integrarán pedidos, historial y
              herramientas de compra.
            </p>

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
              sistema. Los usuarios normales de cliente tendrán su propio flujo
              de cuenta y funciones comerciales.
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