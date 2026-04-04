"use client";

import { useState } from "react";
import { DELIVERY_INFO, CONTACT } from "@/config/brand";

interface FAQ {
  question: string;
  answer: string;
}

const faqs: FAQ[] = [
  {
    question: "¿Cómo puedo realizar un pedido?",
    answer:
      "Contáctanos directamente por WhatsApp seleccionando el producto que te interesa desde nuestro catálogo. Te confirmamos disponibilidad, coordinamos el método de pago y la entrega.",
  },
  {
    question: "¿Cómo funciona la entrega inmediata?",
    answer:
      "La entrega inmediata aplica en Tampico, Madero, Altamira y Monterrey, sujeta a disponibilidad del modelo y coordinación por WhatsApp.",
  },
  {
    question: "¿Cuánto tarda el envío nacional?",
    answer:
      "Los tiempos de envío pueden variar según ubicación, disponibilidad y coordinación.",
  },
  {
    question: "¿Realizan envíos internacionales?",
    answer:
      "Sí, realizamos envíos internacionales. Los tiempos de entrega pueden variar según ubicación, disponibilidad y coordinación.",
  },
  {
    question: "¿Cuánto cuesta el envío?",
    answer:
      "El costo de envío se confirma al momento de coordinar el pedido.",
  },
  {
    question: "¿Las fotos del catálogo corresponden al producto real?",
    answer:
      "Las fotografías del catálogo corresponden al modelo publicado. Antes de confirmar tu pedido, te compartimos detalles actualizados por WhatsApp.",
  },
  {
    question: "¿Cómo puedo confirmar la disponibilidad de un producto?",
    answer:
      "La disponibilidad se confirma directamente por WhatsApp con el SKU o nombre del producto.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos transferencia, efectivo, depósito y tarjeta con terminal.",
  },
  {
    question: "¿Puedo apartar un producto?",
    answer:
      "Sí, puedes apartar un producto contactándonos por WhatsApp. Te compartimos las condiciones al momento de coordinarlo.",
  },
  {
    question: "¿Manejan cambios o devoluciones?",
    answer:
      "Los cambios o devoluciones se revisan según cada caso.",
  },
  {
    question: "¿Cómo puedo conocer más detalles del producto?",
    answer:
      "Antes de confirmar tu pedido, te compartimos por WhatsApp la información disponible del modelo, fotos y detalles actualizados.",
  },
  {
    question: "¿Cuál es su horario de atención?",
    answer: `Nuestro horario de atención es ${DELIVERY_INFO.hours}. Puedes escribirnos por WhatsApp para coordinar tu pedido.`,
  },
  {
    question: "¿Tienen tienda física?",
    answer: `Contamos con un showroom oficial en ${CONTACT.showroom.city} (${CONTACT.showroom.address}). Para otros puntos de entrega en ${DELIVERY_INFO.immediate.join(
      ", "
    )}, coordinamos por WhatsApp según tu ubicación.`,
  },
  {
    question: "¿Por qué no muestran precios en el sitio web?",
    answer:
      "Preferimos mantener una comunicación directa con cada cliente para ofrecer un servicio personalizado, confirmar disponibilidad en tiempo real y coordinar detalles de entrega y pago según cada caso.",
  },
];

export default function FAQClient() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const waLink = `https://wa.me/${CONTACT.whatsapp.number.replace(
    /\+/g,
    ""
  )}?text=${encodeURIComponent("Hola, tengo una pregunta que no está en el FAQ.")}`;

  return (
    <div className="bg-black min-h-screen">
      <section className="relative border-b border-[#222] bg-[#0a0a0a] overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.18),transparent_40%)]" />
        <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-24">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-4">
            Preguntas
          </p>
          <h1 className="text-white font-bold text-4xl md:text-6xl tracking-tight max-w-3xl">
            Preguntas frecuentes
          </h1>
          <p className="text-[#9a9a9a] text-base md:text-lg leading-relaxed mt-6 max-w-2xl">
            Encuentra respuestas a las dudas más comunes sobre pedidos,
            entregas, envíos, disponibilidad y proceso de compra.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 py-16 md:py-20">
        <div className="mb-8">
          <p className="text-red-600 text-xs tracking-[0.35em] uppercase mb-3">
            Información útil
          </p>
          <h2 className="text-white font-bold text-2xl md:text-4xl tracking-tight">
            Respuestas claras antes de comprar
          </h2>
        </div>

        <div className="space-y-3 mb-12">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="bg-[#111] border border-[#222] hover:border-red-600/50 transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                >
                  <span className="text-white font-medium text-sm md:text-base pr-4">
                    {faq.question}
                  </span>
                  <span
                    className={`text-red-600 text-2xl leading-none flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6">
                    <div className="border-t border-[#222] pt-4">
                      <p className="text-[#8a8a8a] text-sm md:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="bg-[#0a0a0a] border border-[#222] p-8 md:p-10 text-center">
          <p className="text-red-600 text-xs tracking-[0.35em] uppercase mb-3">
            Atención directa
          </p>
          <h3 className="text-white font-bold text-2xl mb-3">
            ¿No encontraste tu respuesta?
          </h3>
          <p className="text-[#8a8a8a] text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed">
            Escríbenos por WhatsApp y te ayudamos a resolver cualquier duda
            sobre disponibilidad, envíos, pagos o productos.
          </p>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300"
          >
            Consultar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  );
}
