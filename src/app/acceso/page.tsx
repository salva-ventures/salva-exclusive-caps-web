import Link from "next/link";

export default function AccesoPage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.28em] text-white/45">
          Acceso
        </p>
        <h1 className="mt-3 text-4xl font-semibold text-white">
          Acceso a cuentas y administración
        </h1>
        <p className="mt-4 text-white/65">
          Aquí vivirá el acceso para clientes y también la entrada al panel administrativo.
        </p>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm uppercase tracking-[0.22em] text-white/45">
            Clientes
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Mi cuenta
          </h2>
          <p className="mt-3 text-white/65">
            Próximamente aquí podrás registrarte, iniciar sesión, ver tus pedidos y administrar tu cuenta.
          </p>

          <div className="mt-6">
            <span className="inline-flex rounded-2xl border border-white/10 px-5 py-3 text-sm text-white/60">
              Próximamente
            </span>
          </div>
        </article>

        <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-sm uppercase tracking-[0.22em] text-white/45">
            Administración
          </p>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            Panel administrativo
          </h2>
          <p className="mt-3 text-white/65">
            Acceso para administradores autorizados de Salva Exclusive Caps.
          </p>

          <div className="mt-6">
            <Link
              href="/admin/login"
              className="inline-flex rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
            >
              Ir a iniciar sesión
            </Link>
          </div>
        </article>
      </div>
    </section>
  );
}