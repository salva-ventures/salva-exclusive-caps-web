import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disponibilidad y envíos | Salva Exclusive Caps",
  description:
    "Entrega inmediata en Tampico, Madero, Altamira y Monterrey. Envíos nacionales a toda la República Mexicana e internacionales con costo extra.",
  keywords: [
    "envíos gorras México",
    "entrega inmediata Tampico",
    "envíos internacionales gorras",
    "entrega Monterrey",
    "paquetería nacional",
    "Salva Exclusive Caps",
  ],
  alternates: {
    canonical: "/disponibilidad",
  },
  openGraph: {
    title: "Disponibilidad y envíos | Salva Exclusive Caps",
    description:
      "Entrega inmediata en Tampico, Madero, Altamira y Monterrey. Envíos nacionales a toda la República Mexicana e internacionales con costo extra.",
    url: "https://www.salvaexclusivecaps.com/disponibilidad",
    siteName: "Salva Exclusive Caps",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Disponibilidad y envíos de Salva Exclusive Caps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Disponibilidad y envíos | Salva Exclusive Caps",
    description:
      "Consulta entrega inmediata, envíos nacionales e internacionales de Salva Exclusive Caps.",
    images: ["/og-image.png"],
  },
};
