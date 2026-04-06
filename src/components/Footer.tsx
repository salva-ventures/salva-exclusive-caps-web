"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import {
  MessageCircle,
  ArrowUpRight,
  MapPin,
  Truck,
  ShieldCheck,
  Music2,
} from "lucide-react";
import { BRAND, CONTACT } from "@/config/brand";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
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

const panelClass =
  "relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] shadow-[0_18px_50px_rgba(0,0,0,0.28),0_8px_20px_rgba(0,0,0,0.12)]";
const panelOverlay =
  "before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.015)_24%,transparent_52%)] before:content-['']";

export default function Footer() {
  const waLink = `https://wa.me/${CONTACT.whatsapp.number.replace(/\+/g, "")}?text=${encodeURIComponent(CONTACT.whatsapp.defaultMessage)}`;

  const navLinks = [
    { href: "/", label: "Inicio" },
    { href: "/catalogo", label: "Catálogo" },
    { href: "/disponibilidad", label: "Disponibilidad" },
    { href: "/nosotros", label: "Nosotros" },
    { href: "/faq", label: "FAQ" },
    { href: "/contacto", label: "Contacto" },
  ];

  return (
    <footer className="relative mt-auto overflow-hidden border-t border-white/10 bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.12),transparent_26%),linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent_35%)]" />
      <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.6px,transparent_0.6px)] [background-size:20px_20px]" />

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
        className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1fr]">
          <motion.div variants={fadeUp}>
            <div className="inline-flex items-center gap-3">
              <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/10 bg-white/[0.05] shadow-[0_8px_20px_rgba(0,0,0,0.18)]">
                <Image
                  src="/star-logo.png"
                  alt={BRAND.name}
                  fill
                  className="object-contain p-1.5"
                />
              </div>

              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
                  {BRAND.shortName}
                </p>
                <p className="mt-0.5 text-sm text-white/80">
                  Gorras premium con identidad
                </p>
              </div>
            </div>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/55">
              {BRAND.slogan}
            </p>

            <p className="mt-3 max-w-md text-sm leading-7 text-white/45">
              Diseño, exclusividad y una experiencia de compra sólida, directa y
              moderna.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-red-600 bg-red-600 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white shadow-[0_10px_28px_rgba(220,38,38,0.18)] transition-all duration-300 hover:bg-red-700"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp
              </motion.a>

              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={CONTACT.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-4 py-3 text-xs font-medium text-white/75 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                aria-label="Instagram"
              >
                Instagram
              </motion.a>

              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={CONTACT.social.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-4 py-3 text-xs font-medium text-white/75 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                aria-label="TikTok"
              >
                <Music2 className="h-4 w-4" />
                TikTok
              </motion.a>

              <motion.a
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={CONTACT.social.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-4 py-3 text-xs font-medium text-white/75 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                aria-label="Facebook"
              >
                Facebook
              </motion.a>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
              Navegación
            </p>

            <div className="space-y-2">
              {navLinks.map((item) => (
                <motion.div
                  key={item.href}
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.18 }}
                >
                  <Link
                    href={item.href}
                    className="inline-flex items-center gap-2 text-sm text-white/65 transition-colors duration-300 hover:text-white"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5 text-red-500" />
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
              Contacto
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3 text-sm text-white/60">
                <MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-300 hover:text-white"
                >
                  {CONTACT.whatsapp.displayNumber}
                </a>
              </div>

              <div className="flex items-start gap-3 text-sm text-white/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <span>Tampico, Tamaulipas — México</span>
              </div>

              <div className="flex items-start gap-3 text-sm text-white/60">
                <Truck className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <span>Envíos nacionales e internacionales disponibles</span>
              </div>

              <div className="flex items-start gap-3 text-sm text-white/60">
                <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                <span>Confirmación directa de disponibilidad por WhatsApp</span>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <div className={`${panelClass} ${panelOverlay} p-6`}>
              <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/[0.03]" />

              <div className="relative">
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
                  Atención directa
                </p>

                <h3 className="mt-3 text-xl font-semibold text-white">
                  ¿Buscas un modelo en específico?
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/55">
                  Escríbenos por WhatsApp y te confirmamos disponibilidad,
                  entrega o envío de forma directa.
                </p>

                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex w-full items-center justify-center rounded-full border border-white/12 bg-white px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-black transition-all duration-300 hover:bg-white/90"
                >
                  Hablar ahora
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>

       <motion.div
  variants={fadeUp}
  className="flex flex-col gap-4 pt-6 text-sm text-white/40 md:gap-5"
>
  <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
    <p>
      © {new Date().getFullYear()} {BRAND.name}. Todos los derechos
      reservados.
    </p>

    <p>Tampico, Tamaulipas — México</p>
  </div>

  <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-white/45">
    <Link
      href="/aviso-de-privacidad"
      className="transition-colors duration-300 hover:text-white"
    >
      Aviso de Privacidad
    </Link>
  </div>
</motion.div>
    </footer>
  );
}
