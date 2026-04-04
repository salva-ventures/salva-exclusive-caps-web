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
import { motion } from "motion/react";
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
      duration: 0.55,
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
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function HomePage() {
  const featured = getFeaturedProducts();
  const waLink = `https://wa.me/${CONTACT.whatsapp.number.replace(/\+/g, "")}?text=${encodeURIComponent(CONTACT.whatsapp.defaultMessage)}`;

  return (
    <div className="bg-black">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#040404,#000000)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.05),transparent_20%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_18%,transparent_82%,rgba(255,255,255,0.02))]" />

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24"
        >
          <div className="max-w-2xl">
            <motion.div
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur"
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
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-600/30 bg-red-600/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-red-500"
            >
              <Sparkles className="h-3.5 w-3.5" />
              Diseño, presencia y carácter
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl"
            >
              Gorras exclusivas
              <span className="block text-red-600">con presencia real.</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-white/90 sm:text-xl"
            >
              {BRAND.tagline}
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base"
            >
              {BRAND.subtitle}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/catalogo"
                  className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90"
                >
                  Ver catálogo
                </Link>
              </motion.div>

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:border-red-600 hover:bg-white/10 hover:text-red-500"
                >
                  Consultar por WhatsApp
                </a>
              </motion.div>
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
                  className="rounded-2xl border border-white/8 bg-white/[0.02] p-4"
                >
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/40">
                    {item.label}
                  </p>
                  <p className="mt-2 text-sm font-medium text-white/85">
                    {item.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={softScale} className="relative">
            <div className="absolute -inset-8 rounded-[2.5rem] bg-red-600/10 blur-3xl" />
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_30px_90px_rgba(0,0,0,0.55)]"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="relative aspect-[4/5] w-full">
                <HeroImageRotator />
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/50">
                    Selección destacada
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white sm:text-xl">
                    Diseño, presencia y carácter
                  </p>
                </div>

                <motion.div
                  whileHover={{ scale: 1.04 }}
                  className="hidden rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-white/80 backdrop-blur sm:block"
                >
                  Premium
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Trust */}
      <section className="border-b border-white/10 bg-[#070707]">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8"
        >
          <motion.div variants={fadeUp} className="mx-auto mb-12 max-w-3xl text-center">
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
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 240, damping: 22 }}
                  className="group rounded-[1.75rem] border border-white/10 bg-[#0d0d0d] p-7 hover:border-red-600/50 hover:shadow-[0_18px_50px_rgba(0,0,0,0.3)]"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-600/20 bg-red-600/10 text-red-500">
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
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="mb-12 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <motion.div variants={fadeUp} className="max-w-2xl">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-red-600">
              Colección
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Productos destacados
            </h2>
            <p className="leading-relaxed text-white/55">
              Una selección de modelos representativos de la propuesta de {BRAND.name}, con diseño, presencia y carácter.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 self-start rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-red-600 hover:text-red-500"
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
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featured.slice(0, 8).map((product) => (
            <motion.div key={product.id} variants={fadeUp}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Availability */}
      <section className="border-y border-white/10 bg-[#080808] py-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
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
                Entrega inmediata en {DELIVERY_INFO.immediate.join(", ")}. Sujeta a existencias. Los envíos nacionales e internacionales se cotizan por separado y toda disponibilidad se confirma directamente por WhatsApp.
              </p>
              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/disponibilidad"
                  className="inline-flex items-center justify-center rounded-full bg-red-600 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-red-700"
                >
                  Ver detalles de envío
                </Link>
              </motion.div>
            </motion.div>

            <motion.div variants={staggerContainer} className="grid grid-cols-1 gap-4">
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
                  className="rounded-[1.5rem] border border-white/10 bg-[#111] p-6 transition-all duration-300 hover:border-red-600/40"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl">{item.icon}</span>
                    <div>
                      <h3 className="mb-1 text-sm font-semibold uppercase tracking-[0.18em] text-white">
                        {item.label}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/55">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* About */}
      <section className="py-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <motion.div variants={fadeUp} className="order-2 md:order-1">
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className="rounded-[1.75rem] border border-white/10 bg-[#111] p-8 shadow-[0_18px_50px_rgba(0,0,0,0.25)]"
              >
                <p className="mb-3 text-xs uppercase tracking-[0.35em] text-red-600">
                  Nuestra visión
                </p>
                <h3 className="mb-4 text-2xl font-bold text-white">
                  Construir una marca referente en México
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-white/55">
                  Posicionar a {BRAND.name} como una marca referente en gorras premium dentro de México, combinando diseño, identidad, orden comercial y una experiencia de compra confiable.
                </p>
                <Link
                  href="/nosotros"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-red-600 transition-colors hover:text-white"
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
                Somos una marca mexicana enfocada en ofrecer gorras premium con identidad propia. Apostamos por una imagen sólida, una operación seria y una propuesta pensada para clientes que valoran estilo, exclusividad y atención directa.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-white/10 bg-[#0a0a0a] py-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={staggerContainer}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={fadeUp} className="mx-auto mb-12 max-w-3xl text-center">
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
                whileHover={{ y: -6 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className="rounded-[1.75rem] border border-white/10 bg-[#111] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.22)] hover:border-red-600/40"
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
      <section className="border-y border-white/10 bg-[#0a0a0a] py-24">
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
                className="rounded-[1.5rem] border border-white/10 bg-[#111] p-6 transition-all duration-300 hover:border-red-600/35"
              >
                <p className="mb-2 text-sm font-semibold text-white">{item.q}</p>
                <p className="text-sm leading-relaxed text-white/55">{item.a}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="mt-8 text-center"
          >
            <Link
              href="/faq"
              className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/[0.03] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-red-600 hover:text-red-600"
            >
              Ver todas las preguntas
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={fadeUp}
          className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
        >
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="relative overflow-hidden rounded-[2rem] border border-red-600/20 bg-gradient-to-br from-[#111] via-[#0b0b0b] to-[#161616] px-6 py-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:px-10 md:py-16"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.18),transparent_30%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent,rgba(255,255,255,0.01))]" />

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
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/catalogo"
                    className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-white/90"
                  >
                    Ver catálogo
                  </Link>
                </motion.div>

                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:border-red-600 hover:bg-white/10 hover:text-red-500"
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
    </div>
  );
}
