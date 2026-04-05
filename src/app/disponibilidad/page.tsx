import type { Metadata } from "next";
import DisponibilidadClient from "./DisponibilidadClient";

export const metadata: Metadata = {
  title: "Disponibilidad y Envíos | Salva Exclusive Caps",
  description:
    "Entrega inmediata en Tampico, Madero, Altamira y Monterrey. Envíos nacionales a toda la República Mexicana e internacionales a cualquier país del mundo.",
  keywords: [
    "envíos gorras México",
    "entrega inmediata Tampico",
    "envíos internacionales gorras",
    "entrega Monterrey",
    "paquetería nacional",
  ],
  alternates: {
    canonical: "/disponibilidad",
  },
  openGraph: {
    title: "Disponibilidad y Envíos | Salva Exclusive Caps",
    description:
      "Entrega inmediata en Tampico, Madero, Altamira y Monterrey. Envíos nacionales e internacionales con confirmación directa por WhatsApp.",
    url: "https://www.salvaexclusivecaps.com/disponibilidad",
    siteName: "Salva Exclusive Caps",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Disponibilidad y Envíos | Salva Exclusive Caps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Disponibilidad y Envíos | Salva Exclusive Caps",
    description:
      "Entrega inmediata y envíos nacionales e internacionales con confirmación directa.",
    images: ["/og-image.png"],
  },
};

export default function DisponibilidadPage() {
  return <DisponibilidadClient />;
}
}
