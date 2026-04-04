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
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-black to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(220,38,38,0.12),transparent_35%)]" />
        <div className="absolute inset-0 bg-black/60" />

        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto pt-24 pb-20">
          <img
            src="/star-logo.png"
            alt="Logo estrella Salva Exclusive Caps"
            className="mx-auto mb-6 h-20 w-20 md:h-24 md:w-24 object-contain drop-shadow-[0_0_22px_rgba(220,38,38,0.35)]"
          />

          <p className="text-red-600 text-[11px] md:text-xs tracking-[0.45em] uppercase mb-4">
            Marca mexicana de gorras premium
          </p>

          <h1 className="text-white font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight leading-none mb-6">
            {BRAND.shortName}
            <br />
            <span className="text-red-600">EXCLUSIVE</span>
            <br />
            CAPS
          </h1>

          <p className="text-white text-lg md:text-2xl font-medium max-w-3xl mx-auto mb-4 leading-tight">
            {BRAND.tagline}
          </p>

          <p className="text-[#9a9a9a] text-sm md:text-base max-w-2xl mx-auto mb-10 leading-relaxed">
            {BRAND.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px max-w-4xl mx-auto border border-[#222] bg-[#222]">
            <div className="bg-[#0d0d0d] px-6 py-5">
              <p className="text-red-600 text-[10px] tracking-[0.3em] uppercase mb-2">Entrega inmediata</p>
              <p className="text-white text-sm leading-relaxed">
                {DELIVERY_INFO.immediate.join(', ')}
              </p>
            </div>
            <div className="bg-[#0d0d0d] px-6 py-5">
              <p className="text-red-600 text-[10px] tracking-[0.3em] uppercase mb-2">Cobertura</p>
              <p className="text-white text-sm leading-relaxed">
                Envíos nacionales e internacionales con costo extra
              </p>
            </div>
            <div className="bg-[#0d0d0d] px-6 py-5">
              <p className="text-red-600 text-[10px] tracking-[0.3em] uppercase mb-2">Confirmación</p>
              <p className="text-white text-sm leading-relaxed">
                Disponibilidad validada directamente por WhatsApp
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="mb-12">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-3">Colección</p>
          <h2 className="text-white font-bold text-3xl md:text-4xl tracking-tight mb-4">
            Productos Destacados
          </h2>
          <p className="text-[#888] max-w-2xl leading-relaxed">
            Una selección de modelos representativos de la propuesta de {BRAND.name}, con diseño, presencia y carácter.
          </p>
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
              <h2 className="text-white font-bold text-3xl md:text-4xl tracking-tight mb-6">
                Disponibilidad y Envíos
              </h2>
              <p className="text-[#888] leading-relaxed mb-8">
                Entrega inmediata en {DELIVERY_INFO.immediate.join(', ')}. Sujeta a existencias. Los envíos nacionales e internacionales se cotizan por separado y toda disponibilidad se confirma directamente por WhatsApp.
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
                {
                  label: 'Entrega Inmediata',
                  desc: DELIVERY_INFO.immediate.join(', '),
                  icon: '📍',
                },
                {
                  label: 'Disponibilidad',
                  desc: 'Sujeta a existencias y confirmación directa por WhatsApp',
                  icon: '✅',
                },
                {
                  label: 'Envíos',
                  desc: 'Cobertura nacional e internacional con costo adicional',
                  icon: '✈️',
                },
              ].map(item => (
                <div
                  key={item.label}
                  className="bg-[#111] border border-[#222] p-5 flex items-start gap-4"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="text-white font-medium text-sm mb-1">{item.label}</h3>
                    <p className="text-[#888] text-xs leading-relaxed">{item.desc}</p>
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
                <p className="text-red-600 text-xs tracking-[0.35em] uppercase mb-3">Nuestra visión</p>
                <h3 className="text-white font-bold text-2xl mb-4">
                  Construir una marca referente en México
                </h3>
                <p className="text-[#888] text-sm leading-relaxed mb-6">
                  Posicionar a {BRAND.name} como una marca referente en gorras premium dentro de México, combinando diseño, identidad, orden comercial y una experiencia de compra confiable.
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
                Somos una marca mexicana enfocada en ofrecer gorras premium con identidad propia. Apostamos por una imagen sólida, una operación seria y una propuesta pensada para clientes que valoran estilo, exclusividad y atención directa.
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
            <h2 className="text-white font-bold text-3xl md:text-4xl tracking-tight">
              Preguntas Frecuentes
            </h2>
          </div>

          <div className="space-y-px">
            {[
              {
                q: '¿Cómo puedo realizar un pedido?',
                a: 'Contáctanos directamente por WhatsApp seleccionando el producto que te interesa. Ahí confirmamos disponibilidad, pago y entrega.',
              },
              {
                q: '¿Cómo manejan entregas y envíos?',
                a: `Entrega inmediata en ${DELIVERY_INFO.immediate.join(', ')}, sujeta a existencias y coordinación directa. También realizamos envíos nacionales e internacionales con costo extra.`,
              },
              {
                q: '¿Las fotos corresponden al producto real?',
                a: 'Sí. Las fotografías del catálogo corresponden a los modelos reales disponibles.',
              },
            ].map((item, i) => (
              <div key={i} className="bg-[#111] border border-[#222] p-5">
                <p className="text-white font-medium text-sm mb-2">{item.q}</p>
                <p className="text-[#888] text-sm leading-relaxed">{item.a}</p>
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
          <h2 className="text-white font-bold text-4xl md:text-5xl tracking-tight mb-6">
            ¿Tienes dudas?
          </h2>
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
