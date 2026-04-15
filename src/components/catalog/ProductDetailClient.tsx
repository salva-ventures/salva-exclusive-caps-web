"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { CONTACT } from "@/config/brand";
import type { Product } from "@/data/products";
import {
    getGalleryImages,
    getPrimaryImageUrl,
    getProductImagesBySlugs,
    type ProductImagesMap,
} from "@/lib/catalog/getProductImages";
import ProductCard from "@/components/ProductCard";

type ProductWithSupabaseImages = Product & {
    image?: string;
    gallery?: Array<{
        public_url: string;
        sort_order: number;
        is_primary: boolean;
    }>;
};

type Props = {
    product: Product;
    relatedProducts: Product[];
    stockAvailable: number;
};

export default function ProductDetailClient({
    product,
    relatedProducts,
    stockAvailable,
}: Props) {
    const [imageMap, setImageMap] = useState<ProductImagesMap>({});
    const [activeImage, setActiveImage] = useState(0);
    const [showBackInStock, setShowBackInStock] = useState(false);
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;

        async function loadImages() {
            try {
                const slugs = [product.slug, ...relatedProducts.map((p) => p.slug)];
                const map = await getProductImagesBySlugs(slugs);

                if (!cancelled) {
                    setImageMap(map);
                }
            } catch (error) {
                console.error("Error cargando imágenes desde Supabase:", error);
            }
        }

        loadImages();

        return () => {
            cancelled = true;
        };
    }, [product.slug, relatedProducts]);

    const productGalleryUrls = useMemo(() => {
        const supabaseGallery = getGalleryImages(imageMap, product.slug).map(
            (img) => img.public_url
        );

        return supabaseGallery.length > 0 ? supabaseGallery : product.images;
    }, [imageMap, product.images, product.slug]);

    useEffect(() => {
        if (activeImage > productGalleryUrls.length - 1) {
            setActiveImage(0);
        }
    }, [activeImage, productGalleryUrls.length]);

    const relatedProductsWithImages: ProductWithSupabaseImages[] = relatedProducts.map(
        (relatedProduct) => ({
            ...relatedProduct,
            image: getPrimaryImageUrl(
                imageMap,
                relatedProduct.slug,
                relatedProduct.images?.[0]
            ),
            gallery: getGalleryImages(imageMap, relatedProduct.slug),
        })
    );

    const waMessage = encodeURIComponent(
        `Hola, me interesa la gorra "${product.name}" (SKU: ${product.sku}). ¿Está disponible?`
    );
    const waLink = `https://wa.me/${CONTACT.whatsapp.number.replace(/\+/g, "")}?text=${waMessage}`;

    const isOutOfStock = stockAvailable <= 0;

    async function handleBackInStockSubmit(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const res = await fetch("/api/back-in-stock/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    productId: product.id,
                    channel: "email",
                    email,
                    source: "product_page",
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Error al registrar solicitud");
            }

            setMessage("Listo. Te avisaremos cuando haya stock.");
            setEmail("");
        } catch (err) {
            setMessage(err instanceof Error ? err.message : "Error inesperado");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-black min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <div>
                        <div className="relative aspect-square bg-[#111] border border-[#222] overflow-hidden mb-4 shadow-[0_0_30px_rgba(220,38,38,0.15)]">
                            <div
                                className="w-full h-full transition-all duration-500 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]"
                                style={{
                                    backgroundImage: `url(${productGalleryUrls[activeImage]})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                }}
                            />
                        </div>

                        {productGalleryUrls.length > 1 && (
                            <div className="flex gap-3">
                                {productGalleryUrls.map((img, i) => (
                                    <button
                                        key={`${img}-${i}`}
                                        onClick={() => setActiveImage(i)}
                                        className={`flex-1 aspect-square border-2 overflow-hidden transition-all duration-300 ${activeImage === i
                                                ? "border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                                                : "border-[#222] hover:border-[#444]"
                                            }`}
                                    >
                                        <div
                                            className="w-full h-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]"
                                            style={{
                                                backgroundImage: `url(${img})`,
                                                backgroundSize: "cover",
                                                backgroundPosition: "center",
                                            }}
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex flex-col">
                        <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-2">
                            {product.tipo}
                        </p>
                        <h1 className="text-white font-bold text-3xl md:text-4xl tracking-tight mb-4">
                            {product.name}
                        </h1>
                        <p className="text-[#888] text-sm mb-6">SKU: {product.sku}</p>

                        <p className="text-[#ccc] leading-relaxed mb-8">
                            {product.shortDescription}
                        </p>

                        <div className="mb-6">
                            <p className="text-white text-xs tracking-widest uppercase mb-3">
                                Colores disponibles
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {product.colors.map((color) => (
                                    <span
                                        key={color}
                                        className="border border-[#333] text-[#888] px-3 py-1 text-xs"
                                    >
                                        {color}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-[#111] border border-[#222] p-5 mb-8 space-y-4">
                            <p className="text-white text-sm font-medium">Disponibilidad</p>

                            {!isOutOfStock ? (
                                <p className="text-green-400 text-sm">
                                    Disponible ({stockAvailable} en stock)
                                </p>
                            ) : (
                                <>
                                    <p className="text-red-400 text-sm">Actualmente sin stock</p>

                                    {!showBackInStock ? (
                                        <button
                                            onClick={() => setShowBackInStock(true)}
                                            className="border border-red-600 text-red-500 hover:bg-red-600 hover:text-white px-6 py-3 text-xs tracking-[0.2em] uppercase transition"
                                        >
                                            Avisarme cuando haya stock
                                        </button>
                                    ) : (
                                        <form
                                            onSubmit={handleBackInStockSubmit}
                                            className="space-y-3"
                                        >
                                            <input
                                                type="email"
                                                placeholder="Tu correo"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="w-full bg-black border border-[#333] px-4 py-3 text-sm text-white outline-none focus:border-red-600"
                                            />

                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full bg-white text-black px-6 py-3 text-xs tracking-[0.2em] uppercase font-medium hover:bg-gray-200 transition disabled:opacity-50"
                                            >
                                                {loading ? "Enviando..." : "Recibir aviso"}
                                            </button>

                                            {message && (
                                                <p className="text-xs text-white/70">{message}</p>
                                            )}
                                        </form>
                                    )}
                                </>
                            )}
                        </div>

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

                {relatedProductsWithImages.length > 0 && (
                    <div className="border-t border-[#222] pt-16">
                        <div className="mb-12">
                            <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-3">
                                Relacionados
                            </p>
                            <h2 className="text-white font-bold text-3xl md:text-4xl tracking-tight">
                                Productos Similares
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {relatedProductsWithImages.map((relatedProduct) => (
                                <ProductCard key={relatedProduct.id} product={relatedProduct} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}