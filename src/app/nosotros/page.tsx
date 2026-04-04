import { BRAND } from '@/config/brand';

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
              &ldquo;Posicionar a {BRAND.name} como la marca referente en México en gorras premium, combinando diseño, identidad y una experiencia de compra sólida, moderna y confiable.&rdquo;
            </p>
          </blockquote>
        </div>

        {/* Brand Story */}
        <div className="mb-20">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-4">Historia</p>
          <h2 className="text-white font-bold text-2xl md:text-3xl tracking-tight mb-6">La Marca</h2>
          <div className="space-y-4 text-[#888] leading-relaxed">
            <p>
              {BRAND.name} nace con la intención de construir una marca de gorras premium con identidad propia, estética fuerte y una propuesta visual distinta dentro del mercado mexicano.
            </p>
            <p>
              La marca busca combinar diseño, presencia, exclusividad y una experiencia de compra clara, confiable y bien cuidada. Cada pieza es seleccionada con criterio editorial: no basta con que sea una gorra, tiene que representar estilo, exclusividad y actitud.
            </p>
            <p>
              Nuestra visión es posicionarnos como un referente en México dentro del segmento de gorras premium, elevando tanto el producto como la forma en que se presenta y se vende, construyendo relaciones de confianza con clientes y socios comerciales.
            </p>
            <p>
              Operamos con estructura, trazabilidad y una visión clara de crecimiento nacional. Esto no es solo venta de gorras: es la construcción de una marca sólida con proyección a largo plazo.
            </p>
          </div>
        </div>

        {/* Team */}
        <div className="mb-20">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-4">Equipo</p>
          <h2 className="text-white font-bold text-2xl md:text-3xl tracking-tight mb-8">Las personas detrás</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                name: 'Salva',
                role: 'Comercial & Creativo',
                desc: 'Lidera la parte comercial y creativa de la marca. Es la cara del negocio, impulsa la visión estética del proyecto y se enfoca en la relación directa con clientes, ventas y posicionamiento de la marca. Además, conoce de cerca este nicho de mercado, mantiene la relación directa con proveedores y coordina aspectos clave de envíos y redes sociales.',
              },
              {
                name: 'Carlitos',
                role: 'Operaciones, IT & Escalabilidad',
                desc: 'Lidera la estructura operativa y tecnológica del negocio. Se enfoca en el orden interno, control administrativo, sistemas IT, contabilidad y desarrollo de procesos para dar solidez, trazabilidad y escalabilidad al proyecto.',
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

        {/* Values */}
        <div>
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-4">Compromiso</p>
          <h2 className="text-white font-bold text-2xl md:text-3xl tracking-tight mb-8">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Confianza',
                desc: 'Construimos relaciones de largo plazo basadas en transparencia, cumplimiento y comunicación clara.',
              },
              {
                title: 'Calidad',
                desc: 'Cada gorra es seleccionada con criterio. Solo ofrecemos productos que nosotros mismos usaríamos.',
              },
              {
                title: 'Crecimiento',
                desc: 'Trabajamos con visión de escalabilidad, estructura y profesionalización constante del negocio.',
              },
            ].map(value => (
              <div key={value.title} className="bg-[#111] border border-[#222] p-6">
                <h3 className="text-white font-bold text-sm mb-2 tracking-wide uppercase">{value.title}</h3>
                <p className="text-[#888] text-sm leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
