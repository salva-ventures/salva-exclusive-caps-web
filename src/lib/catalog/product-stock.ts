import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

type RawInventoryRow = {
    stock_available: number | null;
};

type RawProductRow = {
    slug: string;
    inventory: RawInventoryRow[] | null;
};

export async function getProductStockBySlug(slug: string): Promise<number> {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase
        .from("products")
        .select(`
      slug,
      inventory (
        stock_available
      )
    `)
        .eq("slug", slug)
        .maybeSingle();

    if (error) {
        throw new Error(`Error cargando stock del producto: ${error.message}`);
    }

    const row = data as RawProductRow | null;
    const inventory = Array.isArray(row?.inventory) ? row.inventory[0] : null;

    return inventory?.stock_available ?? 0;
}