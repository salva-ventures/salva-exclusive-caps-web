import type { Metadata } from "next";
import { CONTACT, DELIVERY_INFO } from "@/config/brand";

export const metadata: Metadata = {
  title: "Contacto | Salva Exclusive Caps",
  description:
    "Contáctanos para pedidos, cotizaciones y dudas sobre nuestro catálogo de gorras exclusivas. Atención directa por WhatsApp y redes sociales.",
  alternates: {
    canonical: "/contacto",
  },
  openGraph: {
    title: "Contacto | Salva Exclusive Caps",
    description:
      "Contáctanos para pedidos, cotizaciones y dudas sobre nuestro catálogo de gorras exclusivas. Atención directa por WhatsApp y redes sociales.",
    url: "https://www.salvaexclusivecaps.com/contacto",
    siteName: "Salva Exclusive Caps",
    locale: "es_MX",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contacto de Salva Exclusive Caps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto | Salva Exclusive Caps",
    description:
      "Contáctanos para pedidos, cotizaciones y dudas sobre nuestro catálogo de gorras exclusivas.",
    images: ["/og-image.png"],
  },
};

export default function ContactoPage() {
  const waLink = `https://wa.me/${CONTACT.whatsapp.number.replace(/\+/g, "")}?text=${encodeURIComponent(
    CONTACT.whatsapp.defaultMessage
  )}`;

  return (
    <div className="bg-black min-h-screen">
      <section className="relative border-b border-[#222] bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.18),transparent_40%)]" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-24">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-4">
            Atención directa
          </p>
          <h1 className="text-white font-bold text-4xl md:text-6xl tracking-tight max-w-3xl">
            Contacto
          </h1>
          <p className="text-[#9a9a9a] text-base md:text-lg leading-relaxed mt-6 max-w-2xl">
            Estamos listos para ayudarte con pedidos, disponibilidad, entregas y
            cualquier duda sobre nuestras gorras. La vía más rápida es
            WhatsApp.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <span className="border border-[#2a2a2a] bg-[#111] text-[#cfcfcf] text-xs tracking-widest uppercase px-4 py-2">
              Entrega inmediata
            </span>
            <span className="border border-[#2a2a2a] bg-[#111] text-[#cfcfcf] text-xs tracking-widest uppercase px-4 py-2">
              Envíos nacionales
            </span>
            <span className="border border-[#2a2a2a] bg-[#111] text-[#cfcfcf] text-xs tracking-widest uppercase px-4 py-2">
              Atención directa
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8">
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#111] border border-[#222] hover:border-red-600 transition-all duration-300 p-8 md:p-10"
          >
            <div className="flex items-start gap-5">
              <div className="w-16 h-16 bg-green-600 flex items-center justify-center flex-shrink-0 rounded-sm">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </div>

              <div className="flex-1">
                <p className="text-red-600 text-xs tracking-[0.35em] uppercase mb-3">
                  Canal prioritario
                </p>
                <h2 className="text-white font-bold text-2xl md:text-3xl mb-2">
                  Contáctanos por WhatsApp
                </h2>
                <p className="text-[#9a9a9a] text-sm md:text-base leading-relaxed max-w-xl">
                  Es la forma más rápida de atender pedidos, confirmar
                  disponibilidad, coordinar entregas y resolver dudas.
                </p>

                <div className="mt-6 border border-[#222] bg-black/40 p-4">
                  <p className="text-white font-semibold text-lg">
                    {CONTACT.whatsapp.displayNumber}
                  </p>
                  <p className="text-[#7d7d7d] text-sm mt-1">
                    Atención directa y respuesta lo más rápido posible.
                  </p>
                </div>

                <p className="text-red-600 text-xs tracking-widest uppercase mt-6 group-hover:text-white transition-colors">
                  Abrir conversación →
                </p>
              </div>
            </div>
          </a>

          <div className="bg-[#111] border border-[#222] p-8 md:p-10">
            <p className="text-red-600 text-xs tracking-[0.35em] uppercase mb-3">
              Cobertura
            </p>
            <h2 className="text-white font-bold text-2xl mb-5">
              Entregas y envíos
            </h2>

            <div className="space-y-5">
              <div>
                <p className="text-white text-sm font-medium mb-2">
                  Entrega inmediata
                </p>
                <p className="text-[#9a9a9a] text-sm leading-relaxed">
                  {DELIVERY_INFO.immediate.join(", ")}.
                </p>
              </div>

              <div>
                <p className="text-white text-sm font-medium mb-2">Cobertura adicional</p>
                <p className="text-[#9a9a9a] text-sm leading-relaxed">
                  Envíos nacionales e internacionales con costo extra.
                </p>
              </div>

              <div>
                <p className="text-white text-sm font-medium mb-2">Horario</p>
                <p className="text-[#9a9a9a] text-sm leading-relaxed">
                  {DELIVERY_INFO.hours}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16 md:pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href={CONTACT.social.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#111] border border-[#222] hover:border-red-600 p-6 transition-all duration-300"
          >
            <div className="w-12 h-12 mb-4 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </div>
            <p className="text-white font-semibold text-base mb-1">Instagram</p>
            <p className="text-[#8a8a8a] text-sm group-hover:text-red-600 transition-colors">
              @{CONTACT.social.instagram}
            </p>
          </a>

          <a
            href={CONTACT.social.tiktokUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#111] border border-[#222] hover:border-red-600 p-6 transition-all duration-300"
          >
            <div className="w-12 h-12 mb-4 bg-black rounded-lg flex items-center justify-center border border-white">
              <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
              </svg>
            </div>
            <p className="text-white font-semibold text-base mb-1">TikTok</p>
            <p className="text-[#8a8a8a] text-sm group-hover:text-red-600 transition-colors">
              @{CONTACT.social.tiktok}
            </p>
          </a>

          <a
            href={CONTACT.social.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-[#111] border border-[#222] hover:border-red-600 p-6 transition-all duration-300"
          >
            <div className="w-12 h-12 mb-4 bg-blue-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6" fill="white" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </div>
            <p className="text-white font-semibold text-base mb-1">Facebook</p>
            <p className="text-[#8a8a8a] text-sm group-hover:text-red-600 transition-colors">
              {CONTACT.social.facebook}
            </p>
          </a>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-[#111] border border-[#222] p-8">
            <p className="text-red-600 text-xs tracking-[0.35em] uppercase mb-3">
              Punto de atención
            </p>
            <h3 className="text-white font-bold text-xl mb-4">Showroom oficial</h3>
            <p className="text-[#d0d0d0] text-base mb-1">{CONTACT.showroom.city}</p>
            <p className="text-[#8a8a8a] text-sm leading-relaxed">
              {CONTACT.showroom.address}
            </p>
            <p className="text-[#666] text-xs mt-5 leading-relaxed">
              Otros puntos de entrega en {DELIVERY_INFO.immediate.join(", ")} se
              coordinan directamente por WhatsApp.
            </p>
          </div>

          <div className="bg-[#111] border border-[#222] p-8">
            <p className="text-red-600 text-xs tracking-[0.35em] uppercase mb-3">
              Respuesta
            </p>
            <h3 className="text-white font-bold text-xl mb-4">Horario de atención</h3>
            <p className="text-[#d0d0d0] text-base">{DELIVERY_INFO.hours}</p>
            <p className="text-[#8a8a8a] text-sm mt-3 leading-relaxed">
              Atendemos dudas, pedidos y coordinación de entregas con la mayor
              rapidez posible.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
