"use client";

import { useState } from 'react';
import { DELIVERY_INFO, CONTACT } from '@/config/brand';

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: '¿Cómo puedo realizar un pedido?',
    answer: 'Contáctanos directamente por WhatsApp seleccionando el producto que te interesa desde nuestro catálogo. Te confirmamos disponibilidad, coordinamos el método de pago y la entrega.',
  },
  {
    question: '¿Cuánto tiempo tarda la entrega inmediata?',
    answer: `Las entregas inmediatas en ${DELIVERY_INFO.immediate.join(', ')} se realizan el mismo día o en menos de 24 horas. Coordinamos contigo el punto y horario de entrega por WhatsApp.`,
  },
  {
    question: '¿Cuánto tarda el envío nacional?',
    answer: 'Los envíos nacionales a cualquier estado de México tardan entre 3 y 7 días hábiles, dependiendo del destino y la paquetería disponible.',
  },
  {
    question: '¿Realizan envíos internacionales?',
    answer: 'Sí, enviamos a cualquier país del mundo. El tiempo de entrega varía entre 7 y 21 días hábiles según el destino. El costo se cotiza de manera personalizada y el comprador es responsable de los impuestos de importación en su país.',
  },
  {
    question: '¿Cuánto cuesta el envío?',
    answer: `Las entregas inmediatas en ${DELIVERY_INFO.immediate.join(', ')} no tienen costo adicional. Los envíos nacionales e internacionales tienen un costo extra que varía según el destino, peso y paquetería. Te cotizamos antes de confirmar tu pedido.`,
  },
  {
    question: '¿Las fotos del catálogo corresponden al producto real?',
    answer: 'Sí, todas las fotografías en nuestro catálogo son de los productos reales que vendemos. Lo que ves en la foto es exactamente lo que recibirás.',
  },
  {
    question: '¿Cómo puedo confirmar la disponibilidad de un producto?',
    answer: 'La disponibilidad depende del modelo y existencias al momento de confirmar. Contáctanos por WhatsApp con el SKU o nombre del producto que te interesa y te confirmamos si está disponible.',
  },
  {
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos transferencia bancaria, depósito en efectivo, y otros métodos que coordinamos directamente por WhatsApp según tu preferencia y ubicación.',
  },
  {
    question: '¿Puedo apartar un producto?',
    answer: 'Sí, puedes apartar un producto contactándonos por WhatsApp. Te indicamos el proceso de apartado y el tiempo que puedes mantenerlo reservado.',
  },
  {
    question: '¿Manejan cambios o devoluciones?',
    answer: 'Sí, manejamos cambios y devoluciones en casos específicos. Contáctanos por WhatsApp dentro de las primeras 48 horas de recibir tu producto para coordinar el proceso. Aplican condiciones según el caso.',
  },
  {
    question: '¿Las gorras son originales?',
    answer: 'Sí, todas nuestras gorras son 100% originales y de alta calidad. Trabajamos directamente con proveedores confiables y cada pieza es seleccionada con criterio.',
  },
  {
    question: '¿Cuál es su horario de atención?',
    answer: `Nuestro horario de atención es de ${DELIVERY_INFO.hours}. Puedes contactarnos por WhatsApp en cualquier momento y te responderemos a la brevedad.`,
  },
  {
    question: '¿Tienen tienda física?',
    answer: `Contamos con un showroom oficial en ${CONTACT.showroom.city} (${CONTACT.showroom.address}). Para otros puntos de entrega en ${DELIVERY_INFO.immediate.join(', ')}, coordinamos por WhatsApp según tu ubicación.`,
  },
  {
    question: '¿Por qué no muestran precios en el sitio web?',
    answer: 'Preferimos mantener una comunicación directa con cada cliente para ofrecer un servicio personalizado, confirmar disponibilidad en tiempo real y coordinar detalles de entrega y pago según cada caso.',
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const waLink = `https://wa.me/${CONTACT.whatsapp.number.replace(/\+/g, '')}?text=${encodeURIComponent('Hola, tengo una pregunta que no está en el FAQ.')}`;

  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <div className="bg-[#0a0a0a] border-b border-[#222] py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-3">Preguntas</p>
          <h1 className="text-white font-bold text-4xl md:text-5xl tracking-tight mb-4">Preguntas Frecuentes</h1>
          <p className="text-[#888] text-sm md:text-base">
            Encuentra respuestas a las preguntas más comunes sobre nuestros productos, entregas y métodos de compra.
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-16">
        {/* FAQ List */}
        <div className="space-y-px mb-12">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-[#111] border border-[#222]">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 hover:bg-[#1a1a1a] transition-colors"
              >
                <span className="text-white font-medium text-sm md:text-base">{faq.question}</span>
                <span className={`text-red-600 text-xl flex-shrink-0 transition-transform ${openIndex === index ? 'rotate-45' : ''}`}>
                  +
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 pt-0">
                  <p className="text-[#888] text-sm md:text-base leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-[#0a0a0a] border border-[#222] p-8 text-center">
          <p className="text-white font-medium mb-2">¿No encontraste tu respuesta?</p>
          <p className="text-[#888] text-sm mb-6">Contáctanos por WhatsApp y con gusto te ayudamos.</p>
          <a
            href={waLink}
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
