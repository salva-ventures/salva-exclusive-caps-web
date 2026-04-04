import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#222] py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-white font-bold text-xl tracking-[0.2em] uppercase mb-4">
              SALVA<span className="text-red-600">.</span>
            </h3>
            <p className="text-[#888] text-sm leading-relaxed max-w-xs">
              Gorras premium con identidad propia. Diseño, exclusividad y una experiencia de compra distinta dentro del mercado mexicano.
            </p>
          </div>
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-4">Navegación</h4>
            <ul className="space-y-2">
              {[
                { href: '/catalogo', label: 'Catálogo' },
                { href: '/drops', label: 'Drops' },
                { href: '/lookbook', label: 'Lookbook' },
                { href: '/disponibilidad', label: 'Disponibilidad' },
                { href: '/nosotros', label: 'Nosotros' },
                { href: '/faq', label: 'FAQ' },
              ].map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="text-[#888] text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-4">Contacto</h4>
            <ul className="space-y-2 text-[#888] text-sm">
              <li>
                <a
                  href="https://wa.me/521XXXXXXXXXX"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a href="mailto:contacto@salvaexclusivecaps.com" className="hover:text-white transition-colors">
                  Email
                </a>
              </li>
              <li>
                <Link href="/contacto" className="hover:text-white transition-colors">
                  Formulario de Contacto
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#222] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#888] text-xs">
            © 2024 Salva Exclusive Caps. Todos los derechos reservados.
          </p>
          <p className="text-[#888] text-xs">
            Tampico, Tamaulipas — México
          </p>
        </div>
      </div>
    </footer>
  );
}
