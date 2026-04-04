'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/catalogo', label: 'Catálogo' },
  { href: '/disponibilidad', label: 'Disponibilidad' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contacto', label: 'Contacto' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

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
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          isScrolled
            ? 'border-b border-white/10 bg-black/75 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.35)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-90"
            onClick={() => setIsOpen(false)}
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/15 bg-white/5">
              <Image
                src="/star-logo.png"
                alt="Salva Exclusive Caps"
                fill
                className="object-contain p-1.5"
                priority
              />
            </div>

            <div className="flex flex-col leading-none">
              <span className="text-sm font-medium uppercase tracking-[0.28em] text-white/60">
                Salva
              </span>
              <span className="text-base font-semibold tracking-[0.18em] text-white sm:text-lg">
                Exclusive Caps
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium tracking-wide text-white/80 transition-colors duration-200 hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              href="https://wa.me/528331234567?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20sus%20gorras."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white px-5 py-2.5 text-sm font-semibold text-black transition-all duration-200 hover:scale-[1.02] hover:bg-white/90"
            >
              Pedir por WhatsApp
            </Link>
          </div>

          <button
            type="button"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setIsOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white transition hover:bg-white/10 lg:hidden"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-xl transition-all duration-300 lg:hidden ${
          isOpen
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="flex h-full flex-col px-6 pt-28">
          <nav className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-white/10 pb-4 text-2xl font-semibold tracking-wide text-white/90 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8">
            <Link
              href="https://wa.me/528335340498?text=Hola,%20me%20interesa%20conocer%20la%20disponibilidad%20de%20sus%20gorras."
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-4 text-base font-semibold text-black transition hover:bg-white/90"
            >
              Pedir por WhatsApp
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
