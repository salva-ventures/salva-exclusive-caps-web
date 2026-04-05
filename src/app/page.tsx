"use client";

import Link from "next/link";
import Image from "next/image";
import {
  CheckCircle2,
  MessageCircle,
  PackageCheck,
  Quote,
  ShieldCheck,
  Truck,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import ProductCard from "@/components/ProductCard";
import HeroImageRotator from "@/components/HeroImageRotator";
import { getFeaturedProducts } from "@/data/products";
import { BRAND, CONTACT, DELIVERY_INFO } from "@/config/brand";

const testimonials = [
  {
    quote: "Muy buena atención y entrega rápida.",
    author: "A. R.",
  },
  {
    quote: "Se siente la diferencia en el diseño.",
    author: "M. T.",
  },
  {
    quote: "Proceso directo y sin complicaciones.",
    author: "J. L.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const softScale = {
  hidden: { opacity: 0, scale: 0.965 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const premiumCard =
  "relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] shadow-[0_18px_50px_rgba(0,0,0,0.28),0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-300";
const premiumHover =
  "hover:-translate-y-1 hover:border-white/15 hover:shadow-[0_26px_70px_rgba(0,0,0,0.36),0_10px_25px_rgba(0,0,0,0.16)]";
const subtleOverlay =
  "before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.015)_24%,transparent_52%)] before:content-['']";
const sectionGlow =
  "absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.025),transparent_16%,transparent_84%,rgba(255,255,255,0.018))]";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const waLink = `https://wa.me/${CONTACT.whatsapp.number.replace(/\+/g, "")}?text=${encodeURIComponent(CONTACT.whatsapp.defaultMessage)}`;

  const heroRef = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroVisualY = useTransform(scrollYProgress, [0, 1], [0, -24]);
  const heroGlowY = useTransform(scrollYProgress, [0, 1], [0, -12]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -8]);

  const socialLinks = [
    {
      name: "Instagram",
      href: CONTACT.social.instagramUrl,
      ariaLabel: "Instagram de Salva Exclusive Caps",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5a4.25 4.25 0 0 0 4.25-4.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5A3.5 3.5 0 1 0 12 15.5 3.5 3.5 0 0 0 12 8.5Zm5.25-2.38a1.13 1.13 0 1 1 0 2.26 1.13 1.13 0 0 1 0-2.26Z" />
        </svg>
      ),
    },
    {
      name: "Facebook",
      href: CONTACT.social.facebookUrl,
      ariaLabel: "Facebook de Salva Exclusive Caps",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M13.5 21v-8.25h2.77l.41-3.22H13.5V7.47c0-.93.26-1.56 1.6-1.56h1.71V3.03c-.3-.04-1.31-.13-2.49-.13-2.47 0-4.16 1.5-4.16 4.27v2.36H7.37v3.22h2.79V21h3.34Z" />
        </svg>
      ),
    },
    {
      name: "WhatsApp",
      href: waLink,
      ariaLabel: "WhatsApp de Salva Exclusive Caps",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5"
          aria-hidden="true"
        >
          <path d="M12 2A10 10 0 0 0 3.33 17l-1.1 4.02 4.12-1.08A10 10 0 1 0 12 2Zm0 18.18a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-2.45.64.65-2.39-.2-.31A8.18 8.18 0 1 1 12 20.18Zm4.48-6.1c-.25-.12-1.48-.73-1.71-.81-.23-.09-.39-.12-.56.12-.16.23-.64.8-.78.96-.14.16-.28.19-.53.07-.25-.12-1.04-.38-1.98-1.21-.73-.65-1.22-1.45-1.36-1.69-.14-.23-.01-.36.1-.48.1-.1.23-.28.35-.42.11-.14.15-.23.23-.39.07-.16.03-.3-.02-.42-.07-.12-.56-1.34-.77-1.83-.2-.48-.4-.41-.56-.42h-.48c-.16 0-.42.06-.64.3-.22.23-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.68 2.57 4.08 3.6.57.25 1.01.39 1.36.5.57.18 1.09.15 1.5.09.46-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.14-1.18-.07-.09-.23-.14-.48-.26Z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="bg-black text-white">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative overflow-hidden border-b border-white/10"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#030303,#000000)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(220,38,38,0.18),transparent_22%),radial-gradient(circle_at_18%_82%,rgba(255,255,255,0.05),transparent_20%),radial-gradient(circle_at_50%_32%,rgba(255,255,255,0.03),transparent_30%)]" />
        <div className={sectionGlow} />
        <div className="absolute inset-0 opacity-[0.045] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.6px,transparent_0.6px)] [background-size:18px_18px]" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24"
        >
          <motion.div style={{ y: heroTextY }} className="max-w-2xl">
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.15)] backdrop-blur-sm"
            >
              <div className="relative h-6 w-6">
                <Image
                  src="/star-logo.png"
                  alt="Logo estrella Salva Exclusive Caps"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-[11px] uppercase tracking-[0.35em] text-white/70">
                Marca mexicana de gorras premium
              </span>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="relative mb-5 inline-flex items-center gap-2 overflow-hidden rounded-full border border-red-600/25 bg-red-600/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-red-500"
            >
              <div className="absolute inset-y-0 left-[-140%] w-[70%] skew-x-[-20deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] animate-[shine_4.6s_ease-in-out_infinite]" />
              <Sparkles className="h-3.5 w-3.5" />
              Diseño, presencia y carácter
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              Gorras exclusivas
              <span className="block bg-[linear-gradient(180deg,#ef4444_0%,#b91c1c_100%)] bg-clip-text text-transparent">
                con presencia real.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-white/88 sm:text-xl"
            >
              {BRAND.tagline}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-sm leading-7 text-white/58 sm:text-base"
            >
              {BRAND.subtitle}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
                <Link
                  href="/catalogo"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-[0_10px_30px_rgba(255,255,255,0.08)] transition-all duration-300 hover:bg-white/92"
                >
                  Ver catálogo
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/[0.1] hover:text-red-500 hover:shadow-[0_10px_30px_rgba(255,255,255,0.05)]"
                >
                  Consultar por WhatsApp
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="relative z-20 mt-6 flex items-center gap-3"
            >
              {socialLinks.map((item) => (
                <motion.div
                  key={item.name}
                  whileHover={{ y: -3, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.ariaLabel}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.08] text-white backdrop-blur-sm transition-all duration-300 hover:border-white/18 hover:bg-white/[0.13] hover:text-red-500 hover:shadow-[0_8px_22px_rgba(0,0,0,0.2)]"
                  >
                    {item.icon}
                  </a>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="mt-10 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3"
            >
              {[
                { label: "Entrega", value: "Inmediata" },
                { label: "Cobertura", value: "Nacional e internacional" },
                { label: "Atención", value: "Directa por WhatsApp" },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className={`group ${premiumCard} ${subtleOverlay} p-4`}
                >
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/40">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-white/88 transition-colors duration-300 group-hover:text-white">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div variants={softScale} className="relative">
            <motion.div
              style={{ y: heroGlowY }}
              className="pointer-events-none absolute left-1/2 top-10 h-56 w-56 -translate-x-1/2 rounded-full bg-red-500/10 blur-3xl"
            />
            <motion.div
              style={{ y: heroGlowY }}
              className="pointer-events-none absolute right-10 top-16 h-40 w-40 rounded-full bg-white/8 blur-3xl"
            />

            <motion.div
              style={{ y: heroVisualY }}
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className={`group relative ${premiumCard} ${premiumHover} ${subtleOverlay} rounded-[2rem]`}
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.72),rgba(0,0,0,0.18)_42%,rgba(0,0,0,0.02))]" />
              <div className="absolute inset-x-12 top-8 h-24 rounded-full bg-white/10 blur-3xl" />
              <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/[0.03]" />

              <div className="relative aspect-[4/5] w-full overflow-hidden">
                <div className="absolute inset-0 scale-[1.02] transition-transform duration-500 group-hover:scale-[1.035]">
                  <HeroImageRotator />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">
                    Selección destacada
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white sm:text-xl">
                    Diseño, presencia y carácter
                  </p>
                </div>

                <div className="relative hidden overflow-hidden rounded-full border border-white/12 bg-black/35 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-white/85 backdrop-blur-sm sm:block">
                  <span className="relative z-10">Premium</span>
                  <div className="absolute inset-y-0 left-[-140%] w-[70%] skew-x-[-20deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.15),transparent)] animate-[shine_5s_ease-in-out_infinite]" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust */}
      <section className="relative border-b border-white/10 bg-[#070707]">
        <div className="absolute inset-0 opacity-[0.035] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.6px,transparent_0.6px)] [background-size:20px_20px]" />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-red-600">
              Confianza directa
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Atención real, entregas reales y proceso claro
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/55 sm:text-base">
              Queremos que el cliente sienta confianza desde el primer contacto:
              respuesta directa, confirmación clara y seguimiento real.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: PackageCheck,
                title: "Entrega inmediata",
                text: `Atención rápida y entregas en ${DELIVERY_INFO.immediate.join(", ")}.`,
              },
              {
                icon: Truck,
                title: "Envíos nacionales e internacionales",
                text: "Hacemos envíos a toda la República Mexicana y también al extranjero.",
              },
              {
                icon: MessageCircle,
                title: "Atención real y directa",
                text: "Disponibilidad validada directamente por WhatsApp, sin vueltas ni complicaciones.",
              },
            ].map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -5 }}
                  transition={{ type: "spring", stiffness: 240, damping: 24 }}
                  className={`group ${premiumCard} ${premiumHover} ${subtleOverlay} bg-[#0d0d0d] p-7`}
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-600/20 bg-red-600/10 text-red-500 shadow-[0_8px_20px_rgba(220,38,38,0.08)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-white/55">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Featured */}
      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.6px,transparent_0.6px)] [background-size:22px_22px]" />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="relative mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <motion.div variants={fadeUp} className="max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-red-600">
              Colección
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Productos destacados
            </h2>
            <p className="leading-relaxed text-white/55">
              Una selección de modelos representativos de la propuesta de{" "}
              {BRAND.name}, con diseño, presencia y carácter.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 self-start rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-white/18 hover:bg-white/[0.08] hover:text-red-500"
            >
              Ver catálogo completo
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.05 }}
          variants={staggerContainer}
          className="relative grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featured.slice(0, 8).map((product) => (
            <motion.div
              key={product.id}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-[1.6rem]">
                <div className="pointer-events-none absolute inset-0 z-10 rounded-[1.6rem] border border-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 z-10 rounded-[1.6rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_18%,transparent_82%,rgba(255,255,255,0.02))]" />
                <ProductCard product={product} />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Availability */}
      <section className="relative border-y border-white/10 bg-[#080808] py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(220,38,38,0.08),transparent_20%)]" />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <motion.div variants={fadeUp}>
              <p className="mb-3 text-xs uppercase tracking-[0.4em] text-red-600">
                Entregas
              </p>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Disponibilidad y envíos
              </h2>
              <p className="mb-8 leading-relaxed text-white/55">
                Entrega inmediata en {DELIVERY_INFO.immediate.join(", ")}.
                Sujeta a existencias. Los envíos nacionales e internacionales se
                cotizan por separado y toda disponibilidad se confirma
                directamente por WhatsApp.
              </p>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
                <Link
                  href="/disponibilidad"
                  className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_12px_30px_rgba(220,38,38,0.18)] transition-all duration-300 hover:bg-red-700"
                >
                  Ver detalles de envío
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 gap-4"
            >
              {[
                {
                  label: "Entrega inmediata",
                  desc: DELIVERY_INFO.immediate.join(", "),
                  icon: "📍",
                },
                {
                  label: "Disponibilidad",
                  desc: "Sujeta a existencias y confirmación directa por WhatsApp",
                  icon: "✅",
                },
                {
                  label: "Envíos",
                  desc: "Cobertura nacional e internacional con costo adicional",
                  icon: "✈️",
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className={`${premiumCard} ${premiumHover} ${subtleOverlay} bg-[#111] p-6`}
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="mb-1 text-sm font-semibold uppercase tracking-[0.18em] text-white">
                        {item.label}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/55">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About */}
      <section className="relative py-24">
        <div className="absolute inset-0 opacity-[0.025] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.6px,transparent_0.6px)] [background-size:24px_24px]" />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <motion.div variants={fadeUp} className="order-2 md:order-1">
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 240, damping: 24 }}
                className={`${premiumCard} ${premiumHover} ${subtleOverlay} bg-[#111] p-8`}
              >
                <p className="mb-3 text-xs uppercase tracking-[0.35em] text-red-600">
                  Nuestra visión
                </p>
                <h3 className="mb-4 text-2xl font-bold text-white">
                  Construir una marca referente en México
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-white/55">
                  Posicionar a {BRAND.name} como una marca referente en gorras
                  premium dentro de México, combinando diseño, identidad, orden
                  comercial y una experiencia de compra confiable.
                </p>
                <Link
                  href="/nosotros"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-red-600 transition-colors duration-300 hover:text-white"
                >
                  Conocer más
                  <span>→</span>
                </Link>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp} className="order-1 md:order-2">
              <p className="mb-3 text-xs uppercase tracking-[0.4em] text-red-600">
                Sobre nosotros
              </p>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Identidad, diseño y confianza
              </h2>
              <p className="leading-relaxed text-white/55">
                Somos una marca mexicana enfocada en ofrecer gorras premium con
                identidad propia. Apostamos por una imagen sólida, una operación
                seria y una propuesta pensada para clientes que valoran estilo,
                exclusividad y atención directa.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="relative border-y border-white/10 bg-[#0a0a0a] py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(255,255,255,0.04),transparent_20%)]" />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-12 max-w-3xl text-center"
          >
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-red-600">
              Testimonios
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Comentarios que refuerzan la confianza
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/55 sm:text-base">
              Mensajes cortos, claros y directos que transmiten atención,
              respuesta y experiencia real.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <motion.article
                key={item.author + item.quote}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 240, damping: 24 }}
                className={`${premiumCard} ${premiumHover} ${subtleOverlay} bg-[#111] p-7`}
              >
                <div className="flex items-center gap-2 text-red-500">
                  <Quote className="h-5 w-5" />
                  <span className="text-xs font-medium uppercase tracking-[0.2em]">
                    Cliente
                  </span>
                </div>

                <p className="mt-5 text-lg leading-8 text-white">
                  “{item.quote}”
                </p>

                <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 text-sm text-white/60">
                  <ShieldCheck className="h-4 w-4 text-red-500" />
                  {item.author}
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>

      {/* FAQ Preview */}
      <section className="relative border-y border-white/10 bg-[#0a0a0a] py-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={fadeUp} className="mb-12 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-red-600">
              Preguntas
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Preguntas frecuentes
            </h2>
          </motion.div>

          <div className="space-y-4">
            {[
              {
                q: "¿Cómo puedo realizar un pedido?",
                a: "Contáctanos directamente por WhatsApp seleccionando el producto que te interesa. Ahí confirmamos disponibilidad, pago y entrega.",
              },
              {
                q: "¿Cómo manejan entregas y envíos?",
                a: `Entrega inmediata en ${DELIVERY_INFO.immediate.join(", ")}, sujeta a existencias y coordinación directa. También realizamos envíos nacionales e internacionales con costo extra.`,
              },
              {
                q: "¿Las fotos corresponden al producto real?",
                a: "Sí. Las fotografías del catálogo corresponden a los modelos reales disponibles.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                className={`${premiumCard} ${subtleOverlay} bg-[#111] p-6`}
              >
                <p className="mb-2 text-sm font-semibold text-white">
                  {item.q}
                </p>
                <p className="text-sm leading-relaxed text-white/55">
                  {item.a}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.985 }}
            className="mt-8 text-center"
          >
            <Link
              href="/faq"
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.04] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-white/18 hover:bg-white/[0.08] hover:text-red-500"
            >
              Ver todas las preguntas
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="relative py-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className="relative overflow-hidden rounded-[2rem] border border-red-600/20 bg-gradient-to-br from-[#111] via-[#0b0b0b] to-[#161616] px-6 py-14 text-center shadow-[0_24px_70px_rgba(0,0,0,0.36)] md:px-10 md:py-16"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.16),transparent_28%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent,rgba(255,255,255,0.012))]" />
            <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.6px,transparent_0.6px)] [background-size:20px_20px]" />

            <div className="relative">
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-red-500">
                Cierre comercial
              </p>
              <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                ¿Listo para elegir tu próxima gorra?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/60">
                Explora el catálogo o recibe atención directa por WhatsApp para
                confirmar disponibilidad, entrega o envío.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
                  <Link
                    href="/catalogo"
                    className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/92"
                  >
                    Ver catálogo
                  </Link>
                </motion.div>

                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-8 py-4 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/18 hover:bg-white/[0.1] hover:text-red-500"
                  >
                    Hablar por WhatsApp
                  </a>
                </motion.div>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/60"
              >
                {[
                  "Entrega inmediata",
                  "Atención directa",
                  "Envíos nacionales e internacionales",
                ].map((item) => (
                  <motion.div
                    key={item}
                    variants={fadeUp}
                    className="inline-flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 text-red-500" />
                    {item}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <style jsx global>{`
        @keyframes shine {
          0%,
          70%,
          100% {
            left: -140%;
          }
          85% {
            left: 145%;
          }
        }
      `}</style>
    </div>
  );
}
