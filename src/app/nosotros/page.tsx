import type { Metadata } from "next";
import { BRAND } from "@/config/brand";

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

const team = [
  {
    name: "Salva",
    role: "Comercial & Creativo",
    desc: "Lidera la parte comercial y creativa de la marca. Es la cara del negocio, impulsa la visión estética del proyecto y se enfoca en la relación directa con clientes, ventas y posicionamiento de la marca. Además, conoce de cerca este nicho de mercado, mantiene la relación directa con proveedores y coordina aspectos clave de envíos y redes sociales.",
  },
  {
    name: "Carlitos",
    role: "Operaciones, IT & Escalabilidad",
    desc: "Lidera la estructura operativa y tecnológica del negocio. Se enfoca en el orden interno, control administrativo, sistemas IT, contabilidad y desarrollo de procesos para dar solidez, trazabilidad y escalabilidad al proyecto.",
  },
];

const values = [
  {
    title: "Confianza",
    desc: "Construimos relaciones de largo plazo basadas en transparencia, cumplimiento y comunicación clara.",
  },
  {
    title: "Calidad",
    desc: "Cada gorra es seleccionada con criterio. Solo ofrecemos productos que nosotros mismos usaríamos.",
  },
  {
    title: "Crecimiento",
    desc: "Trabajamos con visión de escalabilidad, estructura y profesionalización constante del negocio.",
  },
];

export default function NosotrosPage() {
  return (
    <div className="bg-black min-h-screen">
      <section className="relative border-b border-[#222] bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.18),transparent_40%)]" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-24">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-4">
            La marca
          </p>
          <h1 className="text-white font-bold text-4xl md:text-6xl tracking-tight max-w-3xl">
            Nosotros
          </h1>
          <p className="text-[#9a9a9a] text-base md:text-lg leading-relaxed mt-6 max-w-3xl">
            {BRAND.name} nace con la intención de construir una marca de gorras
            exclusivas con identidad propia, estética fuerte y una propuesta
            visual distinta dentro del mercado mexicano.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <span className="border border-[#2a2a2a] bg-[#111] text-[#cfcfcf] text-xs tracking-widest uppercase px-4 py-2">
              Marca premium
            </span>
            <span className="border border-[#2a2a2a] bg-[#111] text-[#cfcfcf] text-xs tracking-widest uppercase px-4 py-2">
              Identidad propia
            </span>
            <span className="border border-[#2a2a2a] bg-[#111] text-[#cfcfcf] text-xs tracking-widest uppercase px-4 py-2">
              Visión de crecimiento
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          <div className="bg-[#111] border border-[#222] p-8 md:p-10">
            <p className="text-red-600 text-xs tracking-[0.35em] uppercase mb-4">
              Visión
            </p>
            <blockquote className="border-l-2 border-red-600 pl-6 md:pl-8">
              <p className="text-white text-xl md:text-2xl leading-relaxed font-light italic">
                &ldquo;Posicionar a {BRAND.name} como la marca referente en
                México en gorras premium, combinando diseño, identidad y una
                experiencia de compra sólida, moderna y confiable.&rdquo;
              </p>
            </blockquote>
          </div>

          <div>
            <p className="text-red-600 text-xs tracking-[0.35em] uppercase mb-4">
              Historia
            </p>
            <h2 className="text-white font-bold text-2xl md:text-4xl tracking-tight mb-6">
              Construimos marca, no solo catálogo
            </h2>
            <div className="space-y-5 text-[#9a9a9a] leading-relaxed text-sm md:text-base">
              <p>
                La marca busca combinar diseño, presencia, exclusividad y una
                experiencia de compra clara, confiable y bien cuidada.
              </p>
              <p>
                Cada pieza es seleccionada con criterio editorial: no basta con
                que sea una gorra, tiene que representar estilo, exclusividad y
                actitud.
              </p>
              <p>
                Nuestra visión es posicionarnos como un referente en México
                dentro del segmento de gorras premium, elevando tanto el
                producto como la forma en que se presenta y se vende,
                construyendo relaciones de confianza con clientes y socios
                comerciales.
              </p>
              <p>
                Operamos con estructura, trazabilidad y una visión clara de
                crecimiento nacional. Esto no es solo venta de gorras: es la
                construcción de una marca sólida con proyección a largo plazo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16 md:pb-20">
        <div className="mb-8">
          <p className="text-red-600 text-xs tracking-[0.35em] uppercase mb-4">
            Equipo
          </p>
          <h2 className="text-white font-bold text-2xl md:text-4xl tracking-tight">
            Las personas detrás
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {team.map((person) => (
            <div
              key={person.name}
              className="bg-[#111] border border-[#222] p-8 hover:border-red-600/60 transition-colors"
            >
              <div className="w-14 h-14 bg-red-600/10 border border-red-600/30 mb-5 flex items-center justify-center">
                <span className="text-red-600 font-bold text-xl">
                  {person.name[0]}
                </span>
              </div>
              <h3 className="text-white font-bold text-xl mb-1">{person.name}</h3>
              <p className="text-red-600 text-xs tracking-widest uppercase mb-4">
                {person.role}
              </p>
              <p className="text-[#8a8a8a] text-sm leading-relaxed">
                {person.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="mb-8">
          <p className="text-red-600 text-xs tracking-[0.35em] uppercase mb-4">
            Compromiso
          </p>
          <h2 className="text-white font-bold text-2xl md:text-4xl tracking-tight">
            Nuestros valores
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value) => (
            <div
              key={value.title}
              className="bg-[#111] border border-[#222] p-6 md:p-7 hover:border-red-600/60 transition-colors"
            >
              <h3 className="text-white font-bold text-sm mb-3 tracking-[0.18em] uppercase">
                {value.title}
              </h3>
              <p className="text-[#8a8a8a] text-sm leading-relaxed">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
