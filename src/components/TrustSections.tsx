import Link from 'next/link';
import { CheckCircle2, MessageCircle, PackageCheck, Truck } from 'lucide-react';

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

const trustCards = [
  {
    icon: PackageCheck,
    title: 'Entrega inmediata',
    description:
      'Atención rápida y entregas en Tampico, Madero, Altamira y Monterrey.',
  },
  {
    icon: Truck,
    title: 'Envíos nacionales e internacionales',
    description:
      'Hacemos envíos a toda la República Mexicana y también al extranjero.',
  },
  {
    icon: MessageCircle,
    title: 'Atención real y directa',
    description:
      'Comunicación clara, seguimiento por WhatsApp y respuesta rápida.',
  },
];

export default function TrustSections() {
  return (
    <section className="relative overflow-hidden bg-[#050505] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.10),transparent_35%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.02),transparent,rgba(255,255,255,0.02))]" />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:px-10 lg:px-12">
        {/* BLOQUE DE CONFIANZA */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium uppercase tracking-[0.22em] text-[#d4af37]">
            Confianza directa
          </span>

          <h2 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-5xl">
            Una experiencia clara, rápida y real
          </h2>

          <p className="mt-4 text-sm leading-7 text-white/70 md:text-base">
            Salva Exclusive Caps ofrece atención directa, entregas reales y un
            proceso simple para que el cliente tenga confianza desde el primer contacto.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {trustCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="group rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-[0_10px_40px_rgba(0,0,0,0.25)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-[#d4af37]/40 hover:bg-white/[0.06]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#d4af37]/20 bg-[#d4af37]/10 text-[#d4af37]">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="mt-5 text-xl font-semibold text-white">
                  {card.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-white/70">
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* TESTIMONIOS */}
        <div className="mt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-xs font-medium uppercase tracking-[0.22em] text-[#d4af37]">
              Testimonios
            </span>

            <h3 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
              Comentarios que refuerzan la confianza
            </h3>

            <p className="mt-4 text-sm leading-7 text-white/70 md:text-base">
              Mensajes cortos, reales y directos que transmiten atención,
              respuesta y experiencia.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {testimonials.map((item) => (
              <article
                key={item.author + item.quote}
                className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-7 shadow-[0_10px_30px_rgba(0,0,0,0.22)]"
              >
                <div className="flex items-center gap-2 text-[#d4af37]">
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-xs font-medium uppercase tracking-[0.2em]">
                    Cliente
                  </span>
                </div>

                <p className="mt-5 text-lg leading-8 text-white">
                  “{item.quote}”
                </p>

                <div className="mt-6 border-t border-white/10 pt-4 text-sm text-white/60">
                  {item.author}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA FINAL */}
        <div className="mt-24">
          <div className="relative overflow-hidden rounded-[2rem] border border-[#d4af37]/20 bg-gradient-to-br from-[#111111] via-[#0b0b0b] to-[#161616] px-6 py-12 shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:px-10 md:py-16">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.18),transparent_30%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.03),transparent,rgba(255,255,255,0.01))]" />

            <div className="relative mx-auto max-w-4xl text-center">
              <span className="inline-flex items-center rounded-full border border-[#d4af37]/20 bg-[#d4af37]/10 px-4 py-1 text-xs font-medium uppercase tracking-[0.22em] text-[#f1d67a]">
                Cierre comercial
              </span>

              <h3 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-5xl">
                ¿Listo para elegir tu próxima gorra?
              </h3>

              <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
                Explora el catálogo o recibe atención directa por WhatsApp para
                confirmar disponibilidad, entrega o envío.
              </p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link
                  href="/catalogo"
                  className="inline-flex min-w-[200px] items-center justify-center rounded-2xl bg-[#d4af37] px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-[#e5c158]"
                >
                  Ver catálogo
                </Link>

                <Link
                  href="https://wa.me/528331234567?text=Hola,%20quiero%20informaci%C3%B3n%20sobre%20las%20gorras%20de%20Salva%20Exclusive%20Caps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-w-[200px] items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition hover:scale-[1.02] hover:border-white/25 hover:bg-white/10"
                >
                  Hablar por WhatsApp
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
