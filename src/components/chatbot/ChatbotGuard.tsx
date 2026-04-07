"use client";

import { usePathname } from "next/navigation";
import ChatbotWidget from "@/components/chatbot/ChatbotWidget";

export default function ChatbotGuard() {
  const pathname = usePathname();

  if (pathname.startsWith("/juego")) {
    return null;
  }

  return <ChatbotWidget />;
}
