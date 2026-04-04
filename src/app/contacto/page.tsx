import type { Metadata } from "next";
import ContactoClient from "./ContactoClient";

export const metadata: Metadata = {
  title: "Contacto | Salva Exclusive Caps",
  description:
    "Contáctanos directamente por WhatsApp para confirmar disponibilidad, entregas y envíos de Salva Exclusive Caps.",
  alternates: {
    canonical: "/contacto",
  },
  openGraph: {
    title: "Contacto | Salva Exclusive Caps",
    description:
      "Contáctanos directamente por WhatsApp para confirmar disponibilidad, entregas y envíos de Salva Exclusive Caps.",
    url: "https://www.salvaexclusivecaps.com/contacto",
    siteName: "Salva Exclusive Caps",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contacto | Salva Exclusive Caps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | Salva Exclusive Caps",
    description:
      "Atención directa por WhatsApp para disponibilidad, entregas y envíos.",
    images: ["/og-image.png"],
  },
};

export default function ContactoPage() {
  return <ContactoClient />;
}
