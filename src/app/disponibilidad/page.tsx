export default function DisponibilidadPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#0a0a0a] border-b border-[#222] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-3">Envíos</p>
          <h1 className="text-white font-bold text-4xl md:text-5xl tracking-tight">Disponibilidad y Entregas</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Local delivery */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-red-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">1</span>
            </div>
            <h2 className="text-white font-bold text-xl tracking-tight">Entrega Inmediata</h2>
          </div>
          <div className="bg-[#111] border border-[#222] p-8 ml-11">
            <p className="text-[#888] leading-relaxed mb-6">
              Realizamos entregas <strong className="text-white">inmediatas o en menos de 24 horas</strong> en las siguientes ciudades:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {['Tampico', 'Ciudad Madero', 'Altamira', 'Monterrey'].map(city => (
                <div key={city} className="border border-red-600/30 bg-red-600/5 p-4 text-center">
                  <p className="text-white font-medium text-sm">{city}</p>
                </div>
              ))}
            </div>
            <p className="text-[#888] text-sm mt-6">
              Sin costo adicional de envío en estas ciudades. Contáctanos por WhatsApp para coordinar el punto de entrega.
            </p>
          </div>
        </div>

        {/* National */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#222] flex items-center justify-center flex-shrink-0">
              <span className="text-[#888] text-sm font-bold">2</span>
            </div>
            <h2 className="text-white font-bold text-xl tracking-tight">Envío Nacional</h2>
          </div>
          <div className="bg-[#111] border border-[#222] p-8 ml-11">
            <p className="text-[#888] leading-relaxed mb-4">
              Enviamos a <strong className="text-white">cualquier estado de la República Mexicana</strong> mediante paquetería confiable.
            </p>
            <ul className="space-y-2 text-[#888] text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">—</span>
                Tiempo de entrega: 3 a 7 días hábiles
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">—</span>
                Costo de envío con cargo adicional (varía según destino y paquetería)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">—</span>
                Se proporciona número de guía para rastreo
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">—</span>
                Paquetería: Fedex, DHL, o Estafeta según disponibilidad
              </li>
            </ul>
          </div>
        </div>

        {/* International */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-[#222] flex items-center justify-center flex-shrink-0">
              <span className="text-[#888] text-sm font-bold">3</span>
            </div>
            <h2 className="text-white font-bold text-xl tracking-tight">Envío Internacional</h2>
          </div>
          <div className="bg-[#111] border border-[#222] p-8 ml-11">
            <p className="text-[#888] leading-relaxed mb-4">
              Enviamos <strong className="text-white">a cualquier país del mundo</strong>. El costo de envío se cotiza según el destino.
            </p>
            <ul className="space-y-2 text-[#888] text-sm">
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">—</span>
                Tiempo de entrega: 7 a 21 días hábiles según el país
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">—</span>
                Costo de envío con cargo adicional (cotización personalizada)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">—</span>
                El comprador es responsable de los impuestos de importación
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 mt-0.5">—</span>
                Contáctanos antes de realizar tu pedido para coordinar envío
              </li>
            </ul>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#0a0a0a] border border-[#222] p-8 text-center">
          <p className="text-white font-medium mb-2">¿Tienes dudas sobre tu envío?</p>
          <p className="text-[#888] text-sm mb-6">Contáctanos por WhatsApp y te ayudamos a coordinarlo.</p>
          <a
            href="https://wa.me/521XXXXXXXXXX?text=Hola,%20tengo%20una%20pregunta%20sobre%20disponibilidad%20y%20env%C3%ADos."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 inline-block"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
