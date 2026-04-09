import { ReactNode } from "react";
import { requireAdminUser } from "@/lib/admin/auth";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireAdminUser();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-7xl px-4 py-4">
          <p className="text-xs uppercase tracking-[0.28em] text-white/50">
            Salva Exclusive Caps
          </p>
          <h1 className="mt-1 text-xl font-semibold">Admin</h1>
        </div>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8">{children}</main>
    </div>
  );
}
