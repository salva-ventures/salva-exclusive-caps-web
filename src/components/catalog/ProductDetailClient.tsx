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
    const [channel, setChannel] = useState<"email" | "whatsapp">("email");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
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
            const payload =
                channel === "email"
                    ? {
                        productId: product.id,
                        channel: "email" as const,
                        email,
                        source: "product_page",
                    }
                    : {
                        productId: product.id,
                        channel: "whatsapp" as const,
                        phone,
                        source: "product_page",
                    };

            const res = await fetch("/api/back-in-stock/request", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Error al registrar solicitud");
            }

            setMessage("Listo. Te avisaremos cuando haya disponibilidad.");
            setEmail("");
            setPhone("");
        } catch (err) {
            setMessage(err instanceof Error ? err.message : "Error inesperado");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="bg-black min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-12">
                <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2">
                    <div>
                        <div className="relative mb-4 aspect-square overflow-hidden border border-[#222] bg-[#111] shadow-[0_0_30px_rgba(220,38,38,0.15)]">
                            <div
                                className="h-full w-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] transition-all duration-500"
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
                                        className={`aspect-square flex-1 overflow-hidden border-2 transition-all duration-300 ${activeImage === i
                                                ? "border-red-600 shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                                                : "border-[#222] hover:border-[#444]"
                                            }`}
                                    >
                                        <div
                                            className="h-full w-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a]"
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
                        <p className="mb-2 text-xs uppercase tracking-[0.4em] text-red-600">
                            {product.tipo}
                        </p>
                        <h1 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-4xl">
                            {product.name}
                        </h1>
                        <p className="mb-6 text-sm text-[#888]">SKU: {product.sku}</p>

                        <p className="mb-8 leading-relaxed text-[#ccc]">
                            {product.shortDescription}
                        </p>

                        <div className="mb-6">
                            <p className="mb-3 text-xs uppercase tracking-widest text-white">
                                Colores disponibles
                            </p>
                            <div className="flex flex-wrap gap-2">
                                {product.colors.map((color) => (
                                    <span
                                        key={color}
                                        className="border border-[#333] px-3 py-1 text-xs text-[#888]"
                                    >
                                        {color}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8 space-y-4 border border-[#222] bg-[#111] p-5">
                            <p className="text-sm font-medium text-white">Disponibilidad</p>

                            {!isOutOfStock ? (
                                <p className="text-sm text-green-400">
                                    Disponible ({stockAvailable} en stock)
                                </p>
                            ) : (
                                <>
                                    <p className="text-sm text-red-400">Actualmente sin stock</p>

                                    {!showBackInStock ? (
                                        <button
                                            onClick={() => setShowBackInStock(true)}
                                            className="px-6 py-3 text-xs uppercase tracking-[0.2em] text-red-500 transition hover:bg-red-600 hover:text-white border border-red-600"
                                        >
                                            Avisarme cuando haya stock
                                        </button>
                                    ) : (
                                        <form
                                            onSubmit={handleBackInStockSubmit}
                                            className="space-y-4"
                                        >
                                            <div className="flex gap-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setChannel("email")}
                                                    className={`flex-1 px-4 py-3 text-xs uppercase tracking-[0.16em] transition ${channel === "email"
                                                            ? "bg-white text-black"
                                                            : "border border-[#333] text-[#aaa] hover:border-[#555] hover:text-white"
                                                        }`}
                                                >
                                                    Correo
                                                </button>

                                                <button
                                                    type="button"
                                                    onClick={() => setChannel("whatsapp")}
                                                    className={`flex-1 px-4 py-3 text-xs uppercase tracking-[0.16em] transition ${channel === "whatsapp"
                                                            ? "bg-white text-black"
                                                            : "border border-[#333] text-[#aaa] hover:border-[#555] hover:text-white"
                                                        }`}
                                                >
                                                    WhatsApp
                                                </button>
                                            </div>

                                            {channel === "email" ? (
                                                <input
                                                    type="email"
                                                    placeholder="Tu correo"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    required
                                                    className="w-full border border-[#333] bg-black px-4 py-3 text-sm text-white outline-none focus:border-red-600"
                                                />
                                            ) : (
                                                <input
                                                    type="tel"
                                                    placeholder="Tu WhatsApp"
                                                    value={phone}
                                                    onChange={(e) => setPhone(e.target.value)}
                                                    required
                                                    className="w-full border border-[#333] bg-black px-4 py-3 text-sm text-white outline-none focus:border-red-600"
                                                />
                                            )}

                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full bg-white px-6 py-3 text-xs font-medium uppercase tracking-[0.2em] text-black transition hover:bg-gray-200 disabled:opacity-50"
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
                            className="mb-4 bg-red-600 px-8 py-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-white transition-all duration-300 hover:bg-red-700"
                        >
                            Consultar por WhatsApp
                        </a>

                        <Link
                            href="/catalogo"
                            className="border border-[#333] px-8 py-4 text-center text-xs font-medium uppercase tracking-[0.2em] text-[#888] transition-all duration-300 hover:border-white hover:text-white"
                        >
                            Volver al Catálogo
                        </Link>
                    </div>
                </div>

                {relatedProductsWithImages.length > 0 && (
                    <div className="border-t border-[#222] pt-16">
                        <div className="mb-12">
                            <p className="mb-3 text-xs uppercase tracking-[0.4em] text-red-600">
                                Relacionados
                            </p>
                            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                                Productos Similares
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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