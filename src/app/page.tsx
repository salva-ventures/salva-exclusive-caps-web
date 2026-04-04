import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/data/products';
import { BRAND, CONTACT, DELIVERY_INFO } from '@/config/brand';

export default function HomePage() {
  const featured = getFeaturedProducts();
  const waLink = `https://wa.me/${CONTACT.whatsapp.number.replace(/\+/g, '')}?text=${encodeURIComponent(CONTACT.whatsapp.defaultMessage)}`;

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] to-black" />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-6">Tampico, México — Est. 2024</p>
          <h1 className="text-white font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-6">
            {BRAND.shortName}<br />
            <span className="text-red-600">EXCLUSIVE</span><br />
            CAPS
          </h1>
          <p className="text-white text-xl md:text-2xl font-medium max-w-2xl mx-auto mb-4 leading-tight">
            {BRAND.tagline}
          </p>
          <p className="text-[#888] text-sm md:text-base max-w-xl mx-auto mb-10 leading-relaxed">
            {BRAND.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalogo"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300"
            >
              Ver Catálogo
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white hover:border-red-600 hover:text-red-600 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-3">Colección</p>
          <h2 className="text-white font-bold text-3xl md:text-4xl tracking-tight">Productos Destacados</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featured.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/catalogo"
            className="border border-white hover:border-red-600 hover:text-red-600 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 inline-block"
          >
            Ver Catálogo Completo
          </Link>
        </div>
      </section>

      {/* Availability Preview */}
      <section className="py-24 bg-[#0a0a0a] border-y border-[#222]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-3">Entregas</p>
              <h2 className="text-white font-bold text-3xl md:text-4xl tracking-tight mb-6">Disponibilidad y Envíos</h2>
              <p className="text-[#888] leading-relaxed mb-8">
                Entregamos en {DELIVERY_INFO.immediate.join(', ')} de forma inmediata. También realizamos envíos a todo México e internacional.
              </p>
              <Link
                href="/disponibilidad"
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 inline-block"
              >
                Ver Detalles de Envío
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {[
                { label: 'Entrega Inmediata', desc: DELIVERY_INFO.immediate.join(', '), icon: '📍' },
                { label: 'Envío Nacional', desc: 'A cualquier estado de México con costo extra', icon: '🇲🇽' },
                { label: 'Envío Internacional', desc: 'A cualquier país con costo extra', icon: '✈️' },
              ].map(item => (
                <div key={item.label} className="bg-[#111] border border-[#222] p-5 flex items-start gap-4">
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="text-white font-medium text-sm mb-1">{item.label}</h3>
                    <p className="text-[#888] text-xs">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="bg-[#111] border border-[#222] p-8">
                <h3 className="text-white font-bold text-xl mb-4">Nuestra Visión</h3>
                <p className="text-[#888] text-sm leading-relaxed mb-6">
                  Posicionar a {BRAND.name} como la marca referente en México en gorras premium, combinando diseño, identidad y una experiencia de compra sólida, moderna y confiable.
                </p>
                <Link
                  href="/nosotros"
                  className="text-red-600 hover:text-white text-xs tracking-widest uppercase transition-colors inline-flex items-center gap-2"
                >
                  Conocer más
                  <span>→</span>
                </Link>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-3">Sobre Nosotros</p>
              <h2 className="text-white font-bold text-3xl md:text-4xl tracking-tight mb-6">
                Identidad, Diseño y Confianza
              </h2>
              <p className="text-[#888] leading-relaxed">
                Somos una marca mexicana enfocada en ofrecer gorras premium con identidad propia. Combinamos estilo urbano con calidad superior y un servicio comprometido con cada cliente.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="py-24 bg-[#0a0a0a] border-y border-[#222]">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-12 text-center">
            <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-3">Preguntas</p>
            <h2 className="text-white font-bold text-3xl md:text-4xl tracking-tight">Preguntas Frecuentes</h2>
          </div>
          <div className="space-y-px">
            {[
              { q: '¿Cómo puedo realizar un pedido?', a: 'Contáctanos directamente por WhatsApp seleccionando el producto que te interesa. Te confirmamos disponibilidad y coordinamos el pago y entrega.' },
              { q: '¿Cuánto tiempo tarda el envío?', a: `Entrega inmediata en ${DELIVERY_INFO.immediate.join(', ')}. Los envíos nacionales tardan 3-7 días hábiles según la ubicación.` },
              { q: '¿Las fotos corresponden al producto real?', a: 'Sí, todas las fotografías en nuestro catálogo son de los productos reales que vendemos. Lo que ves es lo que recibes.' },
            ].map((item, i) => (
              <div key={i} className="bg-[#111] border border-[#222] p-5">
                <p className="text-white font-medium text-sm mb-2">{item.q}</p>
                <p className="text-[#888] text-sm">{item.a}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="border border-white hover:border-red-600 hover:text-red-600 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 inline-block"
            >
              Ver Todas las Preguntas
            </Link>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-4">Hablemos</p>
          <h2 className="text-white font-bold text-4xl md:text-5xl tracking-tight mb-6">¿Tienes dudas?</h2>
          <p className="text-[#888] text-lg mb-10 leading-relaxed">
            Contáctanos por WhatsApp para consultas, confirmación de disponibilidad o cualquier pregunta sobre nuestros productos.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 inline-block"
            >
              Consultar por WhatsApp
            </a>
            <Link
              href="/contacto"
              className="border border-white hover:border-red-600 hover:text-red-600 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 inline-block"
            >
              Información de Contacto
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
