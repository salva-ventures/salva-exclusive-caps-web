import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Mayoreo | Salva Exclusive Caps",
  description:
    "Compra gorras al mayoreo con Salva Exclusive Caps. Atención para tiendas, revendedores, boutiques, emprendedores, marcas y negocios que buscan modelos exclusivos con atención personalizada.",
  keywords: [
    "gorras al mayoreo",
    "mayoreo gorras México",
    "proveedor de gorras",
    "gorras para revender",
    "distribuidor de gorras",
    "compra por volumen",
    "Salva Exclusive Caps mayoreo",
  ],
};

const profiles = [
  "Tiendas",
  "Revendedores",
  "Boutiques",
  "Emprendedores",
  "Marcas",
  "Negocios físicos",
  "Negocios digitales",
];

const benefits = [
  "Atención personalizada",
  "Compra por volumen",
  "Envío nacional",
  "Envío internacional",
  "Cotización directa por WhatsApp",
  "Selección de modelos según tu negocio",
  "Posibilidad de surtido variado",
];

const conditions = [
  "Disponibilidad sujeta a confirmación al momento de la solicitud.",
  "Cada atención de mayoreo se revisa de forma personalizada según volumen, destino y modelos de interés.",
  "Los costos y condiciones pueden variar de acuerdo con la solicitud específica.",
  "La cobertura puede incluir entregas locales y envíos nacionales o internacionales.",
];

const requestItems = [
  "Nombre",
  "Ciudad",
  "Negocio, tienda o proyecto",
  "Cantidad aproximada que buscas",
  "Tipo de modelos que te interesan",
  "Tiempo estimado de compra",
];

export default function MayoreoPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-zinc-950 via-black to-black">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">
            Canal comercial
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Mayoreo para tiendas, revendedores y negocios
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            Si buscas que Salva Exclusive Caps sea tu proveedor, podemos atender
            solicitudes de compra por volumen con enfoque personalizado,
            selección de modelos y seguimiento directo por WhatsApp.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10 sm:px-8 sm:py-14">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm leading-7 text-zinc-300">
            <p>
              Esta sección está pensada para personas y negocios que quieren
              comprar varias piezas con atención más directa, evaluar opciones
              de volumen y revisar disponibilidad real según sus necesidades.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                ¿Para quién es?
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-300 sm:text-base">
                {profiles.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                Qué ofrecemos
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-300 sm:text-base">
                {benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-white sm:text-xl">
              Condiciones generales
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-300 sm:text-base">
              {conditions.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                Qué conviene enviarnos
              </h2>
              <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-base">
                Para atenderte mejor, compártenos por WhatsApp:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-300 sm:text-base">
                {requestItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                Enfoque de atención
              </h2>
              <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-base">
                No manejamos una promesa rígida o genérica para todos los casos.
                Cada solicitud de mayoreo se atiende de forma individual para
                orientar mejor la compra, confirmar disponibilidad y definir la
                opción más conveniente según el perfil del negocio.
              </p>
            </article>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/528335340498?text=Hola,%20quiero%20cotizar%20mayoreo%20con%20Salva%20Exclusive%20Caps."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-red-600 bg-red-600 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-red-700"
            >
              Cotizar mayoreo por WhatsApp
            </a>

            <Link
              href="/catalogo"
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
            >
              Ver catálogo
            </Link>

            <Link
              href="/contacto"
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
            >
              Contacto
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
