"use client";

import { useMemo, useState } from "react";
import AdminCatalogBoard from "@/components/admin/AdminCatalogBoard";
import AdminCatalogDrawer from "@/components/admin/AdminCatalogDrawer";
import AdminCatalogKanban from "@/components/admin/AdminCatalogKanban";
import AdminCatalogList from "@/components/admin/AdminCatalogList";
import AdminFeaturedHomePanel from "@/components/admin/AdminFeaturedHomePanel";

type CatalogTag = {
  id: string;
  tag: string;
  catalog_scope: "retail" | "wholesale" | "both";
  sort_order: number;
  is_active: boolean;
};

type CatalogProduct = {
  id: string;
  slug: string;
  sku: string | null;
  name: string;
  brand_name: string | null;
  collab_name: string | null;
  category_name: string | null;
  rarity_name: string | null;
  catalog_status: "active" | "draft" | "archived";
  is_retail_visible: boolean;
  is_wholesale_visible: boolean;
  retail_sort_order: number;
  wholesale_sort_order: number;
  retail_price: number | null;
  wholesale_price: number | null;
  retail_label: string | null;
  wholesale_label: string | null;
  primary_image_url: string | null;
  media_count: number;
  tags: CatalogTag[];
  is_featured_home?: boolean;
};

type WorkMode = "explore" | "select" | "order";
type ViewMode = "list" | "kanban";

export default function AdminCatalogWorkspace({
  scope,
  products,
}: {
  scope: "retail" | "wholesale";
  products: CatalogProduct[];
}) {
  const [mode, setMode] = useState<WorkMode>("explore");
  const [view, setView] = useState<ViewMode>("list");
  const [drawerProductId, setDrawerProductId] = useState<string | null>(null);

  const drawerProduct = useMemo(
    () => products.find((product) => product.id === drawerProductId) ?? null,
    [products, drawerProductId]
  );

  function closeDrawer() {
    setDrawerProductId(null);
  }

  return (
    <div className="space-y-4">
      <AdminFeaturedHomePanel scope={scope} />

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 md:p-5">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-white/45">
              Modo de trabajo
            </p>
            <h3 className="mt-1 text-lg font-semibold text-white">
              {mode === "explore"
                ? "Explorar y editar"
                : mode === "select"
                ? "Seleccionar y operar"
                : "Ordenar catálogo"}
            </h3>
            <p className="mt-1 text-sm text-white/45">
              {mode === "order"
                ? "Ordena sin distracciones. En celular sigue usando Subir/Bajar."
                : "Cambia entre explorar, seleccionar o ordenar según la tarea."}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setMode("explore")}
              className={`rounded-2xl px-4 py-2 text-sm transition ${
                mode === "explore"
                  ? "bg-white text-black"
                  : "border border-white/10 text-white/80 hover:bg-white/[0.04]"
              }`}
            >
              Explorar
            </button>

            <button
              type="button"
              onClick={() => setMode("select")}
              className={`rounded-2xl px-4 py-2 text-sm transition ${
                mode === "select"
                  ? "bg-white text-black"
                  : "border border-white/10 text-white/80 hover:bg-white/[0.04]"
              }`}
            >
              Seleccionar
            </button>

            <button
              type="button"
              onClick={() => setMode("order")}
              className={`rounded-2xl px-4 py-2 text-sm transition ${
                mode === "order"
                  ? "bg-white text-black"
                  : "border border-white/10 text-white/80 hover:bg-white/[0.04]"
              }`}
            >
              Ordenar
            </button>

            {mode !== "order" && (
              <>
                <button
                  type="button"
                  onClick={() => setView("list")}
                  className={`rounded-2xl px-4 py-2 text-sm transition ${
                    view === "list"
                      ? "bg-white text-black"
                      : "border border-white/10 text-white/80 hover:bg-white/[0.04]"
                  }`}
                >
                  Lista
                </button>

                <button
                  type="button"
                  onClick={() => setView("kanban")}
                  className={`rounded-2xl px-4 py-2 text-sm transition ${
                    view === "kanban"
                      ? "bg-white text-black"
                      : "border border-white/10 text-white/80 hover:bg-white/[0.04]"
                  }`}
                >
                  Kanban
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {mode === "order" ? (
        <AdminCatalogBoard
          scope={scope}
          products={products.map((product) => ({
            id: product.id,
            name: product.name,
            slug: product.slug,
            scopeSortOrder:
              scope === "retail"
                ? product.retail_sort_order
                : product.wholesale_sort_order,
          }))}
        />
      ) : view === "kanban" ? (
        <AdminCatalogKanban
          scope={scope}
          products={products}
          onEdit={setDrawerProductId}
        />
      ) : (
        <AdminCatalogList scope={scope} products={products} mode={mode} />
      )}

      <AdminCatalogDrawer
        scope={scope}
        product={drawerProduct}
        open={drawerProduct !== null}
        onClose={closeDrawer}
      />
    </div>
  );
}