"use client";

import { useEffect, useState } from "react";

export default function AdminToast({
  message,
  tone = "success",
}: {
  message: string | null;
  tone?: "success" | "error";
}) {
  const [visible, setVisible] = useState(Boolean(message));

  useEffect(() => {
    if (!message) return;
    setVisible(true);

    const timeout = window.setTimeout(() => {
      setVisible(false);
    }, 3500);

    return () => window.clearTimeout(timeout);
  }, [message]);

  if (!message || !visible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[70] max-w-sm">
      <div
        className={`rounded-2xl border px-4 py-3 text-sm shadow-2xl ${
          tone === "success"
            ? "border-green-500/20 bg-green-500/15 text-green-100"
            : "border-red-500/20 bg-red-500/15 text-red-100"
        }`}
      >
        <div className="flex items-start justify-between gap-3">
          <p>{message}</p>
          <button
            type="button"
            onClick={() => setVisible(false)}
            className="text-white/70 transition hover:text-white"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
}