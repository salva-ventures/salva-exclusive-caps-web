import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SEO } from "@/config/brand";

export const metadata: Metadata = {
  title: SEO.default.title,
  description: SEO.default.description,
  keywords: SEO.default.keywords,
  openGraph: {
    title: SEO.default.title,
    description: SEO.default.description,
    type: 'website',
    locale: 'es_MX',
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
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
