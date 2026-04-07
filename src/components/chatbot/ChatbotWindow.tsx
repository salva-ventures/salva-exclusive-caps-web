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
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
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

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

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
    <div className="fixed bottom-24 right-4 z-[70] w-[calc(100vw-2rem)] max-w-[380px] sm:right-6 sm:w-[380px]">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]/95 shadow-2xl backdrop-blur-xl">
        <div className="flex items-start justify-between border-b border-white/10 bg-white/5 px-4 py-4">
          <div className="pr-4">
            <p className="text-sm font-semibold text-white">Asistente Salva</p>
            <p className="mt-1 text-xs text-white/60">
              Catálogo, compras, mayoreo, contacto y humor de gorras.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar chatbot"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition hover:bg-white/10"
          >
            ×
          </button>
        </div>

        <div
          ref={messagesContainerRef}
          className="flex h-[420px] flex-col gap-4 overflow-y-auto px-3 py-4 sm:px-4"
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
