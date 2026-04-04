import type { Metadata } from "next";
import CatalogoClient from "./CatalogoClient";

export const metadata: Metadata = {
  title: "Catálogo | Salva Exclusive Caps",
  description:
    "Explora el catálogo de gorras exclusivas de Salva Exclusive Caps. Entrega inmediata en Tampico, Madero, Altamira y Monterrey. Envíos nacionales e internacionales con costo extra.",
  alternates: {
    canonical: "/catalogo",
  },
  openGraph: {
    title: "Catálogo | Salva Exclusive Caps",
    description:
      "Explora el catálogo de gorras exclusivas de Salva Exclusive Caps. Entrega inmediata en Tampico, Madero, Altamira y Monterrey. Envíos nacionales e internacionales con costo extra.",
    url: "https://www.salvaexclusivecaps.com/catalogo",
    siteName: "Salva Exclusive Caps",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Catálogo de Salva Exclusive Caps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Catálogo | Salva Exclusive Caps",
    description:
      "Explora el catálogo de gorras exclusivas de Salva Exclusive Caps. Entrega inmediata en Tampico, Madero, Altamira y Monterrey.",
    images: ["/og-image.png"],
  },
};

export default function CatalogoPage() {
  return <CatalogoClient />;
}
