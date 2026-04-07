import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cambios y Devoluciones | Salva Exclusive Caps",
  description:
    "Consulta la política de cambios y devoluciones de Salva Exclusive Caps para conocer condiciones, plazos y proceso de atención.",
  keywords: [
    "cambios y devoluciones",
    "Salva Exclusive Caps",
    "politica de cambios",
    "devoluciones gorras",
    "gorras premium México",
  ],
};

const sections = [
  {
    title: "1. Alcance de la política",
    content: (
      <>
        <p>
          La presente política regula las condiciones generales aplicables a
          solicitudes de cambios, devoluciones y reportes relacionados con
          productos adquiridos a través de los canales oficiales de Salva
          Exclusive Caps.
        </p>
        <p className="mt-4">
          Cada caso será revisado con base en el estado del producto, el motivo
          reportado, el tiempo transcurrido desde la entrega y la información
          proporcionada por el cliente.
        </p>
      </>
    ),
  },
  {
    title: "2. Condiciones generales",
    content: (
      <>
        <p>
          Para que una solicitud pueda ser evaluada, el cliente deberá haber
          realizado su compra por un canal oficial de Salva Exclusive Caps y
          proporcionar información suficiente para identificar la operación.
        </p>
        <p className="mt-4">
          Salva Exclusive Caps podrá solicitar evidencia fotográfica, video,
          nombre del modelo, fecha aproximada de compra y cualquier otro dato
          razonablemente necesario para revisar el caso.
        </p>
      </>
    ),
  },
  {
    title: "3. Casos sujetos a revisión",
    content: (
      <>
        <p>Podrán revisarse, entre otros, los siguientes supuestos:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Producto recibido con daño visible atribuible al traslado o entrega</li>
          <li>Producto distinto al confirmado en el pedido</li>
          <li>Error atribuible a la preparación del pedido</li>
          <li>Incidencias de calidad reportadas dentro de un tiempo razonable</li>
        </ul>
      </>
    ),
  },
  {
    title: "4. Casos no aplicables",
    content: (
      <>
        <p>En términos generales, no procederán solicitudes cuando:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>El producto presente uso evidente, maltrato o alteraciones posteriores a la entrega</li>
          <li>Existan daños derivados de manejo inadecuado por parte del cliente o de terceros</li>
          <li>La solicitud no pueda vincularse razonablemente con una compra realizada por canales oficiales</li>
          <li>El cliente no proporcione información suficiente para revisar el caso</li>
        </ul>
      </>
    ),
  },
  {
    title: "5. Plazo de reporte",
    content: (
      <>
        <p>
          Cualquier incidencia deberá reportarse dentro de un plazo razonable
          después de la recepción del producto.
        </p>
        <p className="mt-4">
          Para facilitar la revisión, se recomienda que el cliente contacte a
          Salva Exclusive Caps tan pronto detecte la situación.
        </p>
      </>
    ),
  },
  {
    title: "6. Proceso de atención",
    content: (
      <>
        <p>El proceso general podrá incluir:</p>
        <ol className="mt-4 list-decimal space-y-2 pl-5">
          <li>Recepción del reporte por canal oficial</li>
          <li>Solicitud de información y evidencia</li>
          <li>Revisión interna del caso</li>
          <li>Determinación de procedencia o improcedencia</li>
          <li>Definición de solución aplicable, cuando corresponda</li>
        </ol>
      </>
    ),
  },
  {
    title: "7. Soluciones posibles",
    content: (
      <>
        <p>Si la solicitud resulta procedente, Salva Exclusive Caps podrá ofrecer, según el caso:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Cambio por otro producto disponible</li>
          <li>Reposición del producto</li>
          <li>Ajuste acordado con el cliente</li>
          <li>Otra solución comercial razonable conforme al caso concreto</li>
        </ul>
      </>
    ),
  },
  {
    title: "8. Costos logísticos",
    content: (
      <>
        <p>
          Cuando una solicitud procedente derive de un error atribuible a Salva
          Exclusive Caps, se evaluará la forma de resolver el caso sin imponer
          cargas indebidas al cliente.
        </p>
        <p className="mt-4">
          Cuando la incidencia no sea atribuible a Salva Exclusive Caps, cualquier
          costo logístico adicional podrá quedar sujeto a revisión y acuerdo con
          el cliente.
        </p>
      </>
    ),
  },
  {
    title: "9. Productos sujetos a disponibilidad",
    content: (
      <>
        <p>
          Todo cambio o reposición estará sujeto a disponibilidad real del modelo
          o de alternativas razonables al momento de resolver la solicitud.
        </p>
      </>
    ),
  },
  {
    title: "10. Modificaciones a esta política",
    content: (
      <>
        <p>
          Salva Exclusive Caps podrá actualizar esta política en cualquier
          momento para reflejar cambios operativos, comerciales o logísticos.
        </p>
        <p className="mt-4">
          La versión vigente será la publicada en el sitio web oficial.
        </p>
      </>
    ),
  },
  {
    title: "11. Contacto",
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

export default function CambiosYDevolucionesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-zinc-950 via-black to-black">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">
            Información legal
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Cambios y Devoluciones
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            Consulta las condiciones generales para reportar incidencias y
            solicitar revisión de cambios o devoluciones en Salva Exclusive Caps.
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
              Esta política describe las condiciones generales bajo las cuales
              Salva Exclusive Caps revisa solicitudes relacionadas con cambios,
              devoluciones e incidencias reportadas por clientes a través de sus
              canales oficiales.
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
