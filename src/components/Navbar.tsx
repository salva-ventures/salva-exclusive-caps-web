"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronRight } from "lucide-react";
import { CONTACT } from "@/config/brand";
import { supabase } from "@/lib/supabase/client";

const baseNavLinks = [
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
  hidden: { opacity: 0, y: -16, scale: 0.985 },
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
    scale: 0.985,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
};

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hasCustomerSession, setHasCustomerSession] = useState(false);

  const waLink = `https://wa.me/${CONTACT.whatsapp.number.replace(/\+/g, "")}?text=${encodeURIComponent(CONTACT.whatsapp.defaultMessage)}`;

  const navLinks = [
    ...baseNavLinks,
    { href: hasCustomerSession ? "/cuenta" : "/acceso", label: "Cuenta" },
  ];

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
          className="h-4 w-4"
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
          className="h-4 w-4"
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
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M12 2A10 10 0 0 0 3.33 17l-1.1 4.02 4.12-1.08A10 10 0 1 0 12 2Zm0 18.18a8.13 8.13 0 0 1-4.14-1.13l-.3-.18-2.45.64.65-2.39-.2-.31A8.18 8.18 0 1 1 12 20.18Zm4.48-6.1c-.25-.12-1.48-.73-1.71-.81-.23-.09-.39-.12-.56.12-.16.23-.64.8-.78.96-.14.16-.28.19-.53.07-.25-.12-1.04-.38-1.98-1.21-.73-.65-1.22-1.45-1.36-1.69-.14-.23-.01-.36.1-.48.1-.1.23-.28.35-.42.11-.14.15-.23.23-.39.07-.16.03-.3-.02-.42-.07-.12-.56-1.34-.77-1.83-.2-.48-.4-.41-.56-.42h-.48c-.16 0-.42.06-.64.3-.22.23-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.68 2.57 4.08 3.6.57.25 1.01.39 1.36.5.57.18 1.09.15 1.5.09.46-.07 1.48-.6 1.69-1.18.21-.58.21-1.08.14-1.18-.07-.09-.23-.14-.48-.26Z" />
        </svg>
      ),
    },
  ];

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

  useEffect(() => {
    let mounted = true;

    async function loadSession() {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;
      setHasCustomerSession(Boolean(data.session));
    }

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setHasCustomerSession(Boolean(session));
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <motion.header
        variants={fadeDown}
        initial="hidden"
        animate="show"
        className="relative z-50 w-full lg:sticky lg:top-0"
      >
        <div className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8">
          <div
            className={`relative overflow-hidden rounded-[1.4rem] border transition-all duration-300 ${
              isScrolled
                ? "border-white/12 bg-black/78 shadow-[0_20px_60px_rgba(0,0,0,0.36)] backdrop-blur-xl"
                : "border-white/8 bg-black/48 backdrop-blur-lg"
            }`}
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.12),transparent_26%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_32%,transparent_70%,rgba(255,255,255,0.02))]" />
            <div className="pointer-events-none absolute inset-0 opacity-[0.03] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.6px,transparent_0.6px)] [background-size:18px_18px]" />
            <div className="pointer-events-none absolute inset-0 rounded-[1.4rem] ring-1 ring-inset ring-white/[0.03]" />

            <div className="relative flex h-[72px] items-center justify-between px-4 sm:px-5 lg:h-[72px] lg:px-6">
              <Link href="/" className="group flex items-center gap-3">
                <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/10 bg-white/[0.05] shadow-[0_8px_20px_rgba(0,0,0,0.18)]">
                  <Image
                    src="/star-logo.png"
                    alt="Salva Exclusive Caps"
                    fill
                    className="object-contain p-1.5 transition-transform duration-300 group-hover:scale-[1.04]"
                    priority
                  />
                </div>

                <div className="hidden sm:block">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/45">
                    Salva Exclusive Caps
                  </p>
                  <p className="mt-0.5 text-sm text-white/80">Gorras premium</p>
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

              <div className="hidden items-center gap-3 lg:flex">
                <div className="flex items-center gap-2">
                  {socialLinks.map((item) => (
                    <motion.a
                      key={item.name}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={item.ariaLabel}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/[0.05] text-white/85 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.1] hover:text-red-500"
                    >
                      {item.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen((prev) => !prev)}
                aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-all duration-300 hover:border-white/22 hover:bg-white/[0.08] lg:hidden"
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
              className="fixed inset-0 z-40 bg-black/72 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              variants={mobilePanel}
              initial="hidden"
              animate="show"
              exit="exit"
              className="fixed inset-x-4 top-[88px] z-50 max-h-[calc(100dvh-104px)] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#0b0b0b] shadow-[0_24px_70px_rgba(0,0,0,0.48)] lg:hidden"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.12),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_28%,transparent_72%,rgba(255,255,255,0.02))]" />
              <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/[0.03]" />

              <div className="relative flex max-h-[calc(100dvh-104px)] flex-col">
                <div className="border-b border-white/10 px-5 py-5">
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                    Navegación
                  </p>
                  <h3 className="mt-2 text-xl font-semibold text-white">
                    Explora la marca
                  </h3>
                </div>

                <div className="flex-1 overflow-y-auto px-3 py-3 pb-5">
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
                          className="flex items-center justify-between rounded-2xl border border-transparent px-4 py-4 text-sm font-medium text-white/82 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.05] hover:text-white"
                        >
                          <span>{item.label}</span>
                          <ChevronRight size={16} className="text-white/35" />
                        </Link>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-4 flex items-center justify-center gap-3">
                    {socialLinks.map((item, index) => (
                      <motion.a
                        key={item.name}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.22, delay: 0.1 + index * 0.04 }}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                        aria-label={item.ariaLabel}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/14 bg-white/[0.05] text-white/85 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.1] hover:text-red-500"
                      >
                        {item.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}