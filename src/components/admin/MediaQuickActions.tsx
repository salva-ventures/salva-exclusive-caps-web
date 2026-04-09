"use client";

type MediaQuickActionsProps = {
  publicUrl: string;
  storagePath: string;
};

async function copyText(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    window.alert("Copiado.");
  } catch {
    window.alert("No se pudo copiar.");
  }
}

export default function MediaQuickActions({
  publicUrl,
  storagePath,
}: MediaQuickActionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => copyText(publicUrl)}
        className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/85 transition hover:bg-white/[0.06]"
      >
        Copiar URL
      </button>

      <button
        type="button"
        onClick={() => copyText(storagePath)}
        className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/85 transition hover:bg-white/[0.06]"
      >
        Copiar path
      </button>

      <a
        href={publicUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/85 transition hover:bg-white/[0.06]"
      >
        Abrir archivo
      </a>
    </div>
  );
}