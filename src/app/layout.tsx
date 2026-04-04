import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Salva Exclusive Caps — Gorras Premium México",
  description: "Gorras premium con identidad propia. Diseño, exclusividad y una experiencia de compra distinta dentro del mercado mexicano.",
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
