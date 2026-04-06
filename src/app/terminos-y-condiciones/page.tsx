import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Salva Exclusive Caps",
  description:
    "Consulta los Términos y Condiciones de Salva Exclusive Caps para conocer el uso del sitio, proceso de compra, disponibilidad, pagos y entregas.",
  keywords: [
    "términos y condiciones",
    "Salva Exclusive Caps",
    "compra de gorras",
    "políticas de compra",
    "gorras premium México",
  ],
};

const sections = [
  {
    title: "1. Identidad del proveedor",
    content: (
      <>
        <p>
          Para efectos de los presentes Términos y Condiciones, el proveedor y
          responsable de la operación comercial es:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Lehi Salvador Rangel Cárdenas</li>
          <li>Carlos Sánchez Gutiérrez</li>
        </ul>
        <p className="mt-4">
          Nombre comercial:{" "}
          <strong className="text-white">Salva Exclusive Caps</strong>
        </p>
        <p className="mt-4">
          Domicilio de contacto:
          <br />
          Indelpro 309, Corredor Industrial, 89603 Miramar, Tamaulipas, México
        </p>
        <div className="mt-4 space-y-2">
          <p>
            Correo electrónico:{" "}
            <a
              href="mailto:salvaexclusivecaps@gmail.com"
              className="text-white underline underline-offset-4 transition hover:text-zinc-300"
            >
              salvaexclusivecaps@gmail.com
            </a>
          </p>
          <p>
            Teléfono / WhatsApp:{" "}
            <a
              href="https://wa.me/528335340498"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-4 transition hover:text-zinc-300"
            >
              +52 833 534 0498
            </a>
          </p>
          <p>
            Sitio web:{" "}
            <a
              href="https://salvaexclusivecaps.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white underline underline-offset-4 transition hover:text-zinc-300"
            >
              salvaexclusivecaps.com
            </a>
          </p>
        </div>
      </>
    ),
  },
  {
    title: "2. Objeto del sitio",
    content: (
      <>
        <p>
          El sitio web de Salva Exclusive Caps tiene como finalidad mostrar
          información de la marca, catálogo de productos, disponibilidad
          general, medios de contacto y contenido comercial relacionado con la
          venta de gorras y productos afines.
        </p>
        <p className="mt-4">
          La información publicada en el sitio tiene fines informativos y
          comerciales. El envío de una consulta, solicitud o mensaje no
          garantiza por sí mismo la existencia de una operación de compraventa,
          la cual quedará sujeta a confirmación expresa por parte de Salva
          Exclusive Caps.
        </p>
      </>
    ),
  },
  {
    title: "3. Uso del sitio",
    content: (
      <>
        <p>
          El usuario se obliga a utilizar este sitio de forma lícita,
          responsable y conforme a la buena fe.
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Utilizar el sitio para fines ilícitos o fraudulentos</li>
          <li>Intentar interferir en su funcionamiento</li>
          <li>Extraer, copiar o reutilizar contenido del sitio sin autorización</li>
          <li>Suplantar identidades o proporcionar información falsa</li>
          <li>
            Realizar actos que puedan dañar la imagen, operación o seguridad de
            Salva Exclusive Caps o de terceros
          </li>
        </ul>
        <p className="mt-4">
          Salva Exclusive Caps podrá restringir o suspender el acceso al sitio
          cuando detecte un uso indebido.
        </p>
      </>
    ),
  },
  {
    title: "4. Productos y disponibilidad",
    content: (
      <>
        <p>
          Los productos publicados en el sitio están sujetos a disponibilidad
          real al momento de la confirmación del pedido. La exhibición de un
          producto en el catálogo no constituye garantía automática de
          existencia inmediata.
        </p>
        <p className="mt-4">
          Debido a la naturaleza del inventario, la disponibilidad final de cada
          modelo será confirmada directamente por WhatsApp o por alguno de los
          medios oficiales de contacto antes del cierre definitivo del pedido.
        </p>
        <p className="mt-4">
          Salva Exclusive Caps podrá actualizar, modificar, reemplazar o retirar
          productos del catálogo sin previo aviso.
        </p>
      </>
    ),
  },
  {
    title: "5. Precios",
    content: (
      <>
        <p>
          Los precios mostrados en el sitio, publicaciones o mensajes oficiales
          podrán estar expresados en pesos mexicanos (MXN), salvo que se indique
          otra cosa.
        </p>
        <p className="mt-4">
          Todos los precios, promociones, condiciones de venta, costos
          adicionales, disponibilidad y modalidades de entrega estarán sujetos a
          confirmación al momento de la atención directa y cierre del pedido.
          Salva Exclusive Caps procurará mantener la información actualizada; sin
          embargo, podrá corregir errores evidentes de captura, publicación,
          disponibilidad o configuración.
        </p>
      </>
    ),
  },
  {
    title: "6. Proceso de compra",
    content: (
      <>
        <p>
          Actualmente, Salva Exclusive Caps puede atender solicitudes y
          operaciones a través de medios directos como:
        </p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Sitio web</li>
          <li>WhatsApp</li>
          <li>Correo electrónico</li>
          <li>Redes sociales oficiales</li>
        </ul>
        <p className="mt-4">El proceso de compra podrá incluir:</p>
        <ol className="mt-4 list-decimal space-y-2 pl-5">
          <li>Selección o consulta del producto</li>
          <li>Confirmación de disponibilidad</li>
          <li>Confirmación de precio y condiciones aplicables</li>
          <li>Confirmación del método de pago</li>
          <li>Validación del pago, cuando aplique</li>
          <li>Coordinación de entrega o envío</li>
        </ol>
        <p className="mt-4">
          La compra se considerará formalmente aceptada cuando Salva Exclusive
          Caps confirme expresamente la operación y, en su caso, el pago
          correspondiente.
        </p>
      </>
    ),
  },
  {
    title: "7. Formas de pago",
    content: (
      <>
        <p>
          Las formas de pago disponibles serán informadas al cliente al momento
          de la atención o confirmación del pedido.
        </p>
        <p className="mt-4">
          Salva Exclusive Caps se reserva el derecho de habilitar, deshabilitar
          o modificar en cualquier momento los métodos de pago aceptados.
        </p>
        <p className="mt-4">
          Cuando el pago se realice por transferencia, depósito u otro medio
          sujeto a validación, el pedido podrá considerarse confirmado hasta que
          el pago haya sido efectivamente acreditado.
        </p>
      </>
    ),
  },
  {
    title: "8. Entregas y envíos",
    content: (
      <>
        <p>
          Las entregas y envíos estarán sujetos a cobertura, disponibilidad
          logística, costos aplicables, tiempos estimados y confirmación
          operativa.
        </p>
        <p className="mt-4">Salva Exclusive Caps podrá ofrecer:</p>
        <ul className="mt-4 list-disc space-y-2 pl-5">
          <li>Entregas directas en zonas determinadas</li>
          <li>Envíos nacionales dentro de la República Mexicana</li>
          <li>
            Envíos internacionales, cuando resulte posible y se acuerde
            expresamente con el cliente
          </li>
        </ul>
        <p className="mt-4">
          Los tiempos de entrega y envío son estimados y pueden variar por
          causas ajenas a Salva Exclusive Caps, incluyendo retrasos logísticos,
          alta demanda, errores en datos proporcionados por el cliente, causas
          de fuerza mayor o hechos atribuibles a terceros.
        </p>
        <p className="mt-4">
          El cliente es responsable de proporcionar correctamente sus datos de
          contacto y entrega.
        </p>
      </>
    ),
  },
  {
    title: "9. Apartados y reservas",
    content: (
      <>
        <p>
          Cuando Salva Exclusive Caps ofrezca apartados o reservas, éstos
          estarán sujetos a condiciones específicas que serán informadas al
          cliente en cada caso, incluyendo monto, plazo, vigencia y
          consecuencias por falta de pago o falta de confirmación.
        </p>
        <p className="mt-4">
          Salva Exclusive Caps podrá cancelar apartados o reservas cuando no se
          cumplan las condiciones informadas al cliente dentro del plazo
          indicado.
        </p>
      </>
    ),
  },
  {
    title: "10. Cambios, devoluciones y cancelaciones",
    content: (
      <>
        <p>
          Las políticas de cambios, devoluciones y cancelaciones se regirán por
          la página o política específica que Salva Exclusive Caps publique para
          tal efecto.
        </p>
        <p className="mt-4">
          En tanto dicha política se publica o actualiza, cualquier solicitud
          será revisada caso por caso, considerando el estado del producto, el
          motivo reportado, el tiempo transcurrido y las condiciones informadas
          al momento de la venta.
        </p>
      </>
    ),
  },
  {
    title: "11. Promociones y publicaciones",
    content: (
      <>
        <p>
          Las promociones, descuentos, dinámicas o publicaciones especiales
          estarán sujetas a su vigencia, disponibilidad, cobertura y condiciones
          específicas.
        </p>
        <p className="mt-4">
          Salva Exclusive Caps podrá modificar o retirar promociones cuando
          exista causa justificada, error evidente, agotamiento de existencias o
          terminación de vigencia, siempre respetando las condiciones ya
          confirmadas con el consumidor en operaciones concretas.
        </p>
      </>
    ),
  },
  {
    title: "12. Propiedad intelectual",
    content: (
      <p>
        Todos los elementos del sitio, incluyendo de manera enunciativa mas no
        limitativa textos, diseños, imágenes, logotipos, gráficos, nombres
        comerciales, marcas, fotografías, videos, composiciones visuales y
        contenido digital, son propiedad de Salva Exclusive Caps o se utilizan
        con autorización de sus titulares. Queda prohibida su reproducción,
        distribución, modificación, comunicación pública o explotación sin
        autorización previa y por escrito.
      </p>
    ),
  },
  {
    title: "13. Enlaces a terceros",
    content: (
      <>
        <p>
          El sitio podrá contener enlaces a plataformas o servicios de terceros,
          incluyendo redes sociales o servicios de mensajería.
        </p>
        <p className="mt-4">
          Salva Exclusive Caps no es responsable por el contenido, políticas,
          disponibilidad o funcionamiento de dichos servicios externos.
        </p>
        <p className="mt-4">
          El acceso a plataformas de terceros será responsabilidad del usuario.
        </p>
      </>
    ),
  },
  {
    title: "14. Protección de datos personales",
    content: (
      <p>
        El tratamiento de datos personales se rige por el Aviso de Privacidad de
        Salva Exclusive Caps, disponible en el sitio web. Al utilizar el sitio o
        contactar a Salva Exclusive Caps, el usuario reconoce haber tenido
        acceso a dicho aviso.
      </p>
    ),
  },
  {
    title: "15. Exactitud de la información",
    content: (
      <>
        <p>
          Salva Exclusive Caps procura que la información del sitio sea clara y
          actualizada. Sin embargo, podrá existir algún error involuntario en
          descripciones, fotografías, precios, disponibilidad, textos o datos
          técnicos.
        </p>
        <p className="mt-4">
          Salva Exclusive Caps podrá corregir en cualquier momento errores
          evidentes de publicación, sin que ello implique obligación de sostener
          información manifiestamente incorrecta no confirmada en una operación
          concreta.
        </p>
      </>
    ),
  },
  {
    title: "16. Limitación de responsabilidad",
    content: (
      <>
        <p>
          Salva Exclusive Caps no garantiza que el sitio esté libre de
          interrupciones, errores técnicos, fallas temporales o eventos fuera de
          su control.
        </p>
        <p className="mt-4">
          En la máxima medida permitida por la ley, Salva Exclusive Caps no será
          responsable por daños indirectos, incidentales o consecuenciales
          derivados del uso del sitio, salvo cuando la legislación aplicable
          disponga lo contrario.
        </p>
      </>
    ),
  },
  {
    title: "17. Modificaciones a los términos",
    content: (
      <>
        <p>
          Salva Exclusive Caps podrá modificar, actualizar o ajustar los
          presentes Términos y Condiciones en cualquier momento.
        </p>
        <p className="mt-4">
          Las modificaciones entrarán en vigor una vez publicadas en el sitio
          web. Es responsabilidad del usuario revisar periódicamente esta
          sección.
        </p>
      </>
    ),
  },
  {
    title: "18. Legislación aplicable",
    content: (
      <p>
        Estos Términos y Condiciones se interpretarán conforme a las leyes
        aplicables en los Estados Unidos Mexicanos. Cualquier controversia
        derivada de la relación de consumo estará sujeta a la legislación
        mexicana aplicable y a las autoridades competentes.
      </p>
    ),
  },
  {
    title: "19. Contacto",
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

export default function TerminosYCondicionesPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-white/10 bg-gradient-to-b from-zinc-950 via-black to-black">
        <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">
            Información legal
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
            Términos y Condiciones
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            Consulta las condiciones de uso del sitio, disponibilidad,
            confirmación de pedidos, pagos, entregas y operación comercial de
            Salva Exclusive Caps.
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
              Bienvenido a{" "}
              <strong className="text-white">Salva Exclusive Caps</strong>. Al
              acceder, navegar o utilizar este sitio web, así como al
              contactarnos o realizar solicitudes, apartados o compras a través
              de nuestros canales oficiales, usted acepta los presentes
              Términos y Condiciones.
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
