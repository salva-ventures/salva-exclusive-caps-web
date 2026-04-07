"use client";

import { useEffect, useRef, useState } from "react";

interface ChatInputProps {
  onSend: (value: string) => void;
  disabled?: boolean;
}

const QUICK_ACTIONS = [
  "Ver catálogo",
  "Ayúdame a elegir",
  "Dato curioso",
  "Envíos",
  "Mayoreo",
];

export default function ChatInput({
  onSend,
  disabled = false,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!disabled) {
      inputRef.current?.focus();
    }
  }, [disabled]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedValue = value.trim();
    if (!trimmedValue || disabled) return;

    onSend(trimmedValue);
    setValue("");
  }

  function handleQuickAction(action: string) {
    if (disabled) return;
    onSend(action);
    setValue("");
  }

  return (
    <div className="relative border-t border-white/10 bg-[rgba(10,10,10,0.86)] px-3 pb-3 pt-3 backdrop-blur-2xl sm:px-4 sm:pb-4">
      <div className="mb-3 flex flex-wrap gap-2">
        {QUICK_ACTIONS.map((action) => (
          <button
            key={action}
            type="button"
            onClick={() => handleQuickAction(action)}
            disabled={disabled}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-3 py-2 text-[11px] font-medium text-white/85 transition duration-300 hover:border-white/20 hover:bg-white/[0.1] disabled:cursor-not-allowed disabled:opacity-50 sm:text-xs"
          >
            {action}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Pregúntale algo a Salva Gorrín..."
            disabled={disabled}
            className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 pr-4 text-sm text-white outline-none transition duration-300 placeholder:text-white/35 focus:border-white/20 focus:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-60"
            maxLength={400}
          />
        </div>

        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="inline-flex h-12 min-w-[52px] items-center justify-center rounded-2xl border border-white/10 bg-white text-sm font-semibold text-black transition duration-300 hover:bg-white/90 disabled:cursor-not-allowed disabled:border-white/10 disabled:bg-white/20 disabled:text-white/45"
          aria-label="Enviar mensaje"
        >
          Enviar
        </button>
      </form>
    </div>
  );
}
