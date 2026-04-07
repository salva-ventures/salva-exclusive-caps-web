import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Métodos de Pago | Salva Exclusive Caps",
  description:
    "Consulta los métodos de pago de Salva Exclusive Caps y conoce cómo se confirma una compra, validación de pago y condiciones generales.",
  keywords: [
    "métodos de pago",
    "Salva Exclusive Caps",
    "pagos gorras premium",
    "transferencia bancaria",
    "politica de pago",
  ],
};

const sections = [
  {
    title: "1. Alcance de esta política",
    content: (
      <>
        <p>
          La presente política describe las condiciones generales aplicables a
          los métodos de pago aceptados por Salva Exclusive Caps en operaciones
          atendidas por sus canales oficiales.
        </p>
        <p className="mt-4">
          Toda operación estará sujeta a confirmación de disponibilidad,
          validación de datos y acreditación del pago cuando corresponda.
        </p>
      </>
    ),
  },
  {
    title: "2. Canales oficiales de atención",
    content: (
      <>
        <p>
          Salva Exclusive Caps podrá atender solicitudes y confirmar operaciones
          a través de medios oficiales como:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Sitio web</li>
          <li>WhatsApp</li>
          <li>Correo electrónico</li>
          <li>Redes sociales oficiales</li>
        </ul>
        <p className="mt-4">
          Los datos de pago válidos serán proporcionados únicamente por estos
          canales oficiales.
        </p>
      </>
    ),
  },
  {
    title: "3. Métodos de pago disponibles",
    content: (
      <>
        <p>
          Los métodos de pago disponibles serán informados al cliente al momento
          de confirmar la operación.
        </p>
        <p className="mt-4">
          Dependiendo del caso, Salva Exclusive Caps podrá aceptar transferencia
          bancaria, depósito, pago en efectivo en condiciones previamente
          acordadas u otros métodos que se habiliten formalmente.
        </p>
      </>
    ),
  },
  {
    title: "4. Confirmación del pedido",
    content: (
      <>
        <p>
          La solicitud de un producto no implica por sí misma la aceptación
          definitiva de la compra.
        </p>
        <p className="mt-4">
          Un pedido podrá considerarse formalmente confirmado una vez que Salva
          Exclusive Caps valide la disponibilidad del producto, confirme las
          condiciones de la operación y, en su caso, acredite el pago
          correspondiente.
        </p>
      </>
    ),
  },
  {
    title: "5. Validación de pago",
    content: (
      <>
        <p>
          Cuando el pago se realice por transferencia, depósito u otro medio
          sujeto a comprobación, la operación podrá quedar en revisión hasta que
          el pago sea efectivamente acreditado.
        </p>
        <p className="mt-4">
          El envío de un comprobante no sustituye por sí mismo la confirmación
          final de acreditación.
        </p>
      </>
    ),
  },
  {
    title: "6. Referencia y datos correctos",
    content: (
      <>
        <p>
          El cliente es responsable de verificar que los datos de pago
          correspondan a los proporcionados por canales oficiales y de seguir
          correctamente las instrucciones de pago aplicables a su pedido.
        </p>
        <p className="mt-4">
          Salva Exclusive Caps no será responsable por pagos realizados a datos
          incorrectos cuando éstos no hayan sido confirmados por canales
          oficiales o cuando el cliente no siga las instrucciones proporcionadas.
        </p>
      </>
    ),
  },
  {
    title: "7. Errores, aclaraciones y revisión",
    content: (
      <>
        <p>
          Si el cliente detecta un error relacionado con su pago o necesita una
          aclaración, deberá contactar a Salva Exclusive Caps por un canal
          oficial dentro de un tiempo razonable, proporcionando la información
          necesaria para revisar el caso.
        </p>
      </>
    ),
  },
  {
    title: "8. Cambios en métodos de pago",
    content: (
      <>
        <p>
          Salva Exclusive Caps podrá habilitar, suspender, modificar o retirar
          métodos de pago en cualquier momento conforme a sus necesidades
          operativas, comerciales o tecnológicas.
        </p>
        <p className="mt-4">
          La información vigente será la comunicada al cliente al momento de la
          confirmación de su pedido.
        </p>
      </>
    ),
  },
  {
    title: "9. Facturación",
    content: (
      <>
        <p>
          En caso de requerir factura, el cliente deberá solicitarla por los
          medios oficiales proporcionando los datos fiscales aplicables dentro
          del plazo que se le indique al momento de la operación.
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
          momento para reflejar cambios operativos, comerciales, fiscales o
          tecnológicos.
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

export default function MetodosDePagoPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-zinc-950 via-black to-black">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">
            Información legal
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Métodos de Pago
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            Consulta las condiciones generales de pago, validación y confirmación
            de operaciones en Salva Exclusive Caps.
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
              Salva Exclusive Caps informa, recibe, valida y confirma pagos
              relacionados con operaciones atendidas por sus canales oficiales.
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
