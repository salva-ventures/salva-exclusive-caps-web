"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Inicio" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/catalog", label: "Catálogo" },
  { href: "/admin/catalog/filters", label: "Filtros" },
  { href: "/admin/products", label: "Productos" },
  { href: "/admin/history", label: "Historial" },
  { href: "/admin/admins", label: "Admins" },
];

function isActive(pathname: string, href: string) {
  if (href === "/admin") return pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function AdminNav() {
  const pathname = usePathname();

  return (
    <div className="flex flex-wrap items-center gap-3">
      {links.map((link) => {
        const active = isActive(pathname, link.href);

        return (
          <Link
            key={link.href}
            href={link.href}
            className={`rounded-xl border px-4 py-2 text-sm transition ${
              active
                ? "border-white/25 bg-white/[0.10] text-white shadow-[0_0_0_1px_rgba(255,255,255,0.06)]"
                : "border-white/10 text-white/80 hover:border-white/20 hover:bg-white/[0.04]"
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </div>
  );
}