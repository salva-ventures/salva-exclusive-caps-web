import type { Metadata } from "next";
import CapCatchGame from "@/components/game/CapCatchGame";

export const metadata: Metadata = {
  title: "Cap Catch | Salva Exclusive Caps",
  description:
    "Atrapa gorras, evita sombreros y consigue la mayor puntuación en el minijuego de Salva Exclusive Caps.",
};

export default function JuegoPage() {
  return (
    <main className="min-h-screen bg-neutral-950 px-4 py-8 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-6">
        <div className="max-w-2xl text-center">
          <p className="mb-2 text-xs uppercase tracking-[0.35em] text-white/55 sm:text-sm">
            Salva Exclusive Caps
          </p>
          <h1 className="text-3xl font-semibold sm:text-5xl">
            Salva Gorrín: Cap Catch
          </h1>
          <p className="mt-3 text-sm leading-6 text-white/70 sm:text-base">
            Atrapa las gorras, evita los sombreros y sobrevive lo más posible.
          </p>
        </div>

        <CapCatchGame />
      </div>
    </main>
  );
}
