import type { Metadata } from "next";
import NosotrosClient from "./NosotrosClient";

export const metadata: Metadata = {
  title: "Nosotros | Salva Exclusive Caps",
  description:
    "Conoce más sobre Salva Exclusive Caps, una marca enfocada en gorras exclusivas, presencia de marca, atención directa y crecimiento serio en México.",
  alternates: {
    canonical: "/nosotros",
  },
  openGraph: {
    title: "Nosotros | Salva Exclusive Caps",
    description:
      "Conoce más sobre Salva Exclusive Caps, una marca enfocada en gorras exclusivas, presencia de marca, atención directa y crecimiento serio en México.",
    url: "https://www.salvaexclusivecaps.com/nosotros",
    siteName: "Salva Exclusive Caps",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Nosotros | Salva Exclusive Caps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nosotros | Salva Exclusive Caps",
    description:
      "Conoce más sobre la marca, su visión y su propuesta de valor.",
    images: ["/og-image.png"],
  },
};

export default function NosotrosPage() {
  return <NosotrosClient />;
}
