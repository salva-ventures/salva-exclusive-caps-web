import Link from 'next/link';
import { BRAND, CONTACT } from '@/config/brand';

export default function Footer() {
  const waLink = `https://wa.me/${CONTACT.whatsapp.number.replace(/\+/g, '')}?text=${encodeURIComponent(CONTACT.whatsapp.defaultMessage)}`;

  return (
    <footer className="bg-black border-t border-[#222] py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <h3 className="text-white font-bold text-xl tracking-[0.2em] uppercase mb-4">
              {BRAND.shortName}<span className="text-red-600">.</span>
            </h3>
            <p className="text-[#888] text-sm leading-relaxed max-w-xs mb-4">
              {BRAND.slogan}
            </p>
            <p className="text-[#666] text-xs leading-relaxed max-w-xs">
              Gorras premium con identidad propia. Diseño, exclusividad y una experiencia de compra sólida y moderna.
            </p>
          </div>
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-4">Navegación</h4>
            <ul className="space-y-2">
              {[
                { href: '/catalogo', label: 'Catálogo' },
                { href: '/disponibilidad', label: 'Disponibilidad' },
                { href: '/nosotros', label: 'Nosotros' },
                { href: '/faq', label: 'FAQ' },
                { href: '/contacto', label: 'Contacto' },
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
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-medium"
                >
                  {CONTACT.whatsapp.displayNumber}
                </a>
              </li>
              <li className="text-xs text-[#666]">WhatsApp</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white text-xs tracking-widest uppercase mb-4">Redes Sociales</h4>
            <ul className="space-y-2 text-[#888] text-sm">
              <li>
                <a
                  href={CONTACT.social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.social.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  TikTok
                </a>
              </li>
              <li>
                <a
                  href={CONTACT.social.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-[#222] pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#888] text-xs">
            © 2024 {BRAND.name}. Todos los derechos reservados.
          </p>
          <p className="text-[#888] text-xs">
            Tampico, Tamaulipas — México
          </p>
        </div>
      </div>
    </footer>
  );
}
