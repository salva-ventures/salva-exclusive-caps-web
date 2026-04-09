import Link from "next/link";
import { ReactNode } from "react";
import { requireAdminUser } from "@/lib/admin/auth";
import { logoutAdmin } from "@/app/admin/actions";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireAdminUser();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-white/50">
              Salva Exclusive Caps
            </p>
            <h1 className="mt-1 text-xl font-semibold">Admin</h1>
            <p className="mt-1 text-sm text-white/45">{user.email}</p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/[0.04]"
            >
              Inicio
            </Link>

            <Link
              href="/admin/products"
              className="rounded-xl border border-white/10 px-4 py-2 text-sm text-white/80 transition hover:border-white/20 hover:bg-white/[0.04]"
            >
              Productos
            </Link>

            <form action={logoutAdmin}>
              <button
                type="submit"
                className="rounded-xl bg-white px-4 py-2 text-sm font-medium text-black transition hover:bg-white/90"
              >
                Cerrar sesion
              </button>
            </form>
          </div>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}