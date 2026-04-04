"use client";

import { use, useMemo, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  ArrowUpRight,
  CheckCircle2,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Tag,
} from "lucide-react";
import { CONTACT } from "@/config/brand";
import { getProductBySlug, products } from "@/data/products";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
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

export default function ProductDetailPage({ params }: Props) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);

  if (!product) notFound();

  const [activeImage, setActiveImage] = useState(0);

  const waMessage = encodeURIComponent(
    `Hola, me interesa la gorra "${product.name}" (SKU: ${product.sku}). ¿Está disponible?`
  );
  const waLink = `https://wa.me/${CONTACT.whatsapp.number.replace(/\+/g, "")}?text=${waMessage}`;

  const relatedProducts = useMemo(
    () =>
      product.relatedSlugs
        .map((relatedSlug) => products.find((p) => p.slug === relatedSlug))
        .filter((p): p is NonNullable<typeof p> => Boolean(p))
        .slice(0, 4),
    [product]
  );

  return (
    <div className="min-h-screen bg-black">
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#060606,#000000)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.04),transparent_20%)]" />

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer}
          className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14"
        >
          <motion.div variants={fadeUp} className="mb-8">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.24em] text-white/70 transition-all duration-300 hover:border-red-600/40 hover:text-red-500"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al catálogo
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-14">
            {/* Gallery */}
            <motion.div variants={fadeUp}>
              <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0b] shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.12),transparent_38%)]" />

                <div className="relative aspect-[1/1] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={product.images[activeImage]}
                      initial={{ opacity: 0, scale: 1.03 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.985 }}
                      transition={{ duration: 0.35 }}
                      className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]"
                      style={{
                        backgroundImage: `url(${product.images[activeImage]})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                      }}
                    />
                  </AnimatePresence>

                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent" />

                  <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                    <span className="rounded-full border border-red-600/35 bg-red-600/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-red-400 backdrop-blur-sm">
                      {product.featured ? "Destacado" : "Disponible"}
                    </span>

                    <span className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm">
                      {product.tipo}
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">
                        {product.brand}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-white">
                        {product.name}
                      </p>
                    </div>

                    <div className="hidden rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-white/80 backdrop-blur sm:block">
                      SKU {product.sku}
                    </div>
                  </div>
                </div>
              </div>

              {product.images.length > 1 && (
                <motion.div
                  variants={fadeUp}
                  className="mt-4 grid grid-cols-4 gap-3"
                >
                  {product.images.map((img, i) => {
                    const isActive = activeImage === i;

                    return (
                      <motion.button
                        key={img + i}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActiveImage(i)}
                        className={`relative aspect-square overflow-hidden rounded-2xl border transition-all duration-300 ${
                          isActive
                            ? "border-red-600 shadow-[0_0_25px_rgba(220,38,38,0.25)]"
                            : "border-white/10 hover:border-white/25"
                        }`}
                      >
                        <div
                          className="h-full w-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]"
                          style={{
                            backgroundImage: `url(${img})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                          }}
                        />
                        <div
                          className={`absolute inset-0 transition-all duration-300 ${
                            isActive ? "bg-black/10" : "bg-black/35 hover:bg-black/20"
                          }`}
                        />
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </motion.div>

            {/* Product Info */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="flex flex-col"
            >
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                <span className="rounded-full border border-red-600/30 bg-red-600/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-red-400">
                  {product.tipo}
                </span>

                <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/65">
                  {product.brand}
                </span>

                {product.collab && (
                  <span className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-white/65">
                    Colab: {product.collab}
                  </span>
                )}
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-5 text-3xl font-bold tracking-tight text-white md:text-5xl"
              >
                {product.name}
              </motion.h1>

              <motion.div
                variants={fadeUp}
                className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/45"
              >
                <div className="inline-flex items-center gap-2">
                  <Tag className="h-4 w-4 text-red-500" />
                  SKU: {product.sku}
                </div>

                <div className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-red-500" />
                  Verificación directa por WhatsApp
                </div>
              </motion.div>

              <motion.p
                variants={fadeUp}
                className="mt-7 text-base leading-8 text-white/62"
              >
                {product.shortDescription}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-6"
              >
                <div className="mb-4 flex items-center gap-2 text-red-500">
                  <Sparkles className="h-4 w-4" />
                  <span className="text-[11px] uppercase tracking-[0.24em]">
                    Detalles rápidos
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                      Marca
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      {product.brand}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                    <p className="text-[10px] uppercase tracking-[0.22em] text-white/40">
                      Categoría
                    </p>
                    <p className="mt-2 text-sm font-medium text-white">
                      {product.tipo}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={fadeUp} className="mt-8">
                <p className="mb-3 text-[11px] uppercase tracking-[0.28em] text-white/45">
                  Colores
                </p>

                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <motion.span
                      key={color}
                      whileHover={{ y: -2 }}
                      className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[11px] uppercase tracking-[0.18em] text-white/70"
                    >
                      {color}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-8 rounded-[1.75rem] border border-white/10 bg-[#0d0d0d] p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-red-600/20 bg-red-600/10 text-red-500">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold text-white">
                      Disponibilidad y confirmación
                    </h2>
                    <p className="mt-3 text-sm leading-7 text-white/55">
                      La disponibilidad depende del modelo y existencias al momento
                      de confirmar. Te atendemos directamente por WhatsApp para
                      validar stock, entrega o envío.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2"
              >
                <motion.a
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.98 }}
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-red-700"
                >
                  <MessageCircle className="h-4 w-4" />
                  Consultar por WhatsApp
                </motion.a>

                <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.98 }}>
                  <Link
                    href="/catalogo"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-8 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-red-600/40 hover:text-red-500"
                  >
                    Volver al catálogo
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </motion.div>
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-6 flex flex-wrap gap-3 text-xs text-white/45"
              >
                <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-2 uppercase tracking-[0.18em]">
                  Atención directa
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-2 uppercase tracking-[0.18em]">
                  Entrega sujeta a existencias
                </span>
                <span className="rounded-full border border-white/10 bg-white/[0.02] px-3 py-2 uppercase tracking-[0.18em]">
                  Envíos disponibles
                </span>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.12 }}
            variants={staggerContainer}
            className="border-t border-white/10 pt-16"
          >
            <motion.div
              variants={fadeUp}
              className="mb-12 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between"
            >
              <div className="max-w-2xl">
                <p className="mb-3 text-xs uppercase tracking-[0.4em] text-red-600">
                  Relacionados
                </p>
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                  Productos similares
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/55">
                  Más opciones dentro de la misma línea visual y propuesta de la
                  colección.
                </p>
              </div>

              <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
                <Link
                  href="/catalogo"
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.03] px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-red-600 hover:text-red-500"
                >
                  Ver catálogo completo
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </motion.div>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {relatedProducts.map((relatedProduct) => (
                <motion.div key={relatedProduct.id} variants={fadeUp}>
                  <ProductCard product={relatedProduct} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </section>
      )}
    </div>
  );
}

export default function CatalogoPage() {
  return <CatalogoClient />;
}
