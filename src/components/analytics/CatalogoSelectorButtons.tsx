"use client";

import Link from "next/link";
import { trackClientEvent } from "@/lib/analytics/track-client";

export default function CatalogoSelectorButtons({
  mode,
}: {
  mode: "menudeo" | "mayoreo";
}) {
  const isMenudeo = mode === "menudeo";

  return (
    <div className="mt-8">
      <Link
        href={isMenudeo ? "/catalogo/menudeo" : "/catalogo/mayoreo"}
        onClick={() =>
          trackClientEvent({
            eventType: "cta_clicked",
            entityType: "cta",
            entitySlug: isMenudeo ? "catalogo-menudeo" : "catalogo-mayoreo",
            pagePath: "/catalogo",
            pageTitle: "Catálogo | Salva Exclusive Caps",
            eventData: {
              source_page: "catalogo-selector",
              destination: isMenudeo ? "/catalogo/menudeo" : "/catalogo/mayoreo",
            },
          })
        }
        className={
          isMenudeo
            ? "inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-sm font-semibold text-black transition hover:bg-white/90"
            : "inline-flex w-full items-center justify-center rounded-full bg-red-600 px-6 py-4 text-sm font-semibold text-white transition hover:bg-red-500"
        }
      >
        {isMenudeo ? "Entrar a Menudeo" : "Entrar a Mayoreo"}
      </Link>
    </div>
  );
}

