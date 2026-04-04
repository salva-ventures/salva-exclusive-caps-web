"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronDown,
  CheckCircle2,
  HelpCircle,
  MessageCircle,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { CONTACT, DELIVERY_INFO } from "@/config/brand";

const faqItems = [
  {
    question: "¿Cómo puedo realizar un pedido?",
    answer:
      "Contáctanos directamente por WhatsApp con el modelo que te interesa. Ahí confirmamos disponibilidad, forma de pago, entrega o envío y cualquier detalle adicional antes de cerrar el pedido.",
  },
  {
    question: "¿La disponibilidad se confirma en tiempo real?",
    answer:
      "La disponibilidad depende de existencias al momento de confirmar. Por eso validamos cada modelo directamente por WhatsApp antes de cerrar cualquier pedido.",
  },
  {
    question: "¿En qué ciudades manejan entrega inmediata?",
    answer: `Manejamos entrega inmediata en ${DELIVERY_INFO.immediate.join(
      ", "
    )}, sujeta a existencias y coordinación directa.`,
  },
  {
    question: "¿Realizan envíos nacionales?",
    answer:
      "Sí. Realizamos envíos a toda la República Mexicana. El costo del envío se cotiza por separado dependiendo del destino y paquetería.",
  },
  {
    question: "¿También hacen envíos internacionales?",
    answer:
      "Sí. También manejamos envíos internacionales. El costo y tiempo estimado se revisan caso por caso según país de destino.",
  },
  {
    question: "¿Las fotos del catálogo corresponden al producto real?",
    answer:
      "Sí. Las imágenes del catálogo corresponden a los modelos reales disponibles dentro de nuestra selección.",
  },
  {
    question: "¿Puedo apartar una gorra?",
    answer:
      "Eso depende del modelo y disponibilidad del momento. La manera correcta es escribirnos por WhatsApp para revisar opciones de confirmación.",
  },
  {
    question: "¿Cómo sé si un modelo sigue disponible?",
    answer:
      "La forma correcta es enviarnos el nombre o SKU del modelo por WhatsApp. Así te confirmamos de inmediato si sigue disponible.",
  },
  {
    question: "¿Qué información debo enviar para pedir por WhatsApp?",
    answer:
      "Lo ideal es mandar el nombre del modelo o SKU, ciudad de entrega o envío y cualquier duda específica que tengas para responderte más rápido.",
  },
  {
    question: "¿Manejan atención directa?",
    answer:
      "Sí. La atención es directa por WhatsApp para confirmar disponibilidad, resolver dudas y coordinar entrega o envío sin intermediarios.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const waLink = `https://wa.me/${CONTACT.whatsapp.number.replace(/\+/g, "")}?text=${encodeURIComponent(CONTACT.whatsapp.defaultMessage)}`;

  return (
    <div className="min-h-screen bg-black">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#050505,#000000)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_20%)]" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20"
        >
          <motion.div
            variants={fadeUp}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-600/30 bg-red-600/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-red-500"
          >
            <HelpCircle className="h-4 w-4" />
            Preguntas frecuentes
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Respuestas claras antes de pedir
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-2xl text-sm leading-7 text-white/60 md:text-base"
          >
            Aquí resolvemos las dudas más comunes sobre disponibilidad,
            entregas, envíos y atención. Si necesitas confirmación directa de un
            modelo, te atendemos por WhatsApp.
          </motion.p>
        </motion.div>
      </section>

      <section className="border-b border-white/10 bg-[#070707]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        >
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className="rounded-[1.75rem] border border-white/10 bg-[#0d0d0d] p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-600/20 bg-red-600/10 text-red-500">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-white">
                Confirmación directa
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/55">
                Validamos disponibilidad, modelo y detalles directamente por
                WhatsApp antes de cerrar cualquier pedido.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className="rounded-[1.75rem] border border-white/10 bg-[#0d0d0d] p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-600/20 bg-red-600/10 text-red-500">
                <Truck className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-white">
                Envíos y entregas
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/55">
                Entrega inmediata en {DELIVERY_INFO.immediate.join(", ")} y
                envíos nacionales e internacionales con costo adicional.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 240, damping: 22 }}
              className="rounded-[1.75rem] border border-white/10 bg-[#0d0d0d] p-7"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-600/20 bg-red-600/10 text-red-500">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h2 className="mt-5 text-xl font-semibold text-white">
                Proceso claro
              </h2>
              <p className="mt-3 text-sm leading-7 text-white/55">
                Atención directa, confirmación clara y seguimiento simple para
                que la compra se sienta seria y confiable.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="mb-10 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-red-600">
              Dudas comunes
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Todo lo importante antes de comprar
            </h2>
          </motion.div>

          <div className="space-y-4">
            {faqItems.map((item, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={item.question}
                  variants={fadeUp}
                  className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#111]"
                >
                  <button
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-300 hover:bg-white/[0.02]"
                  >
                    <span className="pr-4 text-sm font-semibold text-white md:text-base">
                      {item.question}
                    </span>

                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white/70"
                    >
                      <ChevronDown className="h-4 w-4" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-white/10 px-6 py-5">
                          <p className="text-sm leading-7 text-white/58">
                            {item.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      <section className="border-t border-white/10 bg-[#080808] py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-red-600/20 bg-gradient-to-br from-[#111] via-[#0b0b0b] to-[#151515] px-6 py-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:px-10 md:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.18),transparent_30%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent,rgba(255,255,255,0.01))]" />

            <div className="relative">
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-red-500">
                Atención directa
              </p>

              <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                ¿Quieres confirmar un modelo?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/60">
                Escríbenos por WhatsApp para validar disponibilidad,
                entrega inmediata o envío según tu ciudad.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  Hablar por WhatsApp
                </motion.a>

                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/catalogo"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:border-red-600 hover:bg-white/10 hover:text-red-500"
                  >
                    Ver catálogo
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
