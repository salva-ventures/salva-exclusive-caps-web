"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
    requestId: string;
};

export default function BackInStockStatusActions({ requestId }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState<"notified" | "cancelled" | null>(null);

    async function updateStatus(status: "notified" | "cancelled") {
        setLoading(status);

        try {
            const response = await fetch("/api/admin/back-in-stock/update-status", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    requestId,
                    status,
                }),
            });

            const payload = (await response.json().catch(() => null)) as
                | { ok?: boolean; error?: string }
                | null;

            if (!response.ok) {
                throw new Error(payload?.error ?? "No se pudo actualizar el estado.");
            }

            router.refresh();
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "No se pudo actualizar el estado.";

            window.alert(message);
        } finally {
            setLoading(null);
        }
    }

    return (
        <>
            <button
                type="button"
                onClick={() => void updateStatus("notified")}
                disabled={loading !== null}
                className="rounded-xl border border-green-500/20 px-4 py-2 text-sm text-green-300 transition hover:bg-green-500/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading === "notified" ? "Marcando..." : "Marcar como notificado"}
            </button>

            <button
                type="button"
                onClick={() => void updateStatus("cancelled")}
                disabled={loading !== null}
                className="rounded-xl border border-red-500/20 px-4 py-2 text-sm text-red-300 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {loading === "cancelled" ? "Cancelando..." : "Cancelar"}
            </button>
        </>
    );
}