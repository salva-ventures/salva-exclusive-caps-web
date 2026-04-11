import PageViewTracker from "@/components/analytics/PageViewTracker";
import CatalogoSelectorButtons from "@/components/analytics/CatalogoSelectorButtons";

export default function CatalogoPage() {
  return (
    <>
      <PageViewTracker
        pagePath="/catalogo"
        pageTitle="Catálogo | Salva Exclusive Caps"
        entitySlug="catalogo-selector"
      />

      <main className="min-h-screen bg-black text-white">
        <section className="mx-auto max-w-6xl px-6 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-red-500/80">
              Catálogo
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Elige la modalidad de compra
            </h1>
            <p className="mt-5 text-base leading-7 text-white/70 sm:text-lg">
              Ahora el catálogo se divide entre menudeo y mayoreo para mostrar con
              claridad las reglas de compra, disponibilidad y operación de cada
              modalidad.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <article className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              <div className="flex h-full flex-col">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-white/45">
                    Compra individual
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">
                    Catálogo de Menudeo
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
                    Pensado para compra por pieza. Aquí ves modelos disponibles
                    para clientes finales con precio de menudeo, stock visible y
                    acceso directo al catálogo actualizado en tiempo real.
                  </p>
                </div>

                <div className="mt-6 space-y-3 text-sm text-white/75">
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    Compra individual por pieza
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    Precio de menudeo visible
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    Stock y disponibilidad del catálogo actual
                  </div>
                </div>

                <CatalogoSelectorButtons mode="menudeo" />
              </div>
            </article>

            <article className="rounded-3xl border border-red-500/20 bg-red-500/[0.06] p-7 shadow-[0_18px_50px_rgba(0,0,0,0.28)]">
              <div className="flex h-full flex-col">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.24em] text-red-300/80">
                    Compra por volumen
                  </p>
                  <h2 className="mt-3 text-3xl font-semibold text-white">
                    Catálogo de Mayoreo
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-white/70 sm:text-base">
                    Pensado para revendedores, tiendas y compras por volumen.
                    Aquí ves modelos para mayoreo con reglas distintas de operación,
                    como pedido mínimo, cotización y tiempos sujetos a proveedor.
                  </p>
                </div>

                <div className="mt-6 space-y-3 text-sm text-white/75">
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    Pedido mínimo por operación
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    Precio sujeto a cotización o regla mayoreo
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                    Tiempos, resurtido y condiciones según proveedor
                  </div>
                </div>

                <CatalogoSelectorButtons mode="mayoreo" />
              </div>
            </article>
          </div>

          <div className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-5 text-sm leading-7 text-white/60">
            Esta nueva entrada reemplaza al catálogo legacy estático. A partir de
            ahora, menudeo y mayoreo pueden reflejar cambios reales administrados
            desde el panel de administración.
          </div>
        </section>
      </main>
    </>
  );
}