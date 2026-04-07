"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { ChatMessage } from "@/types/chatbot";
import { getChatbotResponse } from "@/lib/chatbot/chatbotEngine";
import ChatInput from "./ChatInput";
import ChatMessageItem from "./ChatMessage";

interface ChatbotWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

function createMessage(
  role: ChatMessage["role"],
  content: string,
  actions?: ChatMessage["actions"]
): ChatMessage {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`,
    role,
    content,
    timestamp: new Date().toISOString(),
    actions,
  };
}

export default function ChatbotWindow({
  isOpen,
  onClose,
}: ChatbotWindowProps) {
  const initialAssistantMessage = useMemo(() => {
    const response = getChatbotResponse("hola");
    return createMessage("assistant", response.content, response.actions);
  }, []);

  const [messages, setMessages] = useState<ChatMessage[]>([
    initialAssistantMessage,
  ]);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!messagesContainerRef.current) return;

    messagesContainerRef.current.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  function handleSend(input: string) {
    const userMessage = createMessage("user", input);
    const response = getChatbotResponse(input);
    const assistantMessage = createMessage(
      "assistant",
      response.content,
      response.actions
    );

    setMessages((prev) => [...prev, userMessage, assistantMessage]);
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-3 bottom-24 z-[70] sm:inset-x-auto sm:right-6 sm:w-[420px]">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[rgba(8,8,8,0.92)] shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_35%)]" />

        <div className="relative border-b border-white/10 px-4 py-4 sm:px-5">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white text-xs font-bold tracking-[0.24em] text-black shadow-[0_10px_30px_rgba(255,255,255,0.12)]">
                SC
              </span>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  Asistente Salva
                </p>
                <p className="mt-1 text-xs leading-relaxed text-white/55">
                  Catálogo, compras, mayoreo, contacto y humor de gorras.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Cerrar chatbot"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-lg text-white transition hover:bg-white/[0.1]"
            >
              ×
            </button>
          </div>
        </div>

        <div
          ref={messagesContainerRef}
          className="relative flex h-[min(65vh,520px)] flex-col gap-5 overflow-y-auto px-3 py-4 sm:px-4"
          style={{ scrollbarWidth: "thin" }}
        >
          {messages.map((message) => (
            <ChatMessageItem
              key={message.id}
              message={message}
              onActionClick={handleSend}
            />
          ))}
        </div>

        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
