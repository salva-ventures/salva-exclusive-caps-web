"use client";

import Link from "next/link";
import type { ChatAction } from "@/types/chatbot";

interface QuickActionsProps {
  actions: ChatAction[];
  onActionClick: (value: string) => void;
}

export default function QuickActions({
  actions,
  onActionClick,
}: QuickActionsProps) {
  if (!actions.length) return null;

  return (
    <div className="flex flex-wrap gap-2 px-1">
      {actions.map((action, index) => {
        const baseClassName =
          "inline-flex rounded-full border border-white/10 bg-white/[0.05] px-3 py-2 text-xs font-medium text-white transition hover:scale-[1.02] hover:bg-white/[0.1]";

        if (action.type === "link" && action.href) {
          const isExternal =
            action.href.startsWith("http://") ||
            action.href.startsWith("https://") ||
            action.href.startsWith("mailto:") ||
            action.href.startsWith("tel:");

          if (isExternal) {
            return (
              <a
                key={`${action.label}-${index}`}
                href={action.href}
                target="_blank"
                rel="noreferrer"
                className={baseClassName}
              >
                {action.label}
              </a>
            );
          }

          return (
            <Link
              key={`${action.label}-${index}`}
              href={action.href}
              className={baseClassName}
            >
              {action.label}
            </Link>
          );
        }

        if (action.type === "message" && action.value) {
          return (
            <button
              key={`${action.label}-${index}`}
              type="button"
              onClick={() => onActionClick(action.value as string)}
              className={baseClassName}
            >
              {action.label}
            </button>
          );
        }

        return null;
      })}
    </div>
  );
}
