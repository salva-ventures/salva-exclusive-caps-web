import { DELIVERY_INFO, CONTACT } from "@/config/brand";

export default function DisponibilidadPage() {
  const waLink = `https://wa.me/${CONTACT.whatsapp.number.replace(
    /\+/g,
    ""
  )}?text=${encodeURIComponent(
    "Hola, tengo una pregunta sobre disponibilidad y envíos."
  )}`;

  return (
    <div className="bg-black min-h-screen">
      <section className="relative border-b border-[#222] bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.18),transparent_40%)]" />
        <div className="relative max-w-6xl mx-auto px-4 py-20 md:py-24">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-4">
            Envíos
          </p>
          <h1 className="text-white font-bold text-4xl md:text-6xl tracking-tight max-w-3xl">
            Disponibilidad y entregas
          </h1>
          <p className="text-[#9a9a9a] text-base md:text-lg leading-relaxed mt-6 max-w-3xl">
            Coordinamos entregas inmediatas en ciudades seleccionadas y envíos
            nacionales e internacionales con atención directa por WhatsApp.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <span className="border border-[#2a2a2a] bg-[#111] text-[#cfcfcf] text-xs tracking-widest uppercase px-4 py-2">
              Entrega inmediata
            </span>
            <span className="border border-[#2a2a2a] bg-[#111] text-[#cfcfcf] text-xs tracking-widest uppercase px-4 py-2">
              Cobertura nacional
            </span>
            <span className="border border-[#2a2a2a] bg-[#111] text-[#cfcfcf] text-xs tracking-widest uppercase px-4 py-2">
              Envíos internacionales
            </span>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_1fr] gap-6">
          <div className="bg-[#111] border border-[#222] p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-red-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">1</span>
              </div>
              <h2 className="text-white font-bold text-2xl tracking-tight">
                Entrega inmediata
              </h2>
            </div>

            <p className="text-[#9a9a9a] leading-relaxed mb-6">
              Realizamos entregas inmediatas en las siguientes ciudades, sujetas
              a disponibilidad del modelo y coordinación previa.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {DELIVERY_INFO.immediate.map((city) => (
                <div
                  key={city}
                  className="border border-red-600/30 bg-red-600/5 p-4 text-center"
                >
                  <p className="text-white font-medium text-sm">{city}</p>
                </div>
              ))}
            </div>

            <p className="text-[#7f7f7f] text-sm mt-6">
              El costo de entrega se confirma al coordinar por WhatsApp.
            </p>
          </div>

          <div className="bg-[#111] border border-[#222] p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-[#222] flex items-center justify-center flex-shrink-0">
                <span className="text-[#b0b0b0] text-sm font-bold">2</span>
              </div>
              <h2 className="text-white font-bold text-2xl tracking-tight">
                Envío nacional
              </h2>
            </div>

            <p className="text-[#9a9a9a] leading-relaxed mb-5">
              Enviamos a cualquier estado de la República Mexicana mediante
              paquetería confiable.
            </p>

            <ul className="space-y-3 text-[#8a8a8a] text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">—</span>
                Tiempo de entrega sujeto a ubicación, disponibilidad y coordinación.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">—</span>
                Costo de envío con cargo adicional según destino y paquetería.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">—</span>
                Se proporciona número de guía para rastreo.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">—</span>
                Paquetería: FedEx, DHL o Estafeta según disponibilidad.
              </li>
            </ul>
          </div>

          <div className="bg-[#111] border border-[#222] p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-[#222] flex items-center justify-center flex-shrink-0">
                <span className="text-[#b0b0b0] text-sm font-bold">3</span>
              </div>
              <h2 className="text-white font-bold text-2xl tracking-tight">
                Envío internacional
              </h2>
            </div>

            <p className="text-[#9a9a9a] leading-relaxed mb-5">
              Enviamos a distintos países con cotización personalizada según
              destino, peso y logística de envío.
            </p>

            <ul className="space-y-3 text-[#8a8a8a] text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">—</span>
                Tiempo de entrega sujeto a país, disponibilidad y coordinación.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">—</span>
                Costo de envío con cargo adicional mediante cotización personalizada.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">—</span>
                Te recomendamos contactarnos antes de confirmar tu pedido.
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">—</span>
                La cobertura depende del destino y del servicio logístico disponible.
              </li>
            </ul>
          </div>

          <div className="bg-[#111] border border-[#222] p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-9 h-9 bg-[#222] flex items-center justify-center flex-shrink-0">
                <span className="text-[#b0b0b0] text-sm font-bold">!</span>
              </div>
              <h2 className="text-white font-bold text-2xl tracking-tight">
                Información importante
              </h2>
            </div>

            <ul className="space-y-3 text-[#8a8a8a] text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>
                  La disponibilidad depende del modelo y existencias al momento
                  de confirmar.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>
                  Para apartar o confirmar stock, contáctanos por WhatsApp.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>Horario de atención: {DELIVERY_INFO.hours}.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">•</span>
                <span>
                  Las condiciones finales de envío y entrega se confirman antes
                  del pago.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-20">
        <div className="bg-[#0a0a0a] border border-[#222] p-8 md:p-10 text-center">
          <p className="text-red-600 text-xs tracking-[0.35em] uppercase mb-3">
            Atención directa
          </p>
          <h3 className="text-white font-bold text-2xl mb-3">
            ¿Tienes dudas sobre tu envío?
          </h3>
          <p className="text-[#8a8a8a] text-sm md:text-base mb-8 max-w-2xl mx-auto leading-relaxed">
            Escríbenos por WhatsApp y te ayudamos a confirmar disponibilidad,
            coordinar entrega o cotizar tu envío.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 inline-block"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
