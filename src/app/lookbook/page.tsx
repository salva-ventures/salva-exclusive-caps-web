export default function LookbookPage() {
  const images = [
    { seed: 'lb1', span: 'col-span-1 row-span-2' },
    { seed: 'lb2', span: 'col-span-1 row-span-1' },
    { seed: 'lb3', span: 'col-span-1 row-span-1' },
    { seed: 'lb4', span: 'col-span-2 row-span-1' },
    { seed: 'lb5', span: 'col-span-1 row-span-2' },
    { seed: 'lb6', span: 'col-span-1 row-span-1' },
    { seed: 'lb7', span: 'col-span-1 row-span-1' },
    { seed: 'lb8', span: 'col-span-1 row-span-1' },
    { seed: 'lb9', span: 'col-span-1 row-span-2' },
    { seed: 'lb10', span: 'col-span-1 row-span-1' },
    { seed: 'lb11', span: 'col-span-1 row-span-1' },
    { seed: 'lb12', span: 'col-span-2 row-span-1' },
  ];

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#0a0a0a] border-b border-[#222] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-3">Editorial</p>
          <h1 className="text-white font-bold text-4xl md:text-5xl tracking-tight">Lookbook</h1>
          <p className="text-[#888] mt-4 max-w-xl">Imágenes editoriales. La gorra como objeto de identidad.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-3 auto-rows-[250px] gap-3">
          {images.map((img) => (
            <div
              key={img.seed}
              className={`${img.span} overflow-hidden group cursor-pointer`}
            >
              <div
                className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] group-hover:scale-105 transition-transform duration-700"
                style={{
                  backgroundImage: `url(https://picsum.photos/seed/${img.seed}/800/800)`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
