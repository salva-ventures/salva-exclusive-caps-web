"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const badgeText = product.featured ? "Destacado" : "Disponible";

  return (
    <motion.div
      layout
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="h-full"
    >
      <Link href={`/catalogo/${product.slug}`} className="group block h-full">
        <article className="relative flex h-full flex-col overflow-hidden rounded-[24px] border border-white/10 bg-[#0b0b0b] transition-colors duration-300 hover:border-red-600/60 hover:shadow-[0_18px_60px_rgba(0,0,0,0.45)]">
          <motion.div
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.10),transparent_40%)]"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.28 }}
          />

          <div className="relative aspect-[4/4.2] overflow-hidden bg-[#080808]">
            <motion.div
              className="h-full w-full bg-cover bg-center"
              style={{
                backgroundImage: `url(${product.images[0]})`,
              }}
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80" />

            <div className="absolute left-4 top-4 flex flex-wrap gap-2">
              <motion.span
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.24 }}
                className="rounded-full border border-red-600/40 bg-red-600/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-red-400 backdrop-blur-sm"
              >
                {badgeText}
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.24, delay: 0.04 }}
                className="rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/80 backdrop-blur-sm"
              >
                {product.tipo}
              </motion.span>
            </div>

            <motion.div
              whileHover={{ scale: 1.08, rotate: 4 }}
              transition={{ type: "spring", stiffness: 280, damping: 18 }}
              className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white/75 backdrop-blur-sm"
            >
              <ArrowUpRight size={16} />
            </motion.div>
          </div>

          <div className="relative flex flex-1 flex-col p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
                {product.brand}
              </p>

              <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                {product.sku}
              </p>
            </div>

            <h3 className="text-lg font-semibold leading-tight text-white transition-colors duration-300 group-hover:text-red-400">
              {product.name}
            </h3>

            <p className="mt-3 line-clamp-3 text-sm leading-6 text-white/58">
              {product.shortDescription}
            </p>

            <motion.div layout className="mt-5 flex flex-wrap gap-2">
              {product.colors.slice(0, 3).map((color) => (
                <motion.span
                  layout
                  key={color}
                  whileHover={{ y: -2 }}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/60 transition-all duration-300 group-hover:border-white/20 group-hover:text-white/80"
                >
                  {color}
                </motion.span>
              ))}
            </motion.div>

            <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-4">
              <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-red-500">
                <Sparkles size={13} />
                Ver detalle
              </div>

              <span className="text-xs text-white/40 transition-colors duration-300 group-hover:text-white/70">
                Exclusiva
              </span>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
