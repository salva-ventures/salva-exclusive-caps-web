"use client";

import { useState } from "react";
import ChatbotWindow from "./ChatbotWindow";

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatbotWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />

      <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-label={isOpen ? "Cerrar Asistente Salva" : "Abrir Asistente Salva"}
          className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-black px-4 py-3 text-white shadow-2xl transition hover:scale-[1.02] hover:bg-neutral-900"
        >
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-black">
            SC
          </span>

          <span className="hidden text-left sm:block">
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
