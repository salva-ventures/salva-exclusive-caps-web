"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({
  onSend,
  disabled = false,
}: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height = `${Math.min(
      textareaRef.current.scrollHeight,
      140
    )}px`;
  }, [value]);

  function submitMessage() {
    const trimmed = value.trim();

    if (!trimmed || disabled) return;

    onSend(trimmed);
    setValue("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    submitMessage();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submitMessage();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-white/10 bg-gradient-to-b from-white/[0.03] to-white/[0.02] p-3 sm:p-4"
    >
      <div className="flex items-end gap-2 rounded-[1.4rem] border border-white/10 bg-white/[0.04] p-2 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-md">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Escribe tu mensaje..."
          rows={1}
          className="min-h-[44px] max-h-[140px] flex-1 resize-none bg-transparent px-3 py-2 text-sm leading-relaxed text-white outline-none placeholder:text-white/35"
        />

        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="inline-flex h-11 min-w-[44px] items-center justify-center rounded-2xl border border-white/10 bg-white px-4 text-sm font-semibold text-black transition hover:scale-[1.02] hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Enviar
        </button>
      </div>

      <p className="mt-2 px-1 text-[11px] text-white/35">
        Enter para enviar. Shift + Enter para salto de línea.
      </p>
    </form>
  );
}
