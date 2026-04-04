"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronRight } from "lucide-react";
import { CONTACT } from "@/config/brand";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/catalogo", label: "Catálogo" },
  { href: "/disponibilidad", label: "Disponibilidad" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/faq", label: "FAQ" },
  { href: "/contacto", label: "Contacto" },
];

const fadeDown = {
  hidden: { opacity: 0, y: -18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const mobilePanel = {
  hidden: { opacity: 0, y: -16, scale: 0.98 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.28,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: -12,
    scale: 0.98,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const waLink = `https://wa.me/${CONTACT.whatsapp.number.replace(/\+/g, "")}?text=${encodeURIComponent(CONTACT.whatsapp.defaultMessage)}`;

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const closeOnResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", closeOnResize);
    return () => window.removeEventListener("resize", closeOnResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <>
      <motion.header
        variants={fadeDown}
        initial="hidden"
        animate="show"
        className="sticky top-0 z-50 w-full"
      >
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <div
            className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
              isScrolled
                ? "border-white/12 bg-black/75 shadow-[0_18px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl"
                : "border-white/8 bg-black/45 backdrop-blur-lg"
            }`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.12),transparent_28%)]" />

            <div className="relative flex h-16 items-center justify-between px-4 sm:px-5 lg:h-[72px] lg:px-6">
              <Link href="/" className="group flex items-center gap-3">
                <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/10 bg-white/[0.04]">
                  <Image
                    src="/star-logo.png"
                    alt="Salva Exclusive Caps"
                    fill
                    className="object-contain p-1.5"
                    priority
                  />
                </div>

                <div className="hidden sm:block">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
                    Salva Exclusive Caps
                  </p>
                  <p className="mt-0.5 text-sm text-white/78">
                    Gorras premium
                  </p>
                </div>
              </Link>

              <nav className="hidden items-center gap-1 lg:flex">
                {navLinks.map((item) => (
                  <motion.div
                    key={item.href}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      href={item.href}
                      className="rounded-full px-4 py-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/68 transition-all duration-300 hover:bg-white/[0.05] hover:text-white"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="hidden lg:block">
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-red-600/30 bg-red-600 px-5 py-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-red-700"
                >
                  WhatsApp
                </motion.a>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] text-white transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] lg:hidden"
              >
                {isOpen ? <X size={19} /> : <Menu size={19} />}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              variants={mobilePanel}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed inset-x-4 top-[88px] z-50 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0b0b] shadow-[0_20px_60px_rgba(0,0,0,0.45)] lg:hidden"
            >
              <div className="border-b border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.12),transparent_35%)] px-5 py-5">
                <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                  Navegación
                </p>
                <h3 className="mt-2 text-xl font-semibold text-white">
                  Explora la marca
                </h3>
              </div>

              <div className="px-3 py-3">
                <div className="space-y-1">
                  {navLinks.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.2, delay: index * 0.04 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center justify-between rounded-2xl border border-transparent px-4 py-4 text-sm font-medium text-white/82 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04] hover:text-white"
                      >
                        <span>{item.label}</span>
                        <ChevronRight size={16} className="text-white/35" />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.a
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.24, delay: 0.16 }}
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-2xl border border-red-600 bg-red-600 px-5 py-4 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-red-700"
                >
                  Hablar por WhatsApp
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
