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
      <div className={`max-w-[85%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-2`}>
        <div
          className={[
            "rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-lg",
            isUser
              ? "bg-white text-black"
              : "border border-white/10 bg-white/8 text-white backdrop-blur-sm",
          ].join(" ")}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>

        {!isUser && message.actions?.length ? (
          <QuickActions actions={message.actions} onActionClick={onActionClick} />
        ) : null}
      </div>
    </div>
  );
}
