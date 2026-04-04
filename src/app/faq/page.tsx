import type { Metadata } from "next";
import FAQClient from "./FAQClient";

export const metadata: Metadata = {
  title: "Preguntas frecuentes | Salva Exclusive Caps",
  description:
    "Resuelve tus dudas sobre pedidos, entregas, envíos, disponibilidad y compra de gorras exclusivas en Salva Exclusive Caps.",
  alternates: {
    canonical: "/faq",
  },
  openGraph: {
    title: "Preguntas frecuentes | Salva Exclusive Caps",
    description:
      "Resuelve tus dudas sobre pedidos, entregas, envíos, disponibilidad y compra de gorras exclusivas en Salva Exclusive Caps.",
    url: "https://www.salvaexclusivecaps.com/faq",
    siteName: "Salva Exclusive Caps",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Preguntas frecuentes de Salva Exclusive Caps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preguntas frecuentes | Salva Exclusive Caps",
    description:
      "Resuelve tus dudas sobre pedidos, entregas, envíos y disponibilidad.",
    images: ["/og-image.png"],
  },
};

export default function FAQPage() {
  return <FAQClient />;
}
