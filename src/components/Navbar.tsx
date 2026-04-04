'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import {
  Menu,
  X,
  MessageCircle,
  Instagram,
  Facebook,
  Music2,
} from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/disponibilidad', label: 'Disponibilidad' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contacto', label: 'Contacto' },
];

const WHATSAPP_NUMBER = '528335340498';
const WHATSAPP_MESSAGE =
  'Hola, me interesa conocer la disponibilidad de sus gorras.';

const INSTAGRAM_URL = 'https://www.instagram.com/salvaexclusive.caps/';
const FACEBOOK_URL = 'https://www.facebook.com/61588062491340';
const TIKTOK_URL = 'https://www.tiktok.com/@lehisalva';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const whatsappHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE
  )}`;

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };

    window.addEventListener('scroll', onScroll);
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'border-b border-white/10 bg-black/70 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.30)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/15 bg-white/5">
              <Image
                src="/star-logo.png"
                alt="Salva Exclusive Caps"
                fill
                className="object-contain p-1.5"
                priority
              />
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/60">
                Salva
              </span>
              <span className="text-sm font-semibold tracking-[0.18em] text-white sm:text-base">
                Exclusive Caps
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium tracking-wide text-white/80 transition-colors duration-200 hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <div className="flex items-center gap-2">
              <Link
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
              >
                <Instagram className="h-4 w-4" />
              </Link>

              <Link
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
              >
                <Facebook className="h-4 w-4" />
              </Link>

              <Link
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
              >
                <Music2 className="h-4 w-4" />
              </Link>
            </div>

            <Link
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:scale-[1.02] hover:bg-emerald-400"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <Link
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abrir WhatsApp"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-emerald-400/20 bg-emerald-500 text-black transition hover:bg-emerald-400"
            >
              <MessageCircle className="h-5 w-5" />
            </Link>

            <button
              type="button"
              aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((prev) => !prev)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/55 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-dvh w-[86%] max-w-sm border-l border-white/10 bg-black/95 p-6 backdrop-blur-2xl transition-transform duration-300 lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/15 bg-white/5">
              <Image
                src="/star-logo.png"
                alt="Salva Exclusive Caps"
                fill
                className="object-contain p-1.5"
                priority
              />
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/60">
                Salva
              </span>
              <span className="text-sm font-semibold tracking-[0.18em] text-white sm:text-base">
                Exclusive Caps
              </span>
            </div>
          </Link>

          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setIsOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-4 text-base font-medium tracking-wide text-white/90 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-6 border-t border-white/10 pt-6">
          <Link
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-500 px-6 py-4 text-base font-semibold text-black transition hover:bg-emerald-400"
          >
            <MessageCircle className="h-5 w-5" />
            Pedir por WhatsApp
          </Link>

          <div className="mt-4 flex items-center justify-center gap-3">
            <Link
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
            >
              <Instagram className="h-5 w-5" />
            </Link>

            <Link
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
            >
              <Facebook className="h-5 w-5" />
            </Link>

            <Link
              href={TIKTOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10"
            >
              <Music2 className="h-5 w-5" />
            </Link>
          </div>

          <p className="mt-3 text-sm leading-relaxed text-white/55">
            Entrega inmediata en Tampico, Madero, Altamira y Monterrey.
          </p>
        </div>
      </aside>
    </>
  );
}
