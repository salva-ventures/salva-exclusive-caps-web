"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MediaQuickActions from "@/components/admin/MediaQuickActions";

type MediaItem = {
    id: string;
    product_id: string;
    public_url: string;
    storage_path: string;
    bucket: string;
    media_type: string;
    alt_text: string | null;
    sort_order: number;
    is_primary: boolean;
    status: string;
    mime_type: string | null;
    file_size_bytes: number | null;
    width: number | null;
    height: number | null;
    duration_seconds: number | null;
    original_filename: string | null;
};

type MediaSortableGridProps = {
    productId: string;
    productName: string;
    media: MediaItem[];
};

function Badge({
    children,
    tone = "default",
}: {
    children: React.ReactNode;
    tone?: "default" | "green" | "blue" | "yellow" | "red";
}) {
    const toneClasses =
        tone === "green"
            ? "bg-green-500/15 text-green-300"
            : tone === "blue"
                ? "bg-blue-500/15 text-blue-300"
                : tone === "yellow"
                    ? "bg-yellow-500/15 text-yellow-200"
                    : tone === "red"
                        ? "bg-red-500/15 text-red-200"
                        : "bg-white/10 text-white/70";

    return (
        <span className={`rounded-full px-3 py-1 text-xs ${toneClasses}`}>
            {children}
        </span>
    );
}

function moveItem<T>(items: T[], fromIndex: number, toIndex: number): T[] {
    const next = [...items];
    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);
    return next;
}

function truncateMiddle(value: string, maxLength = 46): string {
    if (value.length <= maxLength) return value;
    const start = value.slice(0, Math.floor(maxLength / 2) - 2);
    const end = value.slice(-Math.floor(maxLength / 2) + 2);
    return `${start}...${end}`;
}

