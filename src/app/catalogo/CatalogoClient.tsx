"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
  RotateCcw,
  ChevronDown,
} from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { products, getAllTypes, getAllColors } from "@/data/products";

type SortOption = "featured" | "name-asc" | "name-desc" | "brand-asc";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const filterPanel = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.32,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    x: 28,
    transition: {
      duration: 0.24,
      ease: [0.4, 0, 1, 1] as const,
    },
  },
};

const overlay = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.22 } },
  exit: { opacity: 0, transition: { duration: 0.18 } },
};

const panelClass =
  "relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] shadow-[0_18px_50px_rgba(0,0,0,0.28),0_8px_20px_rgba(0,0,0,0.12)]";
const panelOverlay =
  "before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(255,255,255,0.015)_24%,transparent_52%)] before:content-['']";

export default function CatalogoClient() {
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("Todos");
  const [selectedColor, setSelectedColor] = useState("Todos");
  const [selectedBrand, setSelectedBrand] = useState("Todas");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const types = ["Todos", ...getAllTypes()];
  const colors = ["Todos", ...getAllColors()];
  const brands = ["Todas", ...Array.from(new Set(products.map((p) => p.brand)))];

  const filtered = useMemo(() => {
    const result = products.filter((p) => {
      const searchLower = search.trim().toLowerCase();

      const matchSearch =
        !searchLower ||
        p.name.toLowerCase().includes(searchLower) ||
        p.brand.toLowerCase().includes(searchLower) ||
        p.tipo.toLowerCase().includes(searchLower) ||
        p.sku.toLowerCase().includes(searchLower) ||
        p.shortDescription.toLowerCase().includes(searchLower) ||
        p.colors.some((c) => c.toLowerCase().includes(searchLower)) ||
        (p.collab ? p.collab.toLowerCase().includes(searchLower) : false);

      const matchType = selectedType === "Todos" || p.tipo === selectedType;
      const matchColor =
        selectedColor === "Todos" || p.colors.includes(selectedColor);
      const matchBrand =
        selectedBrand === "Todas" || p.brand === selectedBrand;

      return matchSearch && matchType && matchColor && matchBrand;
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
      case "brand-asc":
        result.sort((a, b) => a.brand.localeCompare(b.brand));
        break;
    }

    return result;
  }, [search, selectedType, selectedColor, selectedBrand, sortBy]);

  const activeFiltersCount =
    (search.trim() ? 1 : 0) +
    (selectedType !== "Todos" ? 1 : 0) +
    (selectedColor !== "Todos" ? 1 : 0) +
    (selectedBrand !== "Todas" ? 1 : 0);

  const clearFilters = () => {
    setSearch("");
    setSelectedType("Todos");
    setSelectedColor("Todos");
    setSelectedBrand("Todas");
    setSortBy("featured");
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <motion.section
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="relative overflow-hidden border-b border-white/10 px-4 py-12 md:py-20"
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#060606,#020202)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_18%,rgba(255,255,255,0.05),transparent_18%),radial-gradient(circle_at_80%_15%,rgba(220,38,38,0.16),transparent_22%),radial-gradient(circle_at_55%_100%,rgba(255,255,255,0.03),transparent_24%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.025),transparent_18%,transparent_82%,rgba(255,255,255,0.018))]" />
        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.6px,transparent_0.6px)] [background-size:18px_18px]" />

        <div className="relative mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <motion.div
              variants={fadeUp}
              className="relative mb-4 inline-flex items-center gap-2 overflow-hidden rounded-full border border-red-600/25 bg-red-600/10 px-3 py-1 text-[11px] uppercase tracking-[0.28em] text-red-500"
            >
              <div className="absolute inset-y-0 left-[-140%] w-[70%] skew-x-[-20deg] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.2),transparent)] animate-[shine_4.8s_ease-in-out_infinite]" />
              <Sparkles size={14} />
              Colección completa
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl"
            >
              Catálogo
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-4 max-w-2xl text-sm leading-7 text-white/65 md:text-base"
            >
              Explora nuestra selección de gorras exclusivas con diseño urbano,
              colaboraciones y ediciones especiales. Filtra rápido, compara
              estilos y encuentra la pieza ideal.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/70">
                {products.length} modelos
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/70">
                Selección premium
              </div>
              <div className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/70">
                Atención directa
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      <section className="relative px-4 py-6 md:py-10">
        <div className="absolute inset-0 opacity-[0.02] [background-image:radial-gradient(rgba(255,255,255,0.9)_0.6px,transparent_0.6px)] [background-size:22px_22px]" />
        <div className="relative mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.08,
            }}
            className={`mb-6 ${panelClass} ${panelOverlay} rounded-[1.7rem] bg-black/70 p-3 backdrop-blur-xl md:sticky md:top-20 md:z-30 md:mb-8 md:p-4`}
          >
            <div className="pointer-events-none absolute inset-0 rounded-[1.7rem] ring-1 ring-inset ring-white/[0.03]" />

            <div className="relative flex flex-col gap-3">
              <div className="flex flex-col gap-3 lg:flex-row">
                <div className="relative flex-1">
                  <Search
                    size={18}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-white/35"
                  />
                  <input
                    type="text"
                    placeholder="Buscar por nombre, marca, tipo, color, SKU o descripción..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-300 focus:border-red-600/60 focus:bg-white/[0.06]"
                  />
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:w-auto">
                  <div className="relative min-w-[190px]">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 pr-10 text-sm text-white outline-none transition-all duration-300 focus:border-red-600/60"
                    >
                      <option value="featured">Destacados</option>
                      <option value="name-asc">Nombre A-Z</option>
                      <option value="name-desc">Nombre Z-A</option>
                      <option value="brand-asc">Marca A-Z</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/45"
                    />
                  </div>

                  <button
                    onClick={() => setMobileFiltersOpen(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] lg:hidden"
                  >
                    <SlidersHorizontal size={16} />
                    Filtros
                    {activeFiltersCount > 0 && (
                      <span className="rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-semibold text-white">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <motion.div layout className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] uppercase tracking-[0.24em] text-white/45">
                    {filtered.length} resultado{filtered.length !== 1 ? "s" : ""}
                  </span>

                  <AnimatePresence mode="popLayout">
                    {selectedType !== "Todos" && (
                      <ActiveChip
                        key={`type-${selectedType}`}
                        label={`Tipo: ${selectedType}`}
                        onRemove={() => setSelectedType("Todos")}
                      />
                    )}

                    {selectedColor !== "Todos" && (
                      <ActiveChip
                        key={`color-${selectedColor}`}
                        label={`Color: ${selectedColor}`}
                        onRemove={() => setSelectedColor("Todos")}
                      />
                    )}

                    {selectedBrand !== "Todas" && (
                      <ActiveChip
                        key={`brand-${selectedBrand}`}
                        label={`Marca: ${selectedBrand}`}
                        onRemove={() => setSelectedBrand("Todas")}
                      />
                    )}

                    {search.trim() && (
                      <ActiveChip
                        key={`search-${search}`}
                        label={`Búsqueda: ${search}`}
                        onRemove={() => setSearch("")}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>

                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/55 transition-colors duration-300 hover:text-red-500"
                  >
                    <RotateCcw size={14} />
                    Limpiar filtros
                  </button>
                )}
              </div>
            </div>
          </motion.div>

          <div className="flex gap-8">
            <aside className="sticky top-44 hidden h-fit w-72 shrink-0 space-y-4 lg:block">
              <FilterSection
                title="Tipo"
                options={types}
                selected={selectedType}
                onSelect={setSelectedType}
              />
              <FilterSection
                title="Marca"
                options={brands}
                selected={selectedBrand}
                onSelect={setSelectedBrand}
              />
              <FilterSection
                title="Color"
                options={colors}
                selected={selectedColor}
                onSelect={setSelectedColor}
              />
            </aside>

            <div className="flex-1">
              <AnimatePresence mode="wait">
                {filtered.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.28 }}
                    className={`${panelClass} ${panelOverlay} px-6 py-16 text-center`}
                  >
                    <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/[0.03]" />
                    <div className="relative">
                      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/[0.04]">
                        <Search size={20} className="text-white/50" />
                      </div>
                      <h3 className="text-xl font-semibold text-white">
                        No encontramos productos con esos filtros
                      </h3>
                      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-white/60">
                        Prueba con otra búsqueda, cambia la marca, el color o vuelve
                        a mostrar toda la colección.
                      </p>
                      <button
                        onClick={clearFilters}
                        className="mt-6 inline-flex items-center gap-2 rounded-full border border-red-600 bg-red-600 px-5 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-red-700"
                      >
                        <RotateCcw size={14} />
                        Limpiar filtros
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div key="grid" layout className="space-y-4">
                    <motion.div
                      layout
                      className={`${panelClass} ${panelOverlay} overflow-hidden px-4 py-4 sm:px-5`}
                    >
                      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/[0.03]" />
                      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-[11px] uppercase tracking-[0.24em] text-white/42">
                            Vista general
                          </p>
                          <p className="mt-1 text-sm text-white/72">
                            Explora la colección filtrada y elige tu próxima gorra.
                          </p>
                        </div>

                        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.22em] text-white/65">
                          {sortBy === "featured" && "Orden: Destacados"}
                          {sortBy === "name-asc" && "Orden: Nombre A-Z"}
                          {sortBy === "name-desc" && "Orden: Nombre Z-A"}
                          {sortBy === "brand-asc" && "Orden: Marca A-Z"}
                        </div>
                      </div>
                    </motion.div>

                    <motion.div
                      layout
                      variants={staggerContainer}
                      initial="hidden"
                      animate="show"
                      className="grid grid-cols-1 gap-4 sm:grid-cols-2 2xl:grid-cols-3"
                    >
                      <AnimatePresence mode="popLayout">
                        {filtered.map((product) => (
                          <motion.div
                            layout
                            key={product.id}
                            variants={fadeUp}
                            initial="hidden"
                            animate="show"
                            exit={{
                              opacity: 0,
                              scale: 0.96,
                              y: 12,
                              transition: { duration: 0.18 },
                            }}
                            className="h-full"
                          >
                            <ProductCard product={product} />
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      <AnimatePresence>
        {mobileFiltersOpen && (
          <motion.div className="fixed inset-0 z-50 lg:hidden">
            <motion.div
              variants={overlay}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={() => setMobileFiltersOpen(false)}
              className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            />

            <motion.div
              variants={filterPanel}
              initial="hidden"
              animate="show"
              exit="exit"
              className="absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto border-l border-white/10 bg-[#070707] p-5 shadow-2xl"
            >
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.28em] text-white/45">
                    Filtros
                  </p>
                  <h3 className="mt-1 text-xl font-semibold text-white">
                    Refina tu búsqueda
                  </h3>
                </div>

                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="rounded-full border border-white/10 p-2 text-white/70 transition-colors duration-300 hover:border-white/30 hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <motion.div layout className="space-y-4">
                <FilterSection
                  title="Tipo"
                  options={types}
                  selected={selectedType}
                  onSelect={setSelectedType}
                />
                <FilterSection
                  title="Marca"
                  options={brands}
                  selected={selectedBrand}
                  onSelect={setSelectedBrand}
                />
                <FilterSection
                  title="Color"
                  options={colors}
                  selected={selectedColor}
                  onSelect={setSelectedColor}
                />
              </motion.div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  onClick={clearFilters}
                  className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:border-white/25 hover:bg-white/[0.07]"
                >
                  Limpiar
                </button>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="rounded-2xl border border-red-600 bg-red-600 px-4 py-3 text-xs font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:bg-red-700"
                >
                  Aplicar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes shine {
          0%,
          70%,
          100% {
            left: -140%;
          }
          85% {
            left: 145%;
          }
        }
      `}</style>
    </div>
  );
}

function FilterSection({
  title,
  options,
  selected,
  onSelect,
}: {
  title: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
}) {
  return (
    <motion.div layout className={`${panelClass} ${panelOverlay} p-5`}>
      <div className="pointer-events-none absolute inset-0 rounded-[1.75rem] ring-1 ring-inset ring-white/[0.03]" />
      <div className="relative">
        <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-white/60">
          {title}
        </p>

        <motion.div layout className="flex flex-wrap gap-2">
          {options.map((option) => {
            const isActive = selected === option;

            return (
              <motion.button
                layout
                key={option}
                whileTap={{ scale: 0.97 }}
                onClick={() => onSelect(option)}
                className={`rounded-full border px-3 py-2 text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
                  isActive
                    ? "border-red-600 bg-red-600 text-white shadow-[0_0_0_1px_rgba(220,38,38,0.25)]"
                    : "border-white/10 bg-white/[0.02] text-white/70 hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {option}
              </motion.button>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}

function ActiveChip({
  label,
  onRemove,
}: {
  label: string;
  onRemove: () => void;
}) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -8 }}
      transition={{ duration: 0.2 }}
      onClick={onRemove}
      className="inline-flex items-center gap-2 rounded-full border border-red-600/30 bg-red-600/10 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-red-400 transition-all duration-300 hover:border-red-600/50 hover:bg-red-600/15"
    >
      {label}
      <X size={12} />
    </motion.button>
  );
}
