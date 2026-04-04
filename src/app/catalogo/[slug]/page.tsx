"use client";

import { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug } from '@/data/products';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: Props) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const [activeImage, setActiveImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');

  const waMessage = encodeURIComponent(
    `Hola, me interesa la gorra "${product.name}" (${product.price} MXN)${selectedSize ? `, talla ${selectedSize}` : ''}. ¿Está disponible?`
  );

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square bg-[#111] border border-[#222] overflow-hidden mb-4 shadow-[0_0_30px_rgba(220,38,38,0.15)]">
              <div
                className="w-full h-full transition-all duration-500"
                style={{
                  backgroundImage: `url(${product.images[activeImage]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              />
            </div>
            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className="flex gap-3">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`flex-1 aspect-square border-2 overflow-hidden transition-all duration-300 ${
                      activeImage === i
                        ? 'border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]'
                        : 'border-[#222] hover:border-[#444]'
                    }`}
                  >
                    <div
                      className="w-full h-full"
                      style={{
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-2">{product.category}</p>
            <h1 className="text-white font-bold text-3xl md:text-4xl tracking-tight mb-4">{product.name}</h1>
            <p className="text-white text-2xl font-bold mb-6">${product.price.toLocaleString('es-MX')} MXN</p>

            <p className="text-[#888] leading-relaxed mb-8">{product.description}</p>

            {/* Colors */}
            <div className="mb-6">
              <p className="text-white text-xs tracking-widest uppercase mb-3">Colores disponibles</p>
              <div className="flex flex-wrap gap-2">
                {product.colors.map(color => (
                  <span key={color} className="border border-[#333] text-[#888] px-3 py-1 text-xs">
                    {color}
                  </span>
                ))}
              </div>
            </div>

            {/* Sizes */}
            {product.sizes.length > 1 && (
              <div className="mb-8">
                <p className="text-white text-xs tracking-widest uppercase mb-3">Talla</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`border px-4 py-2 text-sm transition-all ${
                        selectedSize === size
                          ? 'border-red-600 bg-red-600/10 text-white'
                          : 'border-[#333] text-[#888] hover:border-white hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <a
              href={`https://wa.me/521XXXXXXXXXX?text=${waMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 text-center mb-4"
            >
              Pedir por WhatsApp
            </a>
            <Link
              href="/catalogo"
              className="border border-[#333] hover:border-white text-[#888] hover:text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 text-center"
            >
              Volver al Catálogo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
