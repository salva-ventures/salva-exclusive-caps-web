import Link from 'next/link';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/catalogo/${product.slug}`} className="group block">
      <div className="bg-[#111] border border-[#222] hover:border-red-600 transition-all duration-300 overflow-hidden">
        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-[#0a0a0a]">
          <div
            className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] group-hover:scale-105 transition-transform duration-500"
            style={{
              backgroundImage: `url(${product.images[0]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
        </div>
        {/* Info */}
        <div className="p-4 border-t border-[#222]">
          <p className="text-[#888] text-xs tracking-widest uppercase mb-1">{product.category}</p>
          <h3 className="text-white font-medium text-sm tracking-wide mb-2">{product.name}</h3>
          <p className="text-white font-bold">${product.price.toLocaleString('es-MX')} MXN</p>
        </div>
      </div>
    </Link>
  );
}
