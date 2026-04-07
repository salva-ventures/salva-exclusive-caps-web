"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import ChatbotWindow from "./ChatbotWindow";
import SalvaGorrinAvatar from "./SalvaGorrinAvatar";
import { getChatbotTeaser } from "@/lib/chatbot/chatbotEngine";

const CHATBOT_OPEN_STORAGE_KEY = "salva_chatbot_open_v3";
const CHATBOT_TEASER_DISMISSED_KEY = "salva_chatbot_teaser_dismissed_v1";

export default function ChatbotWidget() {
  const pathname = usePathname();
  const isGameRoute = pathname === "/juego" || pathname.startsWith("/juego/");

  const teaserText = useMemo(() => getChatbotTeaser(pathname), [pathname]);

  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);

  const teaserTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setIsMounted(true);

    try {
      const storedValue = window.localStorage.getItem(CHATBOT_OPEN_STORAGE_KEY);

      if (storedValue === "true") {
        setIsOpen(true);
      } else if (storedValue === "false") {
        setIsOpen(false);
      }
    } catch {
    } finally {
      setHasLoadedFromStorage(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedFromStorage) return;

    try {
      window.localStorage.setItem(CHATBOT_OPEN_STORAGE_KEY, String(isOpen));
    } catch {
    }
  }, [isOpen, hasLoadedFromStorage]);

  useEffect(() => {
    if (!hasLoadedFromStorage) return;
    if (isOpen) return;
    if (isGameRoute) return;

    try {
      const teaserDismissed = window.localStorage.getItem(
        CHATBOT_TEASER_DISMISSED_KEY
      );
      const isDesktop = window.innerWidth >= 640;

      if (teaserDismissed === "true" || !isDesktop) {
        return;
      }

      teaserTimeoutRef.current = setTimeout(() => {
        setShowTeaser(true);
      }, 3200);
    } catch {
    }

    return () => {
      if (teaserTimeoutRef.current) {
        clearTimeout(teaserTimeoutRef.current);
        teaserTimeoutRef.current = null;
      }
    };
  }, [hasLoadedFromStorage, isOpen, isGameRoute, pathname]);

  useEffect(() => {
    if (!isGameRoute) return;

    setShowTeaser(false);
    setIsOpen(false);

    if (teaserTimeoutRef.current) {
      clearTimeout(teaserTimeoutRef.current);
      teaserTimeoutRef.current = null;
    }
  }, [isGameRoute]);

  function openChat() {
    if (teaserTimeoutRef.current) {
      clearTimeout(teaserTimeoutRef.current);
      teaserTimeoutRef.current = null;
    }

    setIsOpen(true);
    setShowTeaser(false);

    try {
      window.localStorage.setItem(CHATBOT_OPEN_STORAGE_KEY, "true");
      window.localStorage.setItem(CHATBOT_TEASER_DISMISSED_KEY, "true");
    } catch {}
  }

  function closeChat() {
    if (teaserTimeoutRef.current) {
      clearTimeout(teaserTimeoutRef.current);
      teaserTimeoutRef.current = null;
    }

    setIsOpen(false);

    try {
      window.localStorage.setItem(CHATBOT_OPEN_STORAGE_KEY, "false");
    } catch {}
  }

  function toggleChat() {
    if (isOpen) {
      closeChat();
      return;
    }

    openChat();
  }

  function dismissTeaser() {
    if (teaserTimeoutRef.current) {
      clearTimeout(teaserTimeoutRef.current);
      teaserTimeoutRef.current = null;
    }

    setShowTeaser(false);

    try {
      window.localStorage.setItem(CHATBOT_TEASER_DISMISSED_KEY, "true");
    } catch {}
  }

  if (isGameRoute) {
    return null;
  }

  return (
    <>
      <ChatbotWindow isOpen={isOpen} onClose={closeChat} />

      <div className="fixed bottom-4 right-4 z-[60] sm:bottom-6 sm:right-6">
        <div className="relative flex flex-col items-end gap-3">
          {showTeaser && !isOpen ? (
            <div
              className={[
                "max-w-[300px] rounded-2xl border border-white/10 bg-[rgba(12,12,12,0.88)] px-4 py-3 text-white",
                "shadow-[0_20px_60px_rgba(0,0,0,0.38)] backdrop-blur-2xl transition duration-500 ease-out",
                isMounted
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-2 scale-[0.985] opacity-0",
              ].join(" ")}
            >
              <div className="flex items-start gap-3">
                <SalvaGorrinAvatar size="md" priority />

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold">Salva Gorrín</p>
                  <p className="mt-1 text-xs leading-relaxed text-white/65">
                    {teaserText} También te cuenta chistes y datos curiosos.
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={openChat}
                      className="inline-flex rounded-full bg-white px-3 py-2 text-xs font-semibold text-black transition hover:bg-white/90"
                    >
                      Abrir
                    </button>

                    <button
                      type="button"
                      onClick={dismissTeaser}
                      className="inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-medium text-white transition hover:bg-white/[0.1]"
                    >
                      Cerrar
                    </button>
                  </div>
                </div>
              </div>

              <div className="pointer-events-none absolute -bottom-2 right-6 h-4 w-4 rotate-45 border-r border-b border-white/10 bg-[rgba(12,12,12,0.88)]" />
            </div>
          ) : null}

          <button
            type="button"
            onClick={toggleChat}
            aria-label={isOpen ? "Cerrar Salva Gorrín" : "Abrir Salva Gorrín"}
            className={[
              "group relative inline-flex items-center gap-3 overflow-visible rounded-full text-white transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
              isMounted
                ? "translate-y-0 scale-100 opacity-100"
                : "translate-y-3 scale-95 opacity-0",
            ].join(" ")}
          >
            <span className="absolute inset-[-12px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22),transparent_62%)] opacity-35 blur-2xl transition duration-500 group-hover:opacity-55" />
            <span className="absolute inset-[-5px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_58%)] opacity-70 blur-md" />

            <span
              className={[
                "relative flex items-center gap-3 overflow-hidden rounded-full border border-white/10",
                "bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.04))] px-3 py-3",
                "shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl transition duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                "hover:scale-[1.025] hover:border-white/20 hover:bg-[linear-gradient(135deg,rgba(255,255,255,0.18),rgba(255,255,255,0.07))]",
                isOpen ? "scale-[0.985]" : "",
              ].join(" ")}
            >
              <span className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.18),transparent_42%)] opacity-70" />

              <SalvaGorrinAvatar
                size="xl"
                priority
                className="relative border-white/15 bg-white/[0.08] shadow-[0_16px_40px_rgba(0,0,0,0.38)]"
                imageClassName="scale-[1.08]"
              />

              <span className="relative hidden pr-1 text-left sm:block">
                <span className="block text-sm font-semibold leading-none">
                  Salva Gorrín
                </span>
                <span className="mt-1 block text-xs leading-none text-white/60">
                  Ayuda, catálogo, chistes y datos curiosos
                </span>
              </span>
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
