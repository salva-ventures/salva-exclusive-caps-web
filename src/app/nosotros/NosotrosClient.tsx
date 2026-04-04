"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { BRAND, CONTACT } from "@/config/brand";

const team = [
  {
    name: "Salva",
    role: "Comercial & Creativo",
    desc: "Lidera la parte comercial y creativa de la marca. Es la cara del negocio, impulsa la visión estética del proyecto y se enfoca en la relación directa con clientes, ventas y posicionamiento de la marca. Además, conoce de cerca este nicho de mercado, mantiene la relación directa con proveedores y coordina aspectos clave de envíos y redes sociales.",
  },
  {
    name: "Carlitos",
    role: "Operaciones, IT & Escalabilidad",
    desc: "Lidera la estructura operativa y tecnológica del negocio. Se enfoca en el orden interno, control administrativo, sistemas IT, contabilidad y desarrollo de procesos para dar solidez, trazabilidad y escalabilidad al proyecto.",
  },
];

const values = [
  {
    title: "Confianza",
    desc: "Construimos relaciones de largo plazo basadas en transparencia, cumplimiento y comunicación clara.",
  },
  {
    title: "Calidad",
    desc: "Cada gorra es seleccionada con criterio. Solo ofrecemos productos que nosotros mismos usaríamos.",
  },
  {
    title: "Crecimiento",
    desc: "Trabajamos con visión de escalabilidad, estructura y profesionalización constante del negocio.",
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

export default function NosotrosClient() {
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
            <Sparkles className="h-4 w-4" />
            La marca
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            Construimos marca, no solo catálogo
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-3xl text-sm leading-7 text-white/60 md:text-base"
          >
            {BRAND.name} nace con la intención de construir una marca de gorras
            exclusivas con identidad propia, estética fuerte y una propuesta
            visual distinta dentro del mercado mexicano.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/75">
              Marca premium
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/75">
              Identidad propia
            </span>
            <span className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/75">
              Visión de crecimiento
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
              <Target className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-white">Visión</h2>
            <p className="mt-3 text-sm leading-7 text-white/55">
              Posicionar a {BRAND.name} como la marca referente en México dentro
              del segmento de gorras premium, combinando diseño, identidad y una
              experiencia de compra sólida, moderna y confiable.
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
            <h2 className="mt-5 text-xl font-semibold text-white">Enfoque</h2>
            <p className="mt-3 text-sm leading-7 text-white/55">
              La marca busca combinar diseño, presencia, exclusividad y una
              experiencia de compra clara, confiable y bien cuidada.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 240, damping: 22 }}
            className="rounded-[1.75rem] border border-white/10 bg-[#0d0d0d] p-7"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-600/20 bg-red-600/10 text-red-500">
              <Users className="h-5 w-5" />
            </div>
            <h2 className="mt-5 text-xl font-semibold text-white">Equipo</h2>
            <p className="mt-3 text-sm leading-7 text-white/55">
              La marca combina creatividad comercial, criterio visual, orden
              interno y estructura operativa para crecer con una base seria.
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
          className="grid grid-cols-1 gap-10 lg:grid-cols-[0.95fr_1.05fr]"
        >
          <motion.div variants={fadeUp}>
            <div className="rounded-[2rem] border border-white/10 bg-[#111] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.25)] md:p-10">
              <p className="mb-3 text-xs uppercase tracking-[0.35em] text-red-600">
                Visión
              </p>

              <blockquote className="border-l-2 border-red-600 pl-6 md:pl-8">
                <p className="text-xl font-light italic leading-relaxed text-white md:text-2xl">
                  &ldquo;Posicionar a {BRAND.name} como la marca referente en
                  México en gorras premium, combinando diseño, identidad y una
                  experiencia de compra sólida, moderna y confiable.&rdquo;
                </p>
              </blockquote>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-red-600">
              Historia
            </p>
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
              Construimos una propuesta con visión seria
            </h2>

            <div className="space-y-5 text-sm leading-7 text-white/58 md:text-base">
              <p>
                Cada pieza es seleccionada con criterio editorial: no basta con
                que sea una gorra, tiene que representar estilo, exclusividad y
                actitud.
              </p>
              <p>
                Nuestra visión es posicionarnos como un referente en México
                dentro del segmento de gorras premium, elevando tanto el
                producto como la forma en que se presenta y se vende,
                construyendo relaciones de confianza con clientes y socios
                comerciales.
              </p>
              <p>
                Operamos con estructura, trazabilidad y una visión clara de
                crecimiento nacional. Esto no es solo venta de gorras: es la
                construcción de una marca sólida con proyección a largo plazo.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.08 }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="mb-8">
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-red-600">
              Equipo
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Las personas detrás
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {team.map((person) => (
              <motion.div
                key={person.name}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className="rounded-[1.75rem] border border-white/10 bg-[#111] p-8 shadow-[0_16px_40px_rgba(0,0,0,0.2)]"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-600/30 bg-red-600/10">
                  <span className="text-xl font-bold text-red-600">
                    {person.name[0]}
                  </span>
                </div>

                <h3 className="mb-1 text-xl font-bold text-white">
                  {person.name}
                </h3>

                <p className="mb-4 text-xs uppercase tracking-widest text-red-600">
                  {person.role}
                </p>

                <p className="text-sm leading-7 text-white/58">
                  {person.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="border-y border-white/10 bg-[#080808] py-20">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.12 }}
          variants={staggerContainer}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <p className="mb-3 text-xs uppercase tracking-[0.35em] text-red-600">
              Compromiso
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Nuestros valores
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map((value) => (
              <motion.div
                key={value.title}
                variants={fadeUp}
                whileHover={{ y: -4 }}
                className="rounded-[1.5rem] border border-white/10 bg-[#111] p-6 md:p-7"
              >
                <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-white">
                  {value.title}
                </h3>
                <p className="text-sm leading-7 text-white/58">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-20">
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
                Siguiente paso
              </p>

              <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                Conoce la colección completa
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-white/60">
                Explora el catálogo o escríbenos por WhatsApp para confirmar un
                modelo, revisar disponibilidad o resolver cualquier duda
                directamente.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/catalogo"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-red-700"
                  >
                    Ver catálogo
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </motion.div>

                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:border-red-600 hover:bg-white/10 hover:text-red-500"
                >
                  Hablar por WhatsApp
                </motion.a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
