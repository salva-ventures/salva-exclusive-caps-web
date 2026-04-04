"use client";

import { use, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, products } from '@/data/products';
import { CONTACT } from '@/config/brand';
import ProductCard from '@/components/ProductCard';

interface Props {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: Props) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const [activeImage, setActiveImage] = useState(0);

  const waMessage = encodeURIComponent(
    `Hola, me interesa la gorra "${product.name}" (SKU: ${product.sku}). ¿Está disponible?`
  );
  const waLink = `https://wa.me/${CONTACT.whatsapp.number.replace(/\+/g, '')}?text=${waMessage}`;

  // Get related products (same type, exclude current)
  const relatedProducts = products
    .filter(p => p.type === product.type && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <div className="bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Gallery */}
          <div>
            <div className="relative aspect-square bg-[#111] border border-[#222] overflow-hidden mb-4 shadow-[0_0_30px_rgba(220,38,38,0.15)]">
              <div
                className="w-full h-full transition-all duration-500 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]"
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
                      className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]"
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
            <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-2">{product.type}</p>
            <h1 className="text-white font-bold text-3xl md:text-4xl tracking-tight mb-4">{product.name}</h1>
            <p className="text-[#888] text-sm mb-6">SKU: {product.sku}</p>

            <p className="text-[#ccc] leading-relaxed mb-8">{product.description}</p>

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

            {/* Availability Info */}
            <div className="bg-[#111] border border-[#222] p-5 mb-8">
              <p className="text-white text-sm font-medium mb-2">Disponibilidad</p>
              <p className="text-[#888] text-sm">
                La disponibilidad depende del modelo y existencias al momento de confirmar. Contáctanos por WhatsApp para verificar stock actual.
              </p>
            </div>

            {/* CTA */}
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 text-center mb-4"
            >
              Consultar por WhatsApp
            </a>
            <Link
              href="/catalogo"
              className="border border-[#333] hover:border-white text-[#888] hover:text-white px-8 py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300 text-center"
            >
              Volver al Catálogo
            </Link>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="border-t border-[#222] pt-16">
            <div className="mb-12">
              <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-3">Relacionados</p>
              <h2 className="text-white font-bold text-3xl md:text-4xl tracking-tight">Productos Similares</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
