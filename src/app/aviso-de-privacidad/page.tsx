import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Aviso de Privacidad | Salva Exclusive Caps",
    description:
        "Consulta el Aviso de Privacidad de Salva Exclusive Caps y conoce cómo tratamos y protegemos tus datos personales.",
    keywords: [
        "aviso de privacidad",
        "privacidad Salva Exclusive Caps",
        "protección de datos personales",
        "gorras exclusivas México",
    ],
};

const sections = [
    {
        title: "1. Identidad y domicilio de los responsables",
        content: (
            <>
                <p>
                    Para efectos del presente Aviso de Privacidad, los responsables del
                    tratamiento de sus datos personales son:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5">
                    <li>Lehi Salvador Rangel Cárdenas</li>
                    <li>Carlos Sánchez Gutiérrez</li>
                </ul>
                <p className="mt-4">
                    Nombre comercial: <strong className="text-white">Salva Exclusive Caps</strong>
                </p>
                <p className="mt-4">
                    Domicilio para oír y recibir notificaciones:
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
        title: "2. Datos personales que recabamos",
        content: (
            <>
                <p>
                    Salva Exclusive Caps podrá recabar de usted, de manera directa o
                    indirecta, los siguientes datos personales:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5">
                    <li>Nombre completo</li>
                    <li>Número telefónico</li>
                    <li>Correo electrónico</li>
                    <li>Ciudad, estado y país</li>
                    <li>Domicilio de envío</li>
                    <li>Información necesaria para identificar, procesar y entregar pedidos</li>
                    <li>Datos fiscales, en caso de solicitar factura</li>
                    <li>Información relacionada con pagos, pedidos, apartados, compras, entregas, aclaraciones, cambios o devoluciones</li>
                    <li>Mensajes, comentarios, dudas o solicitudes enviadas por medio del sitio web, correo electrónico, redes sociales o WhatsApp</li>
                    <li>Datos de navegación dentro del sitio web, tales como dirección IP, navegador, dispositivo, sistema operativo, secciones visitadas y tiempo de permanencia, cuando aplique</li>
                </ul>
                <p className="mt-4">
                    Salva Exclusive Caps no solicita de forma intencional datos personales
                    sensibles en sus procesos normales de atención y venta.
                </p>
            </>
        ),
    },
    {
        title: "3. Finalidades primarias del tratamiento",
        content: (
            <>
                <p>
                    Sus datos personales serán tratados para las siguientes finalidades
                    primarias, necesarias para brindarle atención, productos y servicios:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5">
                    <li>Identificarle y contactarle</li>
                    <li>Atender solicitudes de información, cotizaciones o consultas</li>
                    <li>Gestionar pedidos, apartados, compras, pagos, entregas y envíos</li>
                    <li>Confirmar operaciones realizadas</li>
                    <li>Dar seguimiento a pedidos y atención postventa</li>
                    <li>Atender aclaraciones, cambios, devoluciones o incidencias</li>
                    <li>Emitir facturas o comprobantes, cuando corresponda</li>
                    <li>Llevar control administrativo y comercial interno</li>
                    <li>Cumplir obligaciones legales o contractuales aplicables</li>
                </ul>
            </>
        ),
    },
    {
        title: "4. Finalidades secundarias",
        content: (
            <>
                <p>
                    Adicionalmente, sus datos personales podrán ser utilizados para las
                    siguientes finalidades secundarias:
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5">
                    <li>Envío de promociones, novedades, lanzamientos y contenido comercial</li>
                    <li>Seguimiento comercial de clientes y prospectos</li>
                    <li>Encuestas de satisfacción</li>
                    <li>Mejora de productos, servicios, procesos de atención y experiencia del usuario</li>
                    <li>Análisis estadístico y funcionamiento del sitio web y redes sociales</li>
                </ul>
                <p className="mt-4">
                    En caso de que no desee que sus datos personales sean tratados para
                    estas finalidades secundarias, podrá solicitarlo enviando un correo a{" "}
                    <a
                        href="mailto:salvaexclusivecaps@gmail.com"
                        className="text-white underline underline-offset-4 transition hover:text-zinc-300"
                    >
                        salvaexclusivecaps@gmail.com
                    </a>
                    .
                </p>
            </>
        ),
    },
    {
        title: "5. Opciones y medios para limitar el uso o divulgación de sus datos",
        content: (
            <p>
                Usted podrá limitar el uso o divulgación de sus datos personales
                enviando una solicitud al correo electrónico{" "}
                <a
                    href="mailto:salvaexclusivecaps@gmail.com"
                    className="text-white underline underline-offset-4 transition hover:text-zinc-300"
                >
                    salvaexclusivecaps@gmail.com
                </a>
                , señalando su nombre completo, medio de contacto y la limitación
                solicitada.
            </p>
        ),
    },
    {
        title: "6. Derechos ARCO",
        content: (
            <>
                <p>Usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales.</p>
                <p className="mt-4">
                    Para ejercer cualquiera de sus derechos ARCO, deberá enviar una
                    solicitud al correo{" "}
                    <a
                        href="mailto:salvaexclusivecaps@gmail.com"
                        className="text-white underline underline-offset-4 transition hover:text-zinc-300"
                    >
                        salvaexclusivecaps@gmail.com
                    </a>
                    .
                </p>
            </>
        ),
    },
    {
        title: "7. Revocación del consentimiento",
        content: (
            <p>
                Usted podrá revocar en cualquier momento el consentimiento que haya
                otorgado para el tratamiento de sus datos personales, enviando su
                solicitud al correo{" "}
                <a
                    href="mailto:salvaexclusivecaps@gmail.com"
                    className="text-white underline underline-offset-4 transition hover:text-zinc-300"
                >
                    salvaexclusivecaps@gmail.com
                </a>
                .
            </p>
        ),
    },
    {
        title: "8. Transferencia de datos personales",
        content: (
            <>
                <p>
                    Salva Exclusive Caps podrá compartir sus datos personales únicamente
                    cuando sea necesario para cumplir con las finalidades descritas en el
                    presente aviso.
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5">
                    <li>Empresas de mensajería y paquetería</li>
                    <li>Proveedores de alojamiento web y soporte tecnológico</li>
                    <li>Plataformas de pago o intermediarios de cobro</li>
                    <li>Proveedores de facturación</li>
                    <li>Herramientas tecnológicas de analítica, administración o comunicación</li>
                </ul>
            </>
        ),
    },
    {
        title: "9. Uso de cookies y tecnologías de rastreo",
        content: (
            <p>
                El sitio web de Salva Exclusive Caps podrá utilizar cookies, web
                beacons o tecnologías similares para mejorar la experiencia del usuario,
                facilitar la navegación, recordar preferencias y recopilar información
                estadística sobre el uso del sitio.
            </p>
        ),
    },
    {
        title: "10. Medidas de seguridad",
        content: (
            <p>
                Salva Exclusive Caps adopta medidas administrativas, técnicas y físicas
                razonables para proteger sus datos personales contra daño, pérdida,
                alteración, destrucción, acceso no autorizado o uso indebido.
            </p>
        ),
    },
    {
        title: "11. Cambios al aviso de privacidad",
        content: (
            <p>
                Salva Exclusive Caps se reserva el derecho de modificar, actualizar o
                ajustar el presente Aviso de Privacidad en cualquier momento. Cualquier
                modificación será publicada en el sitio web oficial{" "}
                <a
                    href="https://salvaexclusivecaps.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white underline underline-offset-4 transition hover:text-zinc-300"
                >
                    salvaexclusivecaps.com
                </a>
                .
            </p>
        ),
    },
    {
        title: "12. Consentimiento",
        content: (
            <p>
                Al proporcionar sus datos personales por cualquier medio, ya sea a
                través del sitio web, correo electrónico, redes sociales, WhatsApp,
                formularios o cualquier otro canal de contacto oficial de Salva
                Exclusive Caps, usted reconoce que ha leído, entendido y aceptado el
                presente Aviso de Privacidad.
            </p>
        ),
    },
];

export default function AvisoDePrivacidadPage() {
    return (
        <main className="min-h-screen bg-black text-white">
            <section className="border-b border-white/10 bg-gradient-to-b from-zinc-950 via-black to-black">
                <div className="mx-auto max-w-5xl px-6 py-16 sm:px-8 sm:py-20">
                    <p className="text-xs font-medium uppercase tracking-[0.28em] text-zinc-500">
                        Información legal
                    </p>
                    <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
                        Aviso de Privacidad
                    </h1>
                    <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                        Conoce cómo Salva Exclusive Caps recopila, utiliza y protege tus
                        datos personales en sus canales digitales, comerciales y de
                        atención.
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
                            En cumplimiento con la Ley Federal de Protección de Datos
                            Personales en Posesión de los Particulares y demás disposiciones
                            aplicables, <strong className="text-white">Salva Exclusive Caps</strong>{" "}
                            pone a disposición de sus clientes, prospectos, usuarios del sitio
                            web y público en general el presente Aviso de Privacidad Integral.
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