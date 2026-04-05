"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  Clock3,
  MapPin,
  MessageCircle,
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

export default function ContactoClient() {
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
            <MessageCircle className="h-4 w-4" />
            Contacto directo
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Atención clara, rápida y directa
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-3xl text-sm leading-7 text-white/60 md:text-base"
          >
            Contáctanos por WhatsApp para confirmar disponibilidad, coordinar
            entrega inmediata o revisar envío nacional e internacional.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/75">
              Atención directa
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/75">
              Confirmación por WhatsApp
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/75">
              Entregas y envíos
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
              <MessageCircle className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-white">
              WhatsApp directo
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/55">
              La vía principal para confirmar modelos, disponibilidad, pagos,
              entrega o envío es WhatsApp.
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
              Entrega y envío
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/55">
              Entrega inmediata en {DELIVERY_INFO.immediate.join(", ")} y envíos
              nacionales e internacionales con costo adicional.
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
              Proceso confiable
            </h2>
            <p className="mt-3 text-sm leading-7 text-white/55">
              Confirmación directa, comunicación clara y seguimiento simple para
              que la experiencia se sienta seria y ordenada.
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
                Canal principal
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Escríbenos por WhatsApp
              </h2>

              <p className="mt-5 text-sm leading-7 text-white/58 md:text-base">
                Si ya viste un modelo que te interesa, envíanos su nombre o SKU.
                Ahí confirmamos disponibilidad, precio final, entrega o envío y
                cualquier detalle adicional.
              </p>

              <div className="mt-8 rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
                <p className="text-[11px] uppercase tracking-[0.24em] text-white/40">
                  WhatsApp
                </p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {CONTACT.whatsapp.displayNumber}
                </p>
                <p className="mt-3 text-sm leading-7 text-white/55">
                  Atención directa para disponibilidad, entregas, envíos y dudas
                  sobre la colección.
                </p>
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
                    Respuesta directa
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/55">
                    Buscamos responder de forma clara y directa para confirmar
                    modelos, disponibilidad y condiciones de entrega o envío.
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
                    Zona base
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/55">
                    Operamos desde Tampico, Tamaulipas, con atención para
                    entregas locales y envíos a otras ciudades y países.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="rounded-[1.75rem] border border-white/10 bg-[#111] p-7"
            >
              <p className="mb-4 text-xs uppercase tracking-[0.35em] text-red-600">
                Redes sociales
              </p>

              <div className="space-y-3">
                <motion.a
                  whileHover={{ x: 4 }}
                  href={CONTACT.social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 text-sm text-white/75 transition-colors duration-300 hover:text-white"
                >
                  <span className="inline-flex items-center gap-3">
                    <InstagramBrandIcon className="h-[18px] w-[18px]" />
                    Instagram
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/35" />
                </motion.a>

                <motion.a
                  whileHover={{ x: 4 }}
                  href={CONTACT.social.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 text-sm text-white/75 transition-colors duration-300 hover:text-white"
                >
                  <span className="inline-flex items-center gap-3">
                    <TikTokBrandIcon className="h-[18px] w-[18px]" />
                    TikTok
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/35" />
                </motion.a>

                <motion.a
                  whileHover={{ x: 4 }}
                  href={CONTACT.social.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-4 text-sm text-white/75 transition-colors duration-300 hover:text-white"
                >
                  <span className="inline-flex items-center gap-3">
                    <FacebookBrandIcon className="h-[18px] w-[18px]" />
                    Facebook
                  </span>
                  <ArrowUpRight className="h-4 w-4 text-white/35" />
                </motion.a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}

function InstagramBrandIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ig-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#f58529" />
          <stop offset="35%" stopColor="#dd2a7b" />
          <stop offset="70%" stopColor="#8134af" />
          <stop offset="100%" stopColor="#515bd4" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="url(#ig-gradient)" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="white" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="white" />
    </svg>
  );
}

function TikTokBrandIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#111111" />
      <path
        d="M14.8 6.2c.7 1.1 1.7 1.9 3 2.2v2.3c-1.1-.1-2.1-.5-3-.9v4.3a4.6 4.6 0 1 1-4.6-4.6c.2 0 .4 0 .6.1v2.4a2.4 2.4 0 1 0 1.8 2.3V4.8h2.2v1.4Z"
        fill="#25F4EE"
        opacity="0.9"
      />
      <path
        d="M15.4 5.6c.7 1.1 1.7 1.9 3 2.2v2.3c-1.1-.1-2.1-.5-3-.9v4.3a4.6 4.6 0 1 1-4.6-4.6c.2 0 .4 0 .6.1v2.4a2.4 2.4 0 1 0 1.8 2.3V4.2h2.2v1.4Z"
        fill="#FE2C55"
        opacity="0.9"
      />
      <path
        d="M15.1 5.9c.7 1.1 1.7 1.9 3 2.2v2.1c-1.1-.1-2.1-.5-3-.9v4.4a4.3 4.3 0 1 1-4.3-4.3v2.1a2.2 2.2 0 1 0 2.1 2.2V4.6h2.2v1.3Z"
        fill="white"
      />
    </svg>
  );
}

function FacebookBrandIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" fill="#1877F2" />
      <path
        d="M13.4 20v-6h2l.3-2.3h-2.3v-1.5c0-.7.2-1.1 1.2-1.1h1.2V7h-1.8c-2.2 0-3 .9-3 2.9v1.8H9v2.3h2.1v6h2.3Z"
        fill="white"
      />
    </svg>
  );
}
