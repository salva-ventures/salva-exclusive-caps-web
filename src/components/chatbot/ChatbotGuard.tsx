"use client";

import { usePathname } from "next/navigation";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";

export default function ChatbotGuard() {
  const pathname = usePathname();

  if (pathname === "/juego" || pathname.startsWith("/juego/")) {
    return null;
  }

  return (
    <>
      <div className="fixed bottom-24 right-6 z-[9999] rounded bg-red-600 px-3 py-2 text-sm text-white">
        GUARD ACTIVO
      </div>
      <ChatbotWidget />
    </>
  );
}
