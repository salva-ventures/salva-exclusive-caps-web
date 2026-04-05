"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Globe,
  MapPin,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { CONTACT, DELIVERY_INFO } from "@/config/brand";

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

export default function DisponibilidadClient() {
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
            <Truck className="h-4 w-4" />
            Entregas y envíos
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Disponibilidad clara y cobertura amplia
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-3xl text-sm leading-7 text-white/60 md:text-base"
          >
            Confirmamos disponibilidad directamente por WhatsApp. Manejamos
            entrega inmediata en zonas seleccionadas, además de envíos
            nacionales e internacionales con costo adicional.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/75">
              Entrega inmediata
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/75">
              Confirmación por WhatsApp
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/75">
              Cobertura nacional e internacional
            </span>
          </motion.div>
        </motion.div>
      </section>

      <section className="border-b border-white/10 bg-[#070707]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="mx-auto grid max-w-7xl gap-6 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8"
        >
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="rounded-[1.75rem] border border-white/10 bg-[#0d0d0d] p-7"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-600/20 bg-red-600/10 text-red-500">
              <PackageCheck className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-white">
              Entrega inmediata
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/55">
              Entrega inmediata en {DELIVERY_INFO.immediate.join(", ")}, sujeta
              a existencias y confirmación directa.
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
              Envíos nacionales
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/55">
              Realizamos envíos a toda la República Mexicana con costo adicional
              según destino y paquetería.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="rounded-[1.75rem] border border-white/10 bg-[#0d0d0d] p-7"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-600/20 bg-red-600/10 text-red-500">
              <Globe className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-white">
              Envíos internacionales
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/55">
              También manejamos envíos internacionales. El costo y tiempo se
              revisan según país de destino.
            </p>
          </motion.div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
          variants={staggerContainer}
          className="grid grid-cols-1 gap-8 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <motion.div variants={fadeUp}>
            <div className="rounded-[2rem] border border-white/10 bg-[#111] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)] md:p-10">
              <p className="mb-3 text-xs uppercase tracking-[0.35em] text-red-600">
                ¿Cómo funciona?
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Confirmación antes de cerrar pedido
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/58 md:text-base">
                Cada modelo se confirma directamente por WhatsApp antes de
                cerrar el pedido. Esto asegura claridad en disponibilidad,
                entrega local o envío según el destino.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  "Envías el nombre o SKU del modelo",
                  "Confirmamos disponibilidad real",
                  "Te indicamos entrega inmediata o envío",
                  "Se revisa costo adicional si aplica",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/10 bg-black/25 px-4 py-4 text-sm text-white/70"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  Confirmar por WhatsApp
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
          </motion.div>

          <motion.div variants={staggerContainer} className="space-y-6">
            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="rounded-[1.75rem] border border-white/10 bg-[#111] p-7"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-600/20 bg-red-600/10 text-red-500">
                  <Clock3 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Confirmación rápida
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/55">
                    La disponibilidad no se asume. Se confirma directamente
                    antes de cerrar cada pedido.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="rounded-[1.75rem] border border-white/10 bg-[#111] p-7"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-600/20 bg-red-600/10 text-red-500">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Cobertura local
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/55">
                    Entrega inmediata en {DELIVERY_INFO.immediate.join(", ")}, de
                    acuerdo con existencias y coordinación directa.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="rounded-[1.75rem] border border-white/10 bg-[#111] p-7"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-600/20 bg-red-600/10 text-red-500">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Proceso claro
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/55">
                    Confirmamos modelo, ciudad, forma de entrega o envío y costo
                    adicional cuando aplique.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
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
                Confirmación directa
              </p>

              <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                ¿Quieres confirmar disponibilidad?
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/60">
                Escríbenos por WhatsApp con el nombre o SKU del modelo y te
                confirmamos entrega inmediata o envío según tu ubicación.
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
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:border-red-600 hover:bg-white/10 hover:text-red-500"
                  >
                    Ver catálogo
                    <ArrowUpRight className="h-4 w-4" />
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
