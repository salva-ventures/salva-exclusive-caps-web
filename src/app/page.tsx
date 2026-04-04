import Link from 'next/link';
import Image from 'next/image';
import {
  CheckCircle2,
  MessageCircle,
  PackageCheck,
  Quote,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import HeroImageRotator from '@/components/HeroImageRotator';
import { getFeaturedProducts } from '@/data/products';
import { BRAND, CONTACT, DELIVERY_INFO } from '@/config/brand';

const testimonials = [
  {
    quote: 'Muy buena atención y entrega rápida.',
    author: 'A. R.',
  },
  {
    quote: 'Se siente la diferencia en el diseño.',
    author: 'M. T.',
  },
  {
    quote: 'Proceso directo y sin complicaciones.',
    author: 'J. L.',
  },
];

export default function HomePage() {
  const featured = getFeaturedProducts();
  const waLink = `https://wa.me/${CONTACT.whatsapp.number.replace(/\+/g, '')}?text=${encodeURIComponent(CONTACT.whatsapp.defaultMessage)}`;

  return (
    <div className="bg-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#050505] via-black to-[#050505]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.14),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.06),transparent_22%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.03),transparent_18%,transparent_82%,rgba(255,255,255,0.02))]" />

        <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur">
              <div className="relative h-6 w-6">
                <Image
                  src="/star-logo.png"
                  alt="Logo estrella Salva Exclusive Caps"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <span className="text-[11px] uppercase tracking-[0.35em] text-white/70">
                Marca mexicana de gorras premium
              </span>
            </div>

            <h1 className="text-5xl font-semibold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl xl:text-8xl">
              Gorras exclusivas
              <span className="block text-red-600">con presencia real.</span>
            </h1>

            <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-white/90 sm:text-xl">
              {BRAND.tagline}
            </p>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/60 sm:text-base">
              {BRAND.subtitle}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/catalogo"
                className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-white/90"
              >
                Ver catálogo
              </Link>

              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:border-red-600 hover:bg-white/10 hover:text-red-500"
              >
                Consultar por WhatsApp
              </a>
            </div>

            <div className="mt-10 grid gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/40">
                  Entrega
                </p>
                <p className="mt-2 text-sm font-medium text-white/85">
                  Inmediata
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/40">
                  Cobertura
                </p>
                <p className="mt-2 text-sm font-medium text-white/85">
                  Nacional e internacional
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-white/40">
                  Atención
                </p>
                <p className="mt-2 text-sm font-medium text-white/85">
                  Directa por WhatsApp
                </p>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] bg-red-600/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="relative aspect-[4/5] w-full">
                <HeroImageRotator />
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 sm:p-6">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.28em] text-white/50">
                    Selección destacada
                  </p>
                  <p className="mt-2 text-lg font-semibold text-white sm:text-xl">
                    Diseño, presencia y carácter
                  </p>
                </div>

                <div className="hidden rounded-full border border-white/15 bg-black/30 px-4 py-2 text-[10px] font-medium uppercase tracking-[0.24em] text-white/80 backdrop-blur sm:block">
                  Premium
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Availability Bar Mejorada */}
      <section className="border-y border-[#1a1a1a] bg-[#080808]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-red-600">
              Confianza directa
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Atención real, entregas reales y proceso claro
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#888] sm:text-base">
              Queremos que el cliente sienta confianza desde el primer contacto:
              respuesta directa, confirmación clara y seguimiento real.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="group rounded-[1.75rem] border border-white/10 bg-[#0d0d0d] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-600/20 bg-red-600/10 text-red-500">
                <PackageCheck className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">
                Entrega inmediata
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#888]">
                Atención rápida y entregas en {DELIVERY_INFO.immediate.join(', ')}.
              </p>
            </div>

            <div className="group rounded-[1.75rem] border border-white/10 bg-[#0d0d0d] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-600/20 bg-red-600/10 text-red-500">
                <Truck className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">
                Envíos nacionales e internacionales
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#888]">
                Hacemos envíos a toda la República Mexicana y también al extranjero.
              </p>
            </div>

            <div className="group rounded-[1.75rem] border border-white/10 bg-[#0d0d0d] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red-600/50">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-600/20 bg-red-600/10 text-red-500">
                <MessageCircle className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">
                Atención real y directa
              </h3>
              <p className="mt-3 text-sm leading-7 text-[#888]">
                Disponibilidad validada directamente por WhatsApp, sin vueltas ni complicaciones.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12">
          <p className="mb-3 text-xs uppercase tracking-[0.4em] text-red-600">Colección</p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
            Productos Destacados
          </h2>
          <p className="max-w-2xl leading-relaxed text-[#888]">
            Una selección de modelos representativos de la propuesta de {BRAND.name}, con diseño, presencia y carácter.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/catalogo"
            className="inline-block border border-white px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-red-600 hover:text-red-600"
          >
            Ver Catálogo Completo
          </Link>
        </div>
      </section>

      {/* Availability Preview */}
      <section className="border-y border-[#222] bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div>
              <p className="mb-3 text-xs uppercase tracking-[0.4em] text-red-600">Entregas</p>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Disponibilidad y Envíos
              </h2>
              <p className="mb-8 leading-relaxed text-[#888]">
                Entrega inmediata en {DELIVERY_INFO.immediate.join(', ')}. Sujeta a existencias. Los envíos nacionales e internacionales se cotizan por separado y toda disponibilidad se confirma directamente por WhatsApp.
              </p>
              <Link
                href="/disponibilidad"
                className="inline-block bg-red-600 px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-red-700"
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
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 border border-[#222] bg-[#111] p-5"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <div>
                    <h3 className="mb-1 text-sm font-medium text-white">{item.label}</h3>
                    <p className="text-xs leading-relaxed text-[#888]">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2">
            <div className="order-2 md:order-1">
              <div className="border border-[#222] bg-[#111] p-8">
                <p className="mb-3 text-xs uppercase tracking-[0.35em] text-red-600">Nuestra visión</p>
                <h3 className="mb-4 text-2xl font-bold text-white">
                  Construir una marca referente en México
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-[#888]">
                  Posicionar a {BRAND.name} como una marca referente en gorras premium dentro de México, combinando diseño, identidad, orden comercial y una experiencia de compra confiable.
                </p>
                <Link
                  href="/nosotros"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-red-600 transition-colors hover:text-white"
                >
                  Conocer más
                  <span>→</span>
                </Link>
              </div>
            </div>

            <div className="order-1 md:order-2">
              <p className="mb-3 text-xs uppercase tracking-[0.4em] text-red-600">Sobre Nosotros</p>
              <h2 className="mb-6 text-3xl font-bold tracking-tight text-white md:text-4xl">
                Identidad, Diseño y Confianza
              </h2>
              <p className="leading-relaxed text-[#888]">
                Somos una marca mexicana enfocada en ofrecer gorras premium con identidad propia. Apostamos por una imagen sólida, una operación seria y una propuesta pensada para clientes que valoran estilo, exclusividad y atención directa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-[#222] bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-red-600">
              Testimonios
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              Comentarios que refuerzan la confianza
            </h2>
            <p className="mt-4 text-sm leading-7 text-[#888] sm:text-base">
              Mensajes cortos, claros y directos que transmiten atención,
              respuesta y experiencia real.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.author + item.quote}
                className="rounded-[1.75rem] border border-white/10 bg-[#111] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.22)]"
              >
                <div className="flex items-center gap-2 text-red-500">
                  <Quote className="h-5 w-5" />
                  <span className="text-xs font-medium uppercase tracking-[0.2em]">
                    Cliente
                  </span>
                </div>

                <p className="mt-5 text-lg leading-8 text-white">
                  “{item.quote}”
                </p>

                <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 text-sm text-white/60">
                  <ShieldCheck className="h-4 w-4 text-red-500" />
                  {item.author}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Preview */}
      <section className="border-y border-[#222] bg-[#0a0a0a] py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-red-600">Preguntas</p>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
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
              <div key={i} className="border border-[#222] bg-[#111] p-5">
                <p className="mb-2 text-sm font-medium text-white">{item.q}</p>
                <p className="text-sm leading-relaxed text-[#888]">{item.a}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/faq"
              className="inline-block border border-white px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-red-600 hover:text-red-600"
            >
              Ver Todas las Preguntas
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-red-600/20 bg-gradient-to-br from-[#111] via-[#0b0b0b] to-[#161616] px-6 py-14 text-center shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:px-10 md:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.18),transparent_30%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent,rgba(255,255,255,0.01))]" />

            <div className="relative">
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-red-500">
                Cierre comercial
              </p>
              <h2 className="text-4xl font-bold tracking-tight text-white md:text-5xl">
                ¿Listo para elegir tu próxima gorra?
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-[#9a9a9a]">
                Explora el catálogo o recibe atención directa por WhatsApp para
                confirmar disponibilidad, entrega o envío.
              </p>

              <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/catalogo"
                  className="inline-flex items-center justify-center rounded-full bg-white px-8 py-4 text-sm font-semibold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-white/90"
                >
                  Ver catálogo
                </Link>

                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-8 py-4 text-sm font-semibold text-white backdrop-blur transition-all duration-300 hover:border-red-600 hover:bg-white/10 hover:text-red-500"
                >
                  Hablar por WhatsApp
                </a>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm text-white/60">
                <div className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-red-500" />
                  Entrega inmediata
                </div>
                <div className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-red-500" />
                  Atención directa
                </div>
                <div className="inline-flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-red-500" />
                  Envíos nacionales e internacionales
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
