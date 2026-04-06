import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Envíos y Entregas | Salva Exclusive Caps",
  description:
    "Consulta la política de envíos y entregas de Salva Exclusive Caps para conocer cobertura, tiempos estimados, costos y condiciones de entrega.",
  keywords: [
    "envíos y entregas",
    "Salva Exclusive Caps",
    "envíos gorras México",
    "entregas gorras premium",
    "política de envíos",
  ],
};

const sections = [
  {
    title: "1. Alcance de la política",
    content: (
      <>
        <p>
          La presente política regula las condiciones generales de entrega y
          envío aplicables a los pedidos atendidos por Salva Exclusive Caps a
          través de su sitio web, WhatsApp, correo electrónico y redes sociales
          oficiales.
        </p>
        <p className="mt-4">
          Toda entrega o envío estará sujeta a confirmación operativa,
          disponibilidad del producto, validación de pago cuando corresponda y
          datos correctos proporcionados por el cliente.
        </p>
      </>
    ),
  },
  {
    title: "2. Cobertura",
    content: (
      <>
        <p>Salva Exclusive Caps podrá ofrecer, según cada caso:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Entregas directas en zonas previamente acordadas</li>
          <li>Envíos nacionales dentro de la República Mexicana</li>
          <li>Envíos internacionales, cuando sea viable y se confirme expresamente</li>
        </ul>
        <p className="mt-4">
          La cobertura exacta dependerá del destino, disponibilidad logística y
          condiciones del pedido.
        </p>
      </>
    ),
  },
  {
    title: "3. Confirmación de disponibilidad",
    content: (
      <>
        <p>
          Todos los productos están sujetos a disponibilidad real al momento de
          la confirmación del pedido.
        </p>
        <p className="mt-4">
          Antes de cerrar una operación, Salva Exclusive Caps confirmará por
          medios oficiales la existencia del modelo solicitado, así como la
          viabilidad de entrega o envío.
        </p>
      </>
    ),
  },
  {
    title: "4. Tiempos estimados",
    content: (
      <>
        <p>
          Los tiempos de entrega y envío son estimados y pueden variar según el
          destino, tipo de producto, volumen operativo, temporada, paquetería o
          causas ajenas a Salva Exclusive Caps.
        </p>
        <p className="mt-4">
          Los tiempos específicos se informarán al cliente al momento de
          confirmar el pedido. Dichos tiempos no constituyen garantía absoluta,
          salvo que se pacte expresamente lo contrario.
        </p>
      </>
    ),
  },
  {
    title: "5. Costos de envío",
    content: (
      <>
        <p>
          Los costos de envío, entrega o servicios logísticos adicionales se
          informarán al cliente antes de la confirmación final del pedido.
        </p>
        <p className="mt-4">
          El costo podrá variar dependiendo del destino, volumen, peso,
          urgencia, paquetería elegida o condiciones especiales de la operación.
        </p>
      </>
    ),
  },
  {
    title: "6. Procesamiento del pedido",
    content: (
      <>
        <p>
          Un pedido podrá considerarse listo para entrega o envío una vez que:
        </p>
        <ol className="mt-4 list-decimal space-y-2 pl-5">
          <li>Se confirme la disponibilidad del producto</li>
          <li>Se validen los datos del cliente</li>
          <li>Se confirme el método de entrega o envío</li>
          <li>Se acredite el pago, cuando aplique</li>
        </ol>
        <p className="mt-4">
          Hasta ese momento comenzará a contarse el plazo operativo estimado.
        </p>
      </>
    ),
  },
  {
    title: "7. Responsabilidad del cliente",
    content: (
      <>
        <p>El cliente es responsable de proporcionar correctamente:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Nombre completo</li>
          <li>Número de contacto</li>
          <li>Domicilio completo de entrega</li>
          <li>Referencias necesarias</li>
          <li>Cualquier dato logístico adicional requerido</li>
        </ul>
        <p className="mt-4">
          Salva Exclusive Caps no será responsable por retrasos, costos
          adicionales, devoluciones o incidencias derivadas de datos incompletos
          o incorrectos proporcionados por el cliente.
        </p>
      </>
    ),
  },
  {
    title: "8. Retrasos y causas ajenas",
    content: (
      <>
        <p>
          Salva Exclusive Caps no será responsable por retrasos atribuibles a
          terceros, incluyendo paqueterías, bloqueos logísticos, condiciones
          climáticas, alta demanda, restricciones operativas, fallas en rutas,
          eventos de fuerza mayor o cualquier situación fuera de su control
          razonable.
        </p>
        <p className="mt-4">
          En estos casos, Salva Exclusive Caps procurará mantener informado al
          cliente sobre el estado general del pedido.
        </p>
      </>
    ),
  },
  {
    title: "9. Entregas no concretadas",
    content: (
      <>
        <p>
          Si una entrega no puede concretarse por ausencia del cliente, error en
          los datos, imposibilidad de acceso o cualquier causa atribuible al
          destinatario, el pedido podrá quedar sujeto a reprogramación, costos
          adicionales o nuevas condiciones logísticas.
        </p>
      </>
    ),
  },
  {
    title: "10. Recepción del pedido",
    content: (
      <>
        <p>
          El cliente deberá revisar razonablemente el estado externo del paquete
          o producto al momento de la entrega.
        </p>
        <p className="mt-4">
          Cualquier incidencia visible deberá reportarse dentro de un tiempo
          razonable por medio de los canales oficiales de Salva Exclusive Caps,
          acompañada, cuando sea posible, de evidencia fotográfica.
        </p>
      </>
    ),
  },
  {
    title: "11. Modificaciones a esta política",
    content: (
      <>
        <p>
          Salva Exclusive Caps podrá actualizar esta política en cualquier
          momento para reflejar cambios operativos, logísticos o comerciales.
        </p>
        <p className="mt-4">
          La versión vigente será la publicada en el sitio web oficial.
        </p>
      </>
    ),
  },
  {
    title: "12. Contacto",
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

export default function EnviosYEntregasPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-zinc-950 via-black to-black">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">
            Información legal
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Envíos y Entregas
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            Consulta las condiciones generales de cobertura, tiempos estimados,
            costos y operación logística de Salva Exclusive Caps.
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
              Salva Exclusive Caps coordina entregas directas, envíos nacionales
              y, en su caso, envíos internacionales para pedidos confirmados por
              sus canales oficiales.
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
