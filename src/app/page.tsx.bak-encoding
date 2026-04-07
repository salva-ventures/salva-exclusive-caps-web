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
import { getFeaturedProducts } from "@/data/products";
import { BRAND, CONTACT, DELIVERY_INFO } from "@/config/brand";

const testimonials = [
  {
    quote: "Muy buena atenciÃ³n y entrega rÃ¡pida.",
    author: "A. R.",
  },
  {
    quote: "Se siente la diferencia en el diseÃ±o.",
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
          className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 sm:pb-20 sm:pt-32 lg:grid-cols-[1.04fr_0.96fr] lg:gap-8 lg:px-8 lg:pb-24 lg:pt-24"
        >
          <motion.div style={{ y: heroTextY }} className="relative z-10 max-w-2xl">
            <div className="pointer-events-none absolute right-[-1.9rem] top-[5.25rem] w-[12.5rem] opacity-[0.26] sm:right-[-1.25rem] sm:top-[5.75rem] sm:w-[15rem] md:w-[16rem] lg:hidden">
              <div className="relative aspect-square w-full">
                <div className="absolute inset-0 scale-[1.03] opacity-42 blur-[8px]">
                  <Image
                    src="/branding/hero-star.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="absolute inset-0 scale-[1.08] opacity-18 blur-[18px]">
                  <Image
                    src="/branding/hero-star.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <Image
                  src="/branding/hero-star.png"
                  alt="Emblema de Salva Exclusive Caps"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_0_14px_rgba(255,255,255,0.05)]"
                />
              </div>
            </div>

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
              DiseÃ±o, presencia y carÃ¡cter
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
                  Ver catÃ¡logo
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
                { label: "AtenciÃ³n", value: "Directa por WhatsApp" },
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

          <motion.div
            variants={softScale}
            className="relative hidden lg:flex items-center justify-center lg:min-h-[700px]"
          >
            <motion.div
              style={{ y: heroGlowY }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/4 blur-[44px]"
            />
            <motion.div
              style={{ y: heroGlowY }}
              className="pointer-events-none absolute left-1/2 top-1/2 h-[24rem] w-[24rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500/8 blur-[88px]"
            />

            <motion.div
              style={{ y: heroVisualY }}
              whileHover={{ y: -8, scale: 1.015 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="relative mx-auto w-full max-w-[620px] xl:max-w-[680px]"
            >
              <div className="relative aspect-square w-full">
                <div className="absolute inset-0 scale-[1.03] opacity-28 blur-[8px]">
                  <Image
                    src="/branding/hero-star.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="absolute inset-0 scale-[1.08] opacity-12 blur-[18px]">
                  <Image
                    src="/branding/hero-star.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="absolute inset-0 scale-[1.12] opacity-6 blur-[32px]">
                  <Image
                    src="/branding/hero-star.png"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>

                <Image
                  src="/branding/hero-star.png"
                  alt="Emblema de Salva Exclusive Caps"
                  fill
                  priority
                  className="object-contain drop-shadow-[0_0_18px_rgba(255,255,255,0.05)]"
                />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

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
              AtenciÃ³n real, entregas reales y proceso claro
            </h2>
            <p className="mt-4 text-sm leading-7 text-white/55 sm:text-base">
              Queremos que el cliente sienta confianza desde el primer contacto:
              respuesta directa, confirmaciÃ³n clara y seguimiento real.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: PackageCheck,
                title: "Entrega inmediata",
                text: `AtenciÃ³n rÃ¡pida y entregas en ${DELIVERY_INFO.immediate.join(", ")}.`,
              },
              {
                icon: Truck,
                title: "EnvÃ­os nacionales e internacionales",
                text: "Hacemos envÃ­os a toda la RepÃºblica Mexicana y tambiÃ©n al extranjero.",
              },
              {
                icon: MessageCircle,
                title: "AtenciÃ³n real y directa",
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
              ColecciÃ³n
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Productos destacados
            </h2>
            <p className="leading-relaxed text-white/55">
              Una selecciÃ³n de modelos representativos de la propuesta de{" "}
              {BRAND.name}, con diseÃ±o, presencia y carÃ¡cter.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.985 }}
          >
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 self-start rounded-full border border-white/12 bg-white/[0.04] px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-white/18 hover:bg-white/[0.08] hover:text-red-500"
            >
              Ver catÃ¡logo completo
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
                Disponibilidad y envÃ­os
              </h2>
              <p className="mb-8 leading-relaxed text-white/55">
                Entrega inmediata en {DELIVERY_INFO.immediate.join(", ")}.
                Sujeta a existencias. Los envÃ­os nacionales e internacionales se
                cotizan por separado y toda disponibilidad se confirma
                directamente por WhatsApp.
              </p>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
                <Link
                  href="/disponibilidad"
                  className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white shadow-[0_12px_30px_rgba(220,38,38,0.18)] transition-all duration-300 hover:bg-red-700"
                >
                  Ver detalles de envÃ­o
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
                },
                {
                  label: "Disponibilidad",
                  desc: "Sujeta a existencias y confirmaciÃ³n directa por WhatsApp",
                },
                {
                  label: "EnvÃ­os",
                  desc: "Cobertura nacional e internacional con costo adicional",
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  className={`${premiumCard} ${premiumHover} ${subtleOverlay} bg-[#111] p-6`}
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-2 h-2.5 w-2.5 rounded-full bg-red-500" />
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
                  Nuestra visiÃ³n
                </p>
                <h3 className="mb-4 text-2xl font-bold text-white">
                  Construir una marca referente en MÃ©xico
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-white/55">
                  Posicionar a {BRAND.name} como una marca referente en gorras
                  premium dentro de MÃ©xico, combinando diseÃ±o, identidad, orden
                  comercial y una experiencia de compra confiable.
                </p>
                <Link
                  href="/nosotros"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-red-600 transition-colors duration-300 hover:text-white"
                >
                  Conocer mÃ¡s
                </Link>
              </motion.div>
            </motion.div>

            <motion.div variants={fadeUp} className="order-1 md:order-2">
              <p className="mb-3 text-xs uppercase tracking-[0.4em] text-red-600">
                Sobre nosotros
              </p>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Identidad, diseÃ±o y confianza
              </h2>
              <p className="leading-relaxed text-white/55">
                Somos una marca mexicana enfocada en ofrecer gorras premium con
                identidad propia. Apostamos por una imagen sÃ³lida, una operaciÃ³n
                seria y una propuesta pensada para clientes que valoran estilo,
                exclusividad y atenciÃ³n directa.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

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
              Mensajes cortos, claros y directos que transmiten atenciÃ³n,
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
                  â€œ{item.quote}â€
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
                q: "Â¿CÃ³mo puedo realizar un pedido?",
                a: "ContÃ¡ctanos directamente por WhatsApp seleccionando el producto que te interesa. AhÃ­ confirmamos disponibilidad, pago y entrega.",
              },
              {
                q: "Â¿CÃ³mo manejan entregas y envÃ­os?",
                a: `Entrega inmediata en ${DELIVERY_INFO.immediate.join(", ")}, sujeta a existencias y coordinaciÃ³n directa. TambiÃ©n realizamos envÃ­os nacionales e internacionales con costo extra.`,
              },
              {
                q: "Â¿Las fotos corresponden al producto real?",
                a: "SÃ­. Las fotografÃ­as del catÃ¡logo corresponden a los modelos reales disponibles.",
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

      <section className="relative border-y border-white/10 bg-[#090909] py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(220,38,38,0.08),transparent_22%)]" />
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={fadeUp}
          className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 220, damping: 24 }}
            className={`${premiumCard} ${premiumHover} ${subtleOverlay} bg-[#101010] px-6 py-10 md:px-8 md:py-12`}
          >
            <div className="grid gap-8 md:grid-cols-[1.15fr_0.85fr] md:items-center">
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.4em] text-red-600">
                  Canal B2B
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Mayoreo para tiendas y negocios
                </h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60 sm:text-base">
                  Si buscas comprar gorras por volumen para revender o surtir tu
                  negocio, conoce nuestra atenciÃ³n personalizada para mayoreo.
                  Atendemos tiendas, revendedores, boutiques, emprendedores,
                  marcas y otros negocios con seguimiento directo por WhatsApp.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
                    <Link
                      href="/mayoreo"
                      className="inline-flex items-center justify-center rounded-full bg-red-600 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-[0_12px_30px_rgba(220,38,38,0.18)] transition-all duration-300 hover:bg-red-700"
                    >
                      Ver mayoreo
                    </Link>
                  </motion.div>

                  <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
                    <a
                      href="https://wa.me/528335340498?text=Hola,%20quiero%20cotizar%20mayoreo%20con%20Salva%20Exclusive%20Caps."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.05] px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.1] hover:text-red-500"
                    >
                      Cotizar mayoreo por WhatsApp
                    </a>
                  </motion.div>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-1">
                {[
                  "AtenciÃ³n personalizada",
                  "Compra por volumen",
                  "SelecciÃ³n de modelos segÃºn negocio",
                  "EnvÃ­os nacionales e internacionales",
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-white/80"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

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
                Â¿Listo para elegir tu prÃ³xima gorra?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/60">
                Explora el catÃ¡logo o recibe atenciÃ³n directa por WhatsApp para
                confirmar disponibilidad, entrega o envÃ­o.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.985 }}>
                  <Link
                    href="/catalogo"
                    className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/92"
                  >
                    Ver catÃ¡logo
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
                  "AtenciÃ³n directa",
                  "EnvÃ­os nacionales e internacionales",
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