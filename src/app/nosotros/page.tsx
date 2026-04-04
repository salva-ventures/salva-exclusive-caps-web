export default function NosotrosPage() {
  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <div className="bg-[#0a0a0a] border-b border-[#222] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-3">La Marca</p>
          <h1 className="text-white font-bold text-4xl md:text-5xl tracking-tight">Nosotros</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-20">
        {/* Vision */}
        <div className="mb-20">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-4">Visión</p>
          <blockquote className="border-l-2 border-red-600 pl-8 mb-8">
            <p className="text-white text-xl md:text-2xl leading-relaxed font-light italic">
              &ldquo;Posicionar a Salva Exclusive Caps como la marca referente en México en gorras premium, combinando diseño, identidad y una experiencia de compra sólida, moderna y confiable.&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Brand Story */}
        <div className="mb-20">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-4">Historia</p>
          <h2 className="text-white font-bold text-2xl md:text-3xl tracking-tight mb-6">La Marca</h2>
          <div className="space-y-4 text-[#888] leading-relaxed">
            <p>
              Salva Exclusive Caps nace con la intención de construir una marca de gorras premium con identidad propia, estética fuerte y una propuesta visual distinta dentro del mercado mexicano.
            </p>
            <p>
              La marca busca combinar diseño, presencia, exclusividad y una experiencia de compra clara, confiable y bien cuidada. Cada pieza es seleccionada con criterio editorial: no basta con que sea una gorra, tiene que ser una declaración.
            </p>
            <p>
              La visión es posicionarse como un referente en México dentro del segmento de gorras premium, elevando tanto el producto como la forma en que se presenta y se vende.
            </p>
          </div>
        </div>

        {/* Team */}
        <div>
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-4">Equipo</p>
          <h2 className="text-white font-bold text-2xl md:text-3xl tracking-tight mb-8">Las personas detrás</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Salva',
                role: 'Comercial & Creativo',
                desc: 'La cara del negocio. Responsable de la identidad visual, la estrategia comercial y la presencia de la marca. Con visión estética y ojo para lo que mueve.',
              },
              {
                name: 'Carlitos',
                role: 'Operaciones, IT & Escalabilidad',
                desc: 'El cerebro detrás de la operación. Responsable de tecnología, contabilidad y los sistemas que hacen crecer el negocio de forma sostenible.',
              },
            ].map(person => (
              <div key={person.name} className="bg-[#111] border border-[#222] p-8">
                <div className="w-12 h-12 bg-red-600/20 border border-red-600/30 mb-4 flex items-center justify-center">
                  <span className="text-red-600 font-bold text-xl">{person.name[0]}</span>
                </div>
                <h3 className="text-white font-bold text-lg mb-1">{person.name}</h3>
                <p className="text-red-600 text-xs tracking-widest uppercase mb-3">{person.role}</p>
                <p className="text-[#888] text-sm leading-relaxed">{person.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
