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

const CHAT_STORAGE_KEY = "salva_chatbot_messages_v1";

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

function createInitialAssistantMessage(): ChatMessage {
  const response = getChatbotResponse("hola");

  return createMessage("assistant", response.content, response.actions);
}

function isValidMessageArray(value: unknown): value is ChatMessage[] {
  if (!Array.isArray(value)) return false;

  return value.every((item) => {
    if (!item || typeof item !== "object") return false;

    const message = item as ChatMessage;

    return (
      typeof message.id === "string" &&
      (message.role === "user" || message.role === "assistant") &&
      typeof message.content === "string" &&
      typeof message.timestamp === "string"
    );
  });
}

export default function ChatbotWindow({
  isOpen,
  onClose,
}: ChatbotWindowProps) {
  const initialAssistantMessage = useMemo(
    () => createInitialAssistantMessage(),
    []
  );

  const [messages, setMessages] = useState<ChatMessage[]>([
    initialAssistantMessage,
  ]);

  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);

  const messagesContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(CHAT_STORAGE_KEY);

      if (!storedValue) {
        setHasLoadedFromStorage(true);
        return;
      }

      const parsed = JSON.parse(storedValue) as unknown;

      if (isValidMessageArray(parsed) && parsed.length > 0) {
        setMessages(parsed);
      }
    } catch {
    } finally {
      setHasLoadedFromStorage(true);
    }
  }, []);

  useEffect(() => {
    if (!hasLoadedFromStorage) return;

    try {
      window.localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(messages));
    } catch {
    }
  }, [messages, hasLoadedFromStorage]);

  useEffect(() => {
    if (!messagesContainerRef.current) return;

    messagesContainerRef.current.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isOpen]);

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

  function handleClearChat() {
    const freshMessage = createInitialAssistantMessage();

    setMessages([freshMessage]);

    try {
      window.localStorage.removeItem(CHAT_STORAGE_KEY);
    } catch {
    }
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

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={handleClearChat}
                aria-label="Limpiar conversación"
                className="inline-flex h-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-3 text-xs font-medium text-white transition hover:bg-white/[0.1]"
              >
                Limpiar
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar chatbot"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-lg text-white transition hover:bg-white/[0.1]"
              >
                ×
              </button>
            </div>
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
