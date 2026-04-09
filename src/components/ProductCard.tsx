"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Product } from "@/data/products";

type ProductCardProduct = Product & {
  image?: string;
  gallery?: Array<{
    public_url: string;
    sort_order: number;
    is_primary: boolean;
  }>;
};

interface ProductCardProps {
  product: ProductCardProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  const badgeText = product.featured ? "Destacado" : "Disponible";

  const primaryImage =
    product.image || product.images?.[0] || "/branding/hero-star.png";

  const gallery = product.gallery ?? [];
  const galleryPreview = gallery.slice(0, 4);

  return (
    <motion.div
      layout
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="h-full"
    >
      <Link href={`/catalogo/${product.slug}`} className="group block h-full">
        <article className="relative flex h-full flex-col overflow-hidden rounded-[26px] border border-white/10 bg-[#0b0b0b] shadow-[0_18px_50px_rgba(0,0,0,0.28),0_8px_20px_rgba(0,0,0,0.12)] transition-all duration-300 hover:border-white/15 hover:shadow-[0_28px_70px_rgba(0,0,0,0.38),0_10px_24px_rgba(0,0,0,0.16)]">
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.015)_24%,transparent_52%)]" />
          <div className="pointer-events-none absolute inset-0 rounded-[26px] ring-1 ring-inset ring-white/[0.03]" />

          <motion.div
            className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.08),transparent_38%)]"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.28 }}
          />

          <div className="relative aspect-[4/4.25] overflow-hidden bg-[#080808]">
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-full w-full"
            >
              <Image
                src={primaryImage}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="object-cover"
              />
            </motion.div>

            <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(to_top,rgba(0,0,0,0.72),rgba(0,0,0,0.16)_42%,rgba(0,0,0,0.04))]" />
            <div className="pointer-events-none absolute inset-x-10 top-4 z-[2] h-16 rounded-full bg-white/8 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 z-[2] opacity-[0.035] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.6px,transparent_0.6px)] [background-size:18px_18px]" />

            <div className="absolute left-4 top-4 z-10 flex flex-wrap gap-2">
              <motion.span
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.24 }}
                className={`relative overflow-hidden rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur-sm ${
                  product.featured
                    ? "border-red-600/35 bg-red-600/12 text-red-400"
                    : "border-white/14 bg-black/35 text-white/78"
                }`}
              >
                {product.featured && (
                  <span className="pointer-events-none absolute inset-y-0 left-[-140%] w-[75%] skew-x-[-20deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.22),transparent)] animate-[shine_4.8s_ease-in-out_infinite]" />
                )}
                <span className="relative z-10">{badgeText}</span>
              </motion.span>

              <motion.span
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.24, delay: 0.04 }}
                className="rounded-full border border-white/14 bg-black/35 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-white/78 backdrop-blur-sm"
              >
                {product.tipo}
              </motion.span>
            </div>

            <motion.div
              whileHover={{ scale: 1.06, rotate: 3 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/14 bg-black/35 text-white/75 backdrop-blur-sm transition-colors duration-300 group-hover:border-white/18 group-hover:text-white"
            >
              <ArrowUpRight size={16} />
            </motion.div>

            {galleryPreview.length > 1 && (
              <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
                {galleryPreview.map((img, index) => (
                  <span
                    key={`${img.public_url}-${index}`}
                    className={`h-2 w-2 rounded-full border ${
                      img.is_primary
                        ? "border-red-400 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.55)]"
                        : "border-white/30 bg-white/40"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="relative flex flex-1 flex-col p-5">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45">
                {product.brand}
              </p>

              <p className="text-[10px] uppercase tracking-[0.18em] text-white/32">
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
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-white/60 transition-all duration-300 group-hover:border-white/16 group-hover:bg-white/[0.05] group-hover:text-white/82"
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

              <span className="text-xs text-white/38 transition-colors duration-300 group-hover:text-white/70">
                {gallery.length > 1 ? `${gallery.length} vistas` : "Exclusiva"}
              </span>
            </div>
          </div>
        </article>
      </Link>

      <style jsx>{`
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
    </motion.div>
  );
}
