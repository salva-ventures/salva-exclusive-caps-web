"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/ProductCard";
import { products, getAllTypes, getAllColors } from "@/data/products";

type SortOption = "featured" | "name-asc" | "name-desc";

export default function CatalogoClient() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedColor, setSelectedColor] = useState("Todos");
  const [sortBy, setSortBy] = useState<SortOption>("featured");

  const types = ["Todos", ...getAllTypes()];
  const colors = ["Todos", ...getAllColors()];

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      const searchLower = search.toLowerCase();
      const matchSearch =
        !search ||
        p.name.toLowerCase().includes(searchLower) ||
        p.tipo.toLowerCase().includes(searchLower) ||
        p.sku.toLowerCase().includes(searchLower) ||
        p.shortDescription.toLowerCase().includes(searchLower) ||
        p.colors.some((c) => c.toLowerCase().includes(searchLower));

      const matchType = selectedType === "Todos" || p.tipo === selectedType;
      const matchColor = selectedColor === "Todos" || p.colors.includes(selectedColor);

      return matchSearch && matchType && matchColor;
    });

    switch (sortBy) {
      case "featured":
        result.sort((a, b) => {
          const featuredDiff = (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
          if (featuredDiff !== 0) return featuredDiff;
          return a.sortOrder - b.sortOrder;
        });
        break;
      case "name-asc":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
    }

    return result;
  }, [search, selectedType, selectedColor, sortBy]);

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#0a0a0a] border-b border-[#222] py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-3">Colección Completa</p>
          <h1 className="text-white font-bold text-4xl md:text-5xl tracking-tight">Catálogo</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Buscar por nombre, tipo, color, SKU o descripción..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#111] border border-[#222] text-white placeholder-[#444] px-4 py-3 text-sm focus:border-red-600 focus:outline-none transition-colors"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-[#111] border border-[#222] text-white px-4 py-3 text-xs tracking-widest uppercase focus:border-red-600 focus:outline-none transition-colors"
            >
              <option value="featured">Destacados</option>
              <option value="name-asc">A-Z</option>
              <option value="name-desc">Z-A</option>
            </select>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-[#888] text-xs tracking-widest uppercase mb-3">Tipo</p>
          <div className="flex gap-3 flex-wrap">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-4 py-2 text-xs tracking-widest uppercase transition-all border ${
                  selectedType === type
                    ? "bg-red-600 border-red-600 text-white"
                    : "bg-transparent border-[#222] text-[#888] hover:border-white hover:text-white"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          <aside className="md:w-48 flex-shrink-0">
            <div className="bg-[#111] border border-[#222] p-5">
              <h3 className="text-white text-xs tracking-widest uppercase mb-4">Color</h3>
              <div className="flex flex-col gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-3 py-2 text-xs text-left border transition-all ${
                      selectedColor === color
                        ? "border-red-600 text-red-600 bg-red-600/10"
                        : "border-[#333] text-[#888] hover:border-white hover:text-white"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          <div className="flex-1">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-[#888] text-sm mb-2">No se encontraron productos.</p>
                <button
                  onClick={() => {
                    setSearch("");
                    setSelectedType("Todos");
                    setSelectedColor("Todos");
                  }}
                  className="text-red-600 hover:text-white text-xs tracking-widest uppercase transition-colors"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filtered.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
                <p className="text-[#888] text-xs mt-6">
                  {filtered.length} producto{filtered.length !== 1 ? "s" : ""}
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
