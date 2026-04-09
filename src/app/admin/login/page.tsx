import { loginAdmin } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const error = params.error;

  return (
    <div className="min-h-screen bg-black px-4 py-16 text-white">
      <div className="mx-auto max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-8">
        <p className="text-xs uppercase tracking-[0.28em] text-white/50">
          Admin
        </p>
        <h1 className="mt-2 text-2xl font-semibold">
          Acceso administrativo
        </h1>
        <p className="mt-4 text-white/65">
          Inicia sesion con un correo autorizado para entrar al panel interno.
        </p>

        {error === "missing" && (
          <div className="mt-6 rounded-2xl border border-yellow-500/20 bg-yellow-500/10 px-4 py-3 text-sm text-yellow-200">
            Debes capturar correo y contrasena.
          </div>
        )}

        {error === "invalid" && (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            Credenciales invalidas o correo sin acceso administrativo.
          </div>
        )}

        <form action={loginAdmin} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-white/75">Correo</label>
            <input
              name="email"
              type="email"
              autoComplete="email"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
              placeholder="correo@dominio.com"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-white/75">Contrasena</label>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-white px-4 py-3 font-medium text-black transition hover:bg-white/90"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}