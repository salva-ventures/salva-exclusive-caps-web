"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { CONTACT } from '@/config/brand';

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { href: '/', label: 'Inicio' },
    { href: '/catalogo', label: 'Catálogo' },
    { href: '/disponibilidad', label: 'Disponibilidad' },
    { href: '/nosotros', label: 'Nosotros' },
    { href: '/faq', label: 'FAQ' },
    { href: '/contacto', label: 'Contacto' },
  ];

  const waLink = `https://wa.me/${CONTACT.whatsapp.number.replace(/\+/g, '')}?text=${encodeURIComponent(CONTACT.whatsapp.defaultMessage)}`;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-sm border-b border-[#222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-white font-bold text-lg tracking-[0.2em] uppercase hover:text-red-600 transition-colors">
            SALVA<span className="text-red-600">.</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-6">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs tracking-widest uppercase transition-colors ${
                  pathname === link.href
                    ? 'text-red-600'
                    : 'text-[#888] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Social Icons */}
            <div className="flex items-center gap-3 ml-2 border-l border-[#333] pl-4">
              <a
                href={CONTACT.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#888] hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href={CONTACT.social.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#888] hover:text-white transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a
                href={CONTACT.social.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#888] hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>

            {/* WhatsApp Button */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300"
            >
              WhatsApp
            </a>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
            <div className={`w-5 h-0.5 bg-current transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-black border-t border-[#222] px-4 py-6 flex flex-col gap-4">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-widest uppercase transition-colors ${
                pathname === link.href ? 'text-red-600' : 'text-[#888] hover:text-white'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-[#222] pt-4 flex gap-4">
            <a
              href={CONTACT.social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-white text-sm"
            >
              Instagram
            </a>
            <a
              href={CONTACT.social.tiktokUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-white text-sm"
            >
              TikTok
            </a>
            <a
              href={CONTACT.social.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#888] hover:text-white text-sm"
            >
              Facebook
            </a>
          </div>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-3 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 text-center"
          >
            Consultar por WhatsApp
          </a>
        </div>
      )}
    </nav>
  );
}
