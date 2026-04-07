"use client";

import type { ChatMessage as ChatMessageType } from "@/types/chatbot";
import QuickActions from "./QuickActions";

interface ChatMessageProps {
  message: ChatMessageType;
  onActionClick: (value: string) => void;
}

export default function ChatMessage({
  message,
  onActionClick,
}: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <div className={`flex w-full ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex max-w-[88%] flex-col gap-2 ${
          isUser ? "items-end" : "items-start"
        }`}
      >
        {!isUser ? (
          <div className="mb-1 flex items-center gap-2 px-1">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white text-[10px] font-bold tracking-[0.18em] text-black">
              SG
            </span>
            <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-white/45">
              SALVA GORRÍN
            </span>
          </div>
        ) : null}

        <div
          className={[
            "rounded-[1.35rem] px-4 py-3 text-sm leading-relaxed shadow-[0_16px_40px_rgba(0,0,0,0.22)]",
            isUser
              ? "rounded-br-md bg-white text-black"
              : "rounded-bl-md border border-white/10 bg-white/[0.06] text-white backdrop-blur-md",
          ].join(" ")}
        >
          <p className="whitespace-pre-wrap break-words">{message.content}</p>
        </div>

        {!isUser && message.actions?.length ? (
          <QuickActions actions={message.actions} onActionClick={onActionClick} />
        ) : null}
      </div>
    </div>
  );
}
