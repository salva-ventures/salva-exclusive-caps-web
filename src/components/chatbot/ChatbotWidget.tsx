"use client";

import { useEffect, useState } from "react";
import ChatbotWindow from "./ChatbotWindow";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <ChatbotWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Cerrar Asistente Salva" : "Abrir Asistente Salva"}
          className={[
            "group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/10",
            "bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))] px-3 py-3 text-white",
            "shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-300",
            "hover:scale-[1.02] hover:border-white/20 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.07))]",
            isMounted ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
          ].join(" ")}
        >
          <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_42%)] opacity-70" />

          <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/5 bg-white text-xs font-bold tracking-[0.2em] text-black">
            SC
          </span>

          <span className="relative hidden pr-1 text-left sm:block">
            <span className="block text-sm font-semibold leading-none">
              Asistente Salva
            </span>
            <span className="mt-1 block text-xs leading-none text-white/60">
              Ayuda, catálogo y chistes
            </span>
          </span>
        </button>
      </div>
    </>
  );
}
