import { drops } from '@/data/drops';

export default function DropsPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#0a0a0a] border-b border-[#222] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-3">Lanzamientos</p>
          <h1 className="text-white font-bold text-4xl md:text-5xl tracking-tight">Drops & Colecciones</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="space-y-px">
          {drops.map((drop, i) => (
            <div key={drop.id} className="group bg-[#111] border border-[#222] hover:border-red-600 transition-all duration-300 overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div
                  className="aspect-video md:aspect-auto min-h-[300px] bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] group-hover:scale-[1.02] transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${drop.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    order: i % 2 === 0 ? 0 : 1,
                  }}
                />
                <div className="p-10 flex flex-col justify-center" style={{ order: i % 2 === 0 ? 1 : 0 }}>
                  <div className="flex items-center gap-4 mb-6">
                    <span className={`text-xs tracking-widest uppercase px-3 py-1 border ${
                      drop.status === 'active'
                        ? 'border-red-600 text-red-600'
                        : drop.status === 'upcoming'
                        ? 'border-[#444] text-[#888]'
                        : 'border-[#333] text-[#444]'
                    }`}>
                      {drop.status === 'active' ? 'Disponible Ahora' : drop.status === 'upcoming' ? 'Próximamente' : 'Agotado'}
                    </span>
                    <span className="text-[#444] text-xs">{drop.items} piezas</span>
                  </div>
                  <h2 className="text-white font-bold text-2xl md:text-3xl tracking-widest mb-4">{drop.name}</h2>
                  <p className="text-[#888] leading-relaxed mb-8">{drop.description}</p>
                  <div className="text-[#444] text-xs tracking-widest uppercase">
                    {drop.status === 'upcoming'
                      ? `Fecha: ${new Date(drop.date).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}`
                      : `Lanzado: ${new Date(drop.date).toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })}`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
