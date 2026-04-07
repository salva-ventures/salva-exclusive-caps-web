"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { ChatbotMemory, ChatMessage } from "@/types/chatbot";
import {
  getChatbotResponse,
  getUpdatedMemory,
} from "@/lib/chatbot/chatbotEngine";
import ChatInput from "./ChatInput";
import ChatMessageItem from "./ChatMessage";

interface ChatbotWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

const CHAT_STORAGE_KEY = "salva_chatbot_messages_v4";
const CHAT_MEMORY_KEY = "salva_chatbot_memory_v1";

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

function isValidMemory(value: unknown): value is ChatbotMemory {
  return Boolean(value && typeof value === "object");
}

function TypingBubble() {
  return (
    <div className="flex w-full justify-start">
      <div className="flex max-w-[88%] flex-col items-start gap-2">
        <div className="mb-1 flex items-center gap-2 px-1">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white text-[10px] font-bold tracking-[0.18em] text-black">
            SG
          </span>
          <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
            SALVA GORRÍN
          </span>
        </div>

        <div className="rounded-[1.35rem] rounded-bl-md border border-white/10 bg-white/[0.06] px-4 py-3 text-white shadow-[0_16px_40px_rgba(0,0,0,0.22)] backdrop-blur-md">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 animate-bounce rounded-full bg-white/70 [animation-delay:-0.2s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-white/70 [animation-delay:-0.1s]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-white/70" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatbotWindow({
  isOpen,
  onClose,
}: ChatbotWindowProps) {
  const pathname = usePathname();
  const messagesContainerRef = useRef<HTMLDivElement | null>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const memoryRef = useRef<ChatbotMemory>({});

  const initialAssistantMessage = useMemo(() => {
    const response = getChatbotResponse("hola", { pathname, memory: {} });
    memoryRef.current = getUpdatedMemory("hola", response, {});
    return createMessage("assistant", response.content, response.actions);
  }, [pathname]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    initialAssistantMessage,
  ]);
  const [hasLoadedFromStorage, setHasLoadedFromStorage] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    try {
      const storedValue = window.localStorage.getItem(CHAT_STORAGE_KEY);
      const storedMemory = window.localStorage.getItem(CHAT_MEMORY_KEY);

      if (storedValue) {
        const parsed = JSON.parse(storedValue) as unknown;

        if (isValidMessageArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }

      if (storedMemory) {
        const parsedMemory = JSON.parse(storedMemory) as unknown;

        if (isValidMemory(parsedMemory)) {
          memoryRef.current = parsedMemory;
        }
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
      window.localStorage.setItem(
        CHAT_MEMORY_KEY,
        JSON.stringify(memoryRef.current)
      );
    } catch {
    }
  }, [messages, hasLoadedFromStorage]);

  useEffect(() => {
    if (!messagesContainerRef.current) return;

    messagesContainerRef.current.scrollTo({
      top: messagesContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, isOpen, isTyping]);

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!hasLoadedFromStorage) return;

    setMessages((prev) => {
      if (prev.length !== 1 || prev[0]?.role !== "assistant") {
        return prev;
      }

      const response = getChatbotResponse("hola", {
        pathname,
        memory: memoryRef.current,
      });

      memoryRef.current = getUpdatedMemory("hola", response, memoryRef.current);

      return [
        {
          ...prev[0],
          content: response.content,
          actions: response.actions,
        },
      ];
    });
  }, [pathname, hasLoadedFromStorage]);

  function resolveTypingDelay(input: string) {
    const base = 550;
    const extra = Math.min(input.trim().length * 12, 650);
    return base + extra;
  }

  function handleSend(input: string) {
    if (isTyping) return;

    const userMessage = createMessage("user", input);
    const response = getChatbotResponse(input, {
      pathname,
      memory: memoryRef.current,
    });

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      const assistantMessage = createMessage(
        "assistant",
        response.content,
        response.actions
      );

      memoryRef.current = getUpdatedMemory(input, response, memoryRef.current);
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
      typingTimeoutRef.current = null;
    }, resolveTypingDelay(input));
  }

  function handleClearChat() {
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
      typingTimeoutRef.current = null;
    }

    const response = getChatbotResponse("hola", { pathname, memory: {} });
    const freshMessage = createMessage(
      "assistant",
      response.content,
      response.actions
    );

    memoryRef.current = getUpdatedMemory("hola", response, {});
    setIsTyping(false);
    setMessages([freshMessage]);

    try {
      window.localStorage.removeItem(CHAT_STORAGE_KEY);
      window.localStorage.removeItem(CHAT_MEMORY_KEY);
    } catch {
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-3 bottom-20 top-[max(4.5rem,env(safe-area-inset-top))] z-[70] sm:bottom-24 sm:right-6 sm:left-auto sm:top-auto sm:w-[min(400px,calc(100vw-1.5rem))]">
      <div className="relative flex h-full max-h-[calc(100dvh-6rem)] flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-[rgba(8,8,8,0.92)] shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-2xl sm:h-auto sm:max-h-[min(720px,calc(100dvh-8rem))]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.09),transparent_35%)]" />

        <div className="relative border-b border-white/10 px-3 py-3 sm:px-4 sm:py-4">
          <div className="flex items-start gap-2 sm:gap-3">
            <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white text-[11px] font-bold tracking-[0.2em] text-black shadow-[0_10px_30px_rgba(255,255,255,0.12)] sm:h-11 sm:w-11 sm:text-xs sm:tracking-[0.24em]">
              SG
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white sm:text-[15px]">
                Salva Gorrín
              </p>
              <p className="mt-1 text-[11px] leading-relaxed text-white/60 sm:text-xs">
                Catálogo, compras, mayoreo, contacto, chistes y datos curiosos de gorras.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={handleClearChat}
                aria-label="Limpiar conversación"
                className="inline-flex h-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] px-3 text-[11px] font-medium text-white transition hover:bg-white/[0.1] sm:h-10 sm:text-xs"
              >
                Limpiar
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar chatbot"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/[0.05] text-base text-white transition hover:bg-white/[0.1] sm:h-10 sm:w-10 sm:text-lg"
              >
                ×
              </button>
            </div>
          </div>
        </div>

        <div
          ref={messagesContainerRef}
          className="relative flex min-h-0 flex-1 flex-col gap-5 overflow-y-auto px-3 py-4 sm:px-4"
          style={{ scrollbarWidth: "thin" }}
        >
          {messages.map((message) => (
            <ChatMessageItem
              key={message.id}
              message={message}
              onActionClick={handleSend}
            />
          ))}

          {isTyping ? <TypingBubble /> : null}
        </div>

        <ChatInput onSend={handleSend} disabled={isTyping} />
      </div>
    </div>
  );
}
