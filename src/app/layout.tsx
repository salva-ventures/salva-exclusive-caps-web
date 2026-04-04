import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/config/brand";

const siteUrl = "https://www.salvaexclusivecaps.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: SEO.default.title,
  description: SEO.default.description,
  keywords: SEO.default.keywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SEO.default.title,
    description: SEO.default.description,
    url: siteUrl,
    siteName: "Salva Exclusive Caps",
    type: "website",
    locale: "es_MX",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Salva Exclusive Caps",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SEO.default.title,
    description: SEO.default.description,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-black">
      <body className="font-sans bg-black text-white min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
