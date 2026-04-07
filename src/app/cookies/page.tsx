import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookies | Salva Exclusive Caps",
  description:
    "Consulta la política de cookies de Salva Exclusive Caps y conoce cómo se utilizan tecnologías de navegación en el sitio web.",
  keywords: [
    "cookies",
    "política de cookies",
    "Salva Exclusive Caps",
    "privacidad web",
    "sitio web gorras premium",
  ],
};

const sections = [
  {
    title: "1. ¿Qué son las cookies?",
    content: (
      <>
        <p>
          Las cookies son archivos o tecnologías similares que pueden
          almacenarse en su dispositivo al visitar un sitio web. Su función es
          ayudar a que el sitio opere correctamente, recordar ciertas
          preferencias y recopilar información general de navegación.
        </p>
      </>
    ),
  },
  {
    title: "2. Uso de cookies en este sitio",
    content: (
      <>
        <p>
          Salva Exclusive Caps puede utilizar cookies, web beacons y tecnologías
          similares para mejorar la experiencia del usuario, facilitar la
          navegación, recordar preferencias y obtener información estadística
          sobre el uso del sitio.
        </p>
      </>
    ),
  },
  {
    title: "3. Tipo de información que puede recopilarse",
    content: (
      <>
        <p>
          A través de estas tecnologías, el sitio puede recopilar información
          como:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Dirección IP</li>
          <li>Tipo de navegador</li>
          <li>Tipo de dispositivo</li>
          <li>Sistema operativo</li>
          <li>Páginas visitadas dentro del sitio</li>
          <li>Tiempo de permanencia</li>
          <li>Interacciones generales de navegación</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Finalidades de uso",
    content: (
      <>
        <p>
          Las tecnologías de navegación podrán utilizarse para fines como:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Mejorar el funcionamiento técnico del sitio</li>
          <li>Optimizar la experiencia del usuario</li>
          <li>Medir tráfico y comportamiento general de navegación</li>
          <li>Detectar fallas técnicas y oportunidades de mejora</li>
          <li>Dar soporte a herramientas de analítica o rendimiento</li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Cookies de terceros",
    content: (
      <>
        <p>
          Algunas tecnologías utilizadas en el sitio pueden provenir de terceros
          que prestan servicios de analítica, rendimiento, alojamiento o soporte
          tecnológico.
        </p>
        <p className="mt-4">
          El tratamiento de la información por parte de dichos terceros estará
          sujeto también a sus propias políticas y condiciones.
        </p>
      </>
    ),
  },
  {
    title: "6. Control de cookies",
    content: (
      <>
        <p>
          Usted puede configurar su navegador para bloquear, limitar o eliminar
          cookies. Sin embargo, algunas funciones del sitio podrían verse
          afectadas si desactiva ciertas tecnologías de navegación.
        </p>
      </>
    ),
  },
  {
    title: "7. Relación con el Aviso de Privacidad",
    content: (
      <>
        <p>
          El uso de cookies y tecnologías similares se relaciona con el
          tratamiento de datos personales conforme al Aviso de Privacidad de
          Salva Exclusive Caps, disponible en este mismo sitio web.
        </p>
      </>
    ),
  },
  {
    title: "8. Cambios a esta política",
    content: (
      <>
        <p>
          Salva Exclusive Caps podrá modificar o actualizar la presente política
          en cualquier momento para reflejar cambios legales, técnicos,
          operativos o de funcionamiento del sitio.
        </p>
        <p className="mt-4">
          La versión vigente será la publicada en el sitio web oficial.
        </p>
      </>
    ),
  },
  {
    title: "9. Contacto",
    content: (
      <ul className="list-disc space-y-2 pl-5">
        <li>
          Correo electrónico:{" "}
          <a
            href="mailto:salvaexclusivecaps@gmail.com"
            className="text-white underline underline-offset-4 transition hover:text-zinc-300"
          >
            salvaexclusivecaps@gmail.com
          </a>
        </li>
        <li>
          WhatsApp:{" "}
          <a
            href="https://wa.me/528335340498"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline underline-offset-4 transition hover:text-zinc-300"
          >
            +52 833 534 0498
          </a>
        </li>
        <li>
          Sitio web:{" "}
          <a
            href="https://salvaexclusivecaps.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white underline underline-offset-4 transition hover:text-zinc-300"
          >
            salvaexclusivecaps.com
          </a>
        </li>
      </ul>
    ),
  },
];

export default function CookiesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-zinc-950 via-black to-black">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">
            Información legal
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Cookies
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            Consulta cómo Salva Exclusive Caps utiliza cookies y tecnologías de
            navegación para mejorar la experiencia del sitio.
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.18em] text-zinc-500">
            Última actualización: 6 de abril de 2026
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-10 sm:px-8 sm:py-14">
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20 backdrop-blur-sm sm:p-8 lg:p-10">
          <div className="mb-10 rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm leading-7 text-zinc-300">
            <p>
              Esta política describe de forma general el uso de cookies, web
              beacons y tecnologías similares en el sitio web de{" "}
              <strong className="text-white">Salva Exclusive Caps</strong>.
            </p>
          </div>

          <div className="space-y-8">
            {sections.map((section) => (
              <article
                key={section.title}
                className="rounded-2xl border border-white/10 bg-black/30 p-5 sm:p-6"
              >
                <h2 className="text-lg font-semibold text-white sm:text-xl">
                  {section.title}
                </h2>
                <div className="mt-4 text-sm leading-7 text-zinc-300 sm:text-base">
                  {section.content}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
