"use client";

import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const categories = ['Todos', 'snapback', 'dad-hat', 'fitted', 'trucker', 'bucket'];
const colorOptions = ['Todos', 'negro', 'blanco', 'rojo', 'oliva', 'vino', 'beis'];

export default function CatalogoPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [selectedColor, setSelectedColor] = useState('Todos');
  const [maxPrice, setMaxPrice] = useState(1200);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory === 'Todos' || p.category === selectedCategory;
    const matchColor = selectedColor === 'Todos' || p.colors.includes(selectedColor);
    const matchPrice = p.price <= maxPrice;
    return matchSearch && matchCat && matchColor && matchPrice;
  });

  return (
    <div className="bg-black min-h-screen">
      {/* Header */}
      <div className="bg-[#0a0a0a] border-b border-[#222] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-3">Colección Completa</p>
          <h1 className="text-white font-bold text-4xl md:text-5xl tracking-tight">Catálogo</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#111] border border-[#222] text-white placeholder-[#444] px-4 py-3 text-sm focus:border-red-600 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-xs tracking-widest uppercase transition-all border ${
                  selectedCategory === cat
                    ? 'bg-red-600 border-red-600 text-white'
                    : 'bg-transparent border-[#222] text-[#888] hover:border-white hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="md:w-48 flex-shrink-0">
            <div className="bg-[#111] border border-[#222] p-5 mb-4">
              <h3 className="text-white text-xs tracking-widest uppercase mb-4">Color</h3>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-1 text-xs tracking-wide border transition-all ${
                      selectedColor === color
                        ? 'border-red-600 text-red-600'
                        : 'border-[#333] text-[#888] hover:border-white hover:text-white'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-[#111] border border-[#222] p-5">
              <h3 className="text-white text-xs tracking-widest uppercase mb-4">Precio máx: ${maxPrice}</h3>
              <input
                type="range"
                min={500}
                max={1200}
                step={50}
                value={maxPrice}
                onChange={e => setMaxPrice(Number(e.target.value))}
                className="w-full accent-red-600"
              />
              <div className="flex justify-between text-xs text-[#888] mt-2">
                <span>$500</span>
                <span>$1200</span>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[#888] text-sm">No se encontraron productos.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
            <p className="text-[#888] text-xs mt-6">{filtered.length} producto{filtered.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
