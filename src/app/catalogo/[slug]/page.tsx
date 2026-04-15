import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import ProductDetailClient from "@/components/catalog/ProductDetailClient";
import { getProductStockBySlug } from "@/lib/catalog/product-stock";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = product.relatedSlugs
    .map((relatedSlug) => products.find((p) => p.slug === relatedSlug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p))
    .slice(0, 4);

  const stockAvailable = await getProductStockBySlug(product.slug);

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
      stockAvailable={stockAvailable}
    />
  );
}