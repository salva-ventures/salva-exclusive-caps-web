"use client";

import { useState } from 'react';

const faqs = [
  {
    q: '¿Cómo puedo realizar un pedido?',
    a: 'Puedes contactarnos directamente a través de WhatsApp o mediante el formulario de contacto en nuestro sitio web. Un miembro del equipo te responderá a la brevedad.',
  },
  {
    q: '¿Cuánto tiempo tarda el envío?',
    a: 'Para Tampico, Madero, Altamira y Monterrey la entrega es inmediata o en menos de 24 horas. Los envíos nacionales tardan entre 3 y 7 días hábiles según la paquetería.',
  },
  {
    q: '¿Realizan envíos internacionales?',
    a: 'Sí, realizamos envíos a cualquier parte del mundo. El costo de envío internacional se calcula según el destino y se informa al momento de confirmar el pedido.',
  },
  {
    q: '¿Las gorras son 100% originales?',
    a: 'Absolutamente. Todas nuestras piezas son 100% originales y de calidad premium. Trabajamos únicamente con materiales y proveedores cuidadosamente seleccionados.',
  },
  {
    q: '¿Aceptan devoluciones o cambios?',
    a: 'Aceptamos cambios dentro de los primeros 7 días en caso de defecto de fábrica. Las gorras deben estar en su estado original, sin uso y con etiquetas.',
  },
  {
    q: '¿Qué formas de pago aceptan?',
    a: 'Aceptamos transferencia bancaria (SPEI), efectivo en entregas locales y otras formas de pago que se comunican al momento de la cotización.',
  },
  {
    q: '¿Hacen pedidos personalizados o corporativos?',
    a: 'Sí, realizamos pedidos especiales y corporativos. Contáctanos directamente para discutir cantidades, diseños y tiempos de producción.',
  },
  {
    q: '¿Con qué frecuencia lanzan nuevas colecciones?',
    a: 'Lanzamos drops exclusivos de forma periódica. Síguenos en redes sociales o suscríbete a nuestro contacto para enterarte de los próximos lanzamientos.',
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#0a0a0a] border-b border-[#222] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-3">Ayuda</p>
          <h1 className="text-white font-bold text-4xl md:text-5xl tracking-tight">Preguntas Frecuentes</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="space-y-px">
          {faqs.map((faq, i) => (
            <div key={i} className="border border-[#222] overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-6 bg-[#111] hover:bg-[#161616] transition-colors text-left"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="text-white font-medium text-sm pr-4">{faq.q}</span>
                <span className={`text-red-600 flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M8 1v14M1 8h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-48' : 'max-h-0'}`}>
                <p className="text-[#888] text-sm leading-relaxed px-6 py-5 bg-[#0a0a0a]">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