export default function MediaSortableGrid({
    productId,
    productName,
    media,
}: MediaSortableGridProps) {
    const router = useRouter();

    const activeImages = useMemo(
        () =>
            media
                .filter((item) => item.media_type === "image" && item.status === "active")
                .slice()
                .sort((a, b) => a.sort_order - b.sort_order),
        [media]
    );

    const [items, setItems] = useState(activeImages);
    const [draggedId, setDraggedId] = useState<string | null>(null);
    const [dropTargetId, setDropTargetId] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [statusMessage, setStatusMessage] = useState<string | null>(null);

    useEffect(() => {
        setItems(activeImages);
    }, [activeImages]);

    async function persistOrder(nextItems: MediaItem[]) {
        setSaving(true);
        setStatusMessage("Guardando nuevo orden...");

        try {
            const response = await fetch("/api/admin/media/reorder", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    orderedMediaIds: nextItems.map((item) => item.id),
                }),
            });

            const payload = (await response.json().catch(() => null)) as
                | { ok?: boolean; error?: string }
                | null;

            if (!response.ok) {
                throw new Error(payload?.error ?? "No se pudo guardar el nuevo orden.");
            }

            setStatusMessage("Orden guardado.");
            router.refresh();

            window.history.replaceState(
                null,
                "",
                `/admin/products/${productId}/media?success=moved`
            );
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "No se pudo guardar el nuevo orden.";

            window.alert(message);
            setItems(activeImages);
            setStatusMessage("No se pudo guardar el orden.");
        } finally {
            setSaving(false);
            setTimeout(() => {
                setStatusMessage(null);
            }, 1800);
        }
    }

    function handleDragStart(mediaId: string) {
        if (saving) return;
        setDraggedId(mediaId);
        setDropTargetId(null);
    }

    function handleDragEnd() {
        setDraggedId(null);
        setDropTargetId(null);
    }

    function handleDragOver(
        event: React.DragEvent<HTMLElement>,
        targetId: string
    ) {
        event.preventDefault();

        if (!draggedId || draggedId === targetId || saving) {
            setDropTargetId(null);
            return;
        }

        setDropTargetId(targetId);
    }

    function handleDrop(targetId: string) {
        if (!draggedId || draggedId === targetId || saving) {
            setDraggedId(null);
            setDropTargetId(null);
            return;
        }

        const fromIndex = items.findIndex((item) => item.id === draggedId);
        const toIndex = items.findIndex((item) => item.id === targetId);

        if (fromIndex === -1 || toIndex === -1) {
            setDraggedId(null);
            setDropTargetId(null);
            return;
        }

        const nextItems = moveItem(items, fromIndex, toIndex).map((item, index) => ({
            ...item,
            sort_order: index + 1,
        }));

        setItems(nextItems);
        setDraggedId(null);
        setDropTargetId(null);
        void persistOrder(nextItems);
    }

    function handleDeleteConfirm(event: React.FormEvent<HTMLFormElement>) {
        const confirmed = window.confirm(
            "Esta accion eliminara permanentemente el archivo y su registro. Continuar?"
        );

        if (!confirmed) {
            event.preventDefault();
        }
    }

    if (items.length === 0) {
        return (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-white/55">
                No hay imagenes activas para reordenar.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                    <div className="text-sm text-white/70">
                        Arrastra y suelta cualquier tarjeta para cambiar el orden.
                    </div>
                    <div className="text-xs text-white/45">
                        El cambio se guarda automaticamente. Los botones de subir y bajar se mantienen como respaldo.
                    </div>
                </div>

                <div className="min-h-5 text-xs">
                    {statusMessage && (
                        <span className={saving ? "text-yellow-200" : "text-green-200"}>
                            {statusMessage}
                        </span>
                    )}
                </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {items.map((media) => {
                    const isDragging = draggedId === media.id;
                    const isDropTarget = dropTargetId === media.id && draggedId !== media.id;

                    return (
                        <article
                            key={media.id}
                            draggable={!saving}
                            onDragStart={() => handleDragStart(media.id)}
                            onDragEnd={handleDragEnd}
                            onDragOver={(event) => handleDragOver(event, media.id)}
                            onDrop={() => handleDrop(media.id)}
                            className={`overflow-hidden rounded-3xl border bg-black/30 transition ${isDragging
                                    ? "border-yellow-400/70 opacity-60 scale-[0.985]"
                                    : isDropTarget
                                        ? "border-blue-400/70 ring-2 ring-blue-400/30"
                                        : "border-white/10"
                                } ${saving ? "cursor-wait" : "cursor-grab active:cursor-grabbing"}`}
                        >
                            <div className="relative aspect-square w-full bg-white/5">
                                <Image
                                    src={media.public_url}
                                    alt={media.alt_text ?? productName}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 1280px) 50vw, 33vw"
                                />

                                <div className="absolute left-3 top-3 flex items-center gap-2">
                                    <span className="rounded-full bg-black/70 px-3 py-1 text-[11px] text-white/85 backdrop-blur">
                                        Arrastrar
                                    </span>
                                    <span className="rounded-full bg-black/70 px-3 py-1 text-[11px] text-white/85 backdrop-blur">
                                        #{media.sort_order}
                                    </span>
                                </div>
                            </div>

                            <div className="space-y-4 p-4 text-sm text-white/70">
                                <div className="flex flex-wrap gap-2">
                                    <Badge tone="blue">Imagen</Badge>
                                    <Badge tone="green">Activo</Badge>
                                    {media.is_primary && <Badge tone="yellow">Principal</Badge>}
                                </div>

                                <div className="space-y-1">
                                    <p className="line-clamp-2 text-sm font-semibold text-white">
                                        {media.original_filename ?? "Sin nombre"}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs text-white/50">
                                        <span>Orden: {media.sort_order}</span>
                                        {media.alt_text && <span>• Con alt</span>}
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    <form
                                        action={`/api/admin/media/${media.id}/move`}
                                        method="post"
                                    >
                                        <input type="hidden" name="direction" value="up" />
                                        <button
                                            type="submit"
                                            className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/85 transition hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
                                            disabled={saving}
                                        >
                                            Subir
                                        </button>
                                    </form>

                                    <form
                                        action={`/api/admin/media/${media.id}/move`}
                                        method="post"
                                    >
                                        <input type="hidden" name="direction" value="down" />
                                        <button
                                            type="submit"
                                            className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/85 transition hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
                                            disabled={saving}
                                        >
                                            Bajar
                                        </button>
                                    </form>

                                    {!media.is_primary && (
                                        <form
                                            action={`/api/admin/media/${media.id}/set-primary`}
                                            method="post"
                                        >
                                            <button
                                                type="submit"
                                                className="rounded-xl border border-yellow-500/20 px-3 py-2 text-xs text-yellow-200 transition hover:bg-yellow-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                                                disabled={saving}
                                            >
                                                Principal
                                            </button>
                                        </form>
                                    )}

                                    <form
                                        action={`/api/admin/media/${media.id}/archive`}
                                        method="post"
                                    >
                                        <input type="hidden" name="confirm_archive" value="yes" />
                                        <button
                                            type="submit"
                                            className="rounded-xl border border-white/10 px-3 py-2 text-xs text-white/85 transition hover:bg-white/[0.06] disabled:cursor-not-allowed disabled:opacity-50"
                                            disabled={saving}
                                        >
                                            Archivar
                                        </button>
                                    </form>

                                    <form
                                        action={`/api/admin/media/${media.id}/delete`}
                                        method="post"
                                        onSubmit={handleDeleteConfirm}
                                    >
                                        <input type="hidden" name="confirm_delete" value="yes" />
                                        <button
                                            type="submit"
                                            className="rounded-xl border border-red-500/20 px-3 py-2 text-xs text-red-200 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-50"
                                            disabled={saving}
                                        >
                                            Eliminar
                                        </button>
                                    </form>
                                </div>

                                <details className="group rounded-2xl border border-white/10 bg-white/[0.03]">
                                    <summary className="cursor-pointer list-none px-4 py-3 text-xs font-medium text-white/75 transition hover:bg-white/[0.04]">
                                        <div className="flex items-center justify-between gap-3">
                                            <span>Detalles tecnicos</span>
                                            <span className="text-white/35 group-open:hidden">Mostrar</span>
                                            <span className="hidden text-white/35 group-open:inline">Ocultar</span>
                                        </div>
                                    </summary>

                                    <div className="space-y-2 border-t border-white/10 px-4 py-3 text-xs text-white/55">
                                        <p>
                                            <span className="text-white/75">Alt:</span>{" "}
                                            {media.alt_text ?? "-"}
                                        </p>
                                        <p>
                                            <span className="text-white/75">Bucket:</span>{" "}
                                            {media.bucket}
                                        </p>
                                        <p title={media.storage_path}>
                                            <span className="text-white/75">Path:</span>{" "}
                                            {truncateMiddle(media.storage_path)}
                                        </p>
                                        <p title={media.public_url}>
                                            <span className="text-white/75">URL:</span>{" "}
                                            {truncateMiddle(media.public_url)}
                                        </p>

                                        <MediaQuickActions
                                            publicUrl={media.public_url}
                                            storagePath={media.storage_path}
                                        />
                                    </div>
                                </details>
                            </div>
                        </article>
                    );
                })}
            </div>
        </div>
    );
}