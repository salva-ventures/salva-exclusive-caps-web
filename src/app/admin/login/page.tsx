import { loginAdmin } from "./actions";

export default function AdminLoginPage() {
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
          Inicia sesión con un correo autorizado para entrar al panel interno.
        </p>

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
            <label className="mb-2 block text-sm text-white/75">Contraseña</label>
            <input
              name="password"
              type="password"
              autoComplete="current-password"
              className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
              placeholder="••••••••"
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
