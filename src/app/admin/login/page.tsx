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
          La pantalla de login real se conecta en el siguiente paso con
          Supabase Auth.
        </p>
      </div>
    </div>
  );
}
