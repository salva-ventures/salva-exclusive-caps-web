import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Colaboraciones | Salva Exclusive Caps",
  description:
    "Colabora con Salva Exclusive Caps. Buscamos fotógrafos, modelos, creadores de contenido e influencers alineados con una estética premium, auténtica y visualmente sólida.",
  keywords: [
    "colaboraciones",
    "Salva Exclusive Caps",
    "fotógrafos",
    "modelos",
    "influencers",
    "creadores de contenido",
    "colaboraciones de marca",
  ],
};

const profiles = [
  "Fotógrafos",
  "Modelos",
  "Creadores de contenido",
  "Influencers",
  "Videógrafos",
  "Perfiles con propuesta visual alineada a la marca",
];

const collaborationTypes = [
  "Sesiones fotográficas",
  "Contenido para redes sociales",
  "Contenido para sitio web",
  "Campañas con producto",
  "Colaboraciones pagadas o por propuesta específica",
];

const values = [
  "Imagen cuidada",
  "Buena presentación",
  "Estilo auténtico",
  "Responsabilidad",
  "Comunicación clara",
  "Afinidad con la estética de la marca",
];

const applicationItems = [
  "Nombre",
  "Ciudad",
  "Perfil o portafolio",
  "Tipo de colaboración que propones",
  "Redes sociales o trabajo previo",
];

export default function ColaboracionesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-zinc-950 via-black to-black">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">
            Marca y comunidad
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Colabora con Salva Exclusive Caps
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            Buscamos fotógrafos, modelos, influencers y creadores de contenido
            que conecten con una estética premium, auténtica y visualmente
            sólida.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10 sm:px-8 sm:py-14">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm leading-7 text-zinc-300">
            <p>
              En Salva Exclusive Caps nos interesa colaborar con personas que
              aporten presencia, calidad visual y una propuesta auténtica. Si tu
              perfil conecta con la identidad de la marca, queremos conocerte.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                Perfiles que buscamos
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-300 sm:text-base">
                {profiles.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                Tipos de colaboración
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-300 sm:text-base">
                {collaborationTypes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <article className="rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                Qué valoramos
              </h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-300 sm:text-base">
                {values.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>

            <article className="rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                Cómo aplicar
              </h2>
              <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-base">
                Envíanos por WhatsApp o Instagram:
              </p>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-zinc-300 sm:text-base">
                {applicationItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>

          <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-white sm:text-xl">
              Proceso de revisión
            </h2>
            <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-base">
              Cada colaboración se revisa de forma individual y, en caso de
              avanzar, se formaliza por los canales oficiales de Salva Exclusive
              Caps.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="https://wa.me/528335340498"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-red-600 bg-red-600 px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-red-700"
            >
              WhatsApp
            </a>

            <a
              href="https://instagram.com/salvaexclusive.caps"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-6 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08]"
            >
              Instagram
            </a>

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
