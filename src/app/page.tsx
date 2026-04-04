import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts } from '@/data/products';
import { drops } from '@/data/drops';

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section id="inicio" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] to-black"
          style={{
            backgroundImage: 'url(https://picsum.photos/seed/hero/1920/1080)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-6">Tampico, México — Est. 2024</p>
          <h1 className="text-white font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-6">
            SALVA<br />
            <span className="text-red-600">EXCLUSIVE</span><br />
            CAPS
          </h1>
          <p className="text-[#888] text-lg md:text-xl max-w-xl mx-auto mb-10 leading-relaxed">
            Gorras premium con identidad propia. Diseño, exclusividad y presencia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/catalogo"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300"
            >
              Ver Catálogo
            </Link>
            <Link
              href="/drops"
              className="border border-white hover:border-red-600 hover:text-red-600 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300"
            >
              Ver Drops
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Nav */}
      <section className="bg-[#0a0a0a] border-y border-[#222] py-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center gap-8 overflow-x-auto">
            {[
              { href: '#productos', label: 'Productos' },
              { href: '#drops', label: 'Drops' },
              { href: '#lookbook', label: 'Lookbook' },
              { href: '#disponibilidad', label: 'Disponibilidad' },
              { href: '#faq', label: 'FAQ' },
              { href: '#contacto', label: 'Contacto' },
            ].map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-[#888] hover:text-white text-xs tracking-widest uppercase whitespace-nowrap transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="productos" className="py-24 px-4 max-w-7xl mx-auto">
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

      {/* Drops Preview */}
      <section id="drops" className="py-24 bg-[#0a0a0a] border-y border-[#222]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-3">Lanzamientos</p>
            <h2 className="text-white font-bold text-3xl md:text-4xl tracking-tight">Drops</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {drops.map(drop => (
              <Link key={drop.id} href="/drops" className="group block">
                <div className="bg-[#111] border border-[#222] hover:border-red-600 transition-all duration-300 overflow-hidden">
                  <div
                    className="aspect-video bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] group-hover:scale-105 transition-transform duration-500"
                    style={{
                      backgroundImage: `url(${drop.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-xs tracking-widest uppercase ${
                        drop.status === 'active' ? 'text-red-600' :
                        drop.status === 'upcoming' ? 'text-[#888]' : 'text-[#444]'
                      }`}>
                        {drop.status === 'active' ? 'Disponible' : drop.status === 'upcoming' ? 'Próximamente' : 'Agotado'}
                      </span>
                    </div>
                    <h3 className="text-white font-bold text-sm tracking-widest mb-2">{drop.name}</h3>
                    <p className="text-[#888] text-xs leading-relaxed line-clamp-2">{drop.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/drops"
              className="border border-white hover:border-red-600 hover:text-red-600 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 inline-block"
            >
              Ver Todos los Drops
            </Link>
          </div>
        </div>
      </section>

      {/* Lookbook Preview */}
      <section id="lookbook" className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-12">
            <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-3">Editorial</p>
            <h2 className="text-white font-bold text-3xl md:text-4xl tracking-tight">Lookbook</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {['look1','look2','look3','look4','look5','look6','look7','look8'].map((seed, i) => (
              <div
                key={seed}
                className={`bg-[#111] overflow-hidden ${i === 0 || i === 5 ? 'row-span-2' : ''}`}
              >
                <div
                  className="w-full h-full min-h-[200px] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] hover:scale-105 transition-transform duration-500 cursor-pointer"
                  style={{
                    backgroundImage: `url(https://picsum.photos/seed/${seed}/600/600)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                />
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link
              href="/lookbook"
              className="border border-white hover:border-red-600 hover:text-red-600 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 inline-block"
            >
              Ver Lookbook Completo
            </Link>
          </div>
        </div>
      </section>

      {/* Availability Preview */}
      <section id="disponibilidad" className="py-24 bg-[#0a0a0a] border-y border-[#222]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-3">Entregas</p>
              <h2 className="text-white font-bold text-3xl md:text-4xl tracking-tight mb-6">Disponibilidad y Envíos</h2>
              <p className="text-[#888] leading-relaxed mb-8">
                Entregamos en Tampico, Madero, Altamira y Monterrey de forma inmediata. También realizamos envíos a todo México e internacional.
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
                { label: 'Entrega Inmediata', desc: 'Tampico, Madero, Altamira y Monterrey', icon: '📍' },
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

      {/* FAQ Preview */}
      <section id="faq" className="py-24">
        <div className="max-w-3xl mx-auto px-4">
          <div className="mb-12 text-center">
            <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-3">Preguntas</p>
            <h2 className="text-white font-bold text-3xl md:text-4xl tracking-tight">Preguntas Frecuentes</h2>
          </div>
          <div className="space-y-px">
            {[
              { q: '¿Cómo puedo realizar un pedido?', a: 'Puedes contactarnos directamente por WhatsApp o a través de nuestro formulario de contacto.' },
              { q: '¿Cuánto tiempo tarda el envío?', a: 'Entrega inmediata en Tampico, Madero, Altamira y Monterrey. Los envíos nacionales tardan 3-7 días hábiles.' },
              { q: '¿Las gorras son originales?', a: 'Sí, todas nuestras gorras son 100% originales y de alta calidad premium.' },
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
      <section id="contacto" className="py-24 bg-[#0a0a0a] border-t border-[#222]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-4">Hablemos</p>
          <h2 className="text-white font-bold text-4xl md:text-5xl tracking-tight mb-6">¿Tienes dudas?</h2>
          <p className="text-[#888] text-lg mb-10 leading-relaxed">
            Contáctanos por WhatsApp para cotizaciones, pedidos especiales o cualquier consulta.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/521XXXXXXXXXX?text=Hola,%20me%20interesa%20una%20gorra%20de%20Salva%20Exclusive%20Caps"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 inline-block"
            >
              Contactar por WhatsApp
            </a>
            <Link
              href="/contacto"
              className="border border-white hover:border-red-600 hover:text-red-600 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 inline-block"
            >
              Formulario de Contacto
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
