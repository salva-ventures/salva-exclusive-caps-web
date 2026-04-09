import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { logAdminMediaEvent } from "@/lib/admin/audit";
import { supabaseAdmin } from "@/lib/supabase/admin";

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function back(scope: string, params: string) {
  return `/admin/catalog?scope=${scope}&${params}`;
}

type ProductMoveRow = {
  id: string;
  retail_sort_order: number;
  wholesale_sort_order: number;
};

export async function POST(request: Request) {
  const adminUser = await requireAdminUser();
  const formData = await request.formData();

  const id = String(formData.get("id") ?? "");
  const scope = String(formData.get("scope") ?? "retail");
  const direction = String(formData.get("direction") ?? "");

  if (!isUuid(id)) {
    redirect("/admin/catalog?error=invalid-product-id");
  }

  if (!["retail", "wholesale"].includes(scope)) {
    redirect("/admin/catalog?error=invalid-scope");
  }

  if (!["up", "down"].includes(direction)) {
    redirect(back(scope, "error=invalid-direction"));
  }

  const sortField = scope === "retail" ? "retail_sort_order" : "wholesale_sort_order";

  const { data: currentRaw, error: currentError } = await supabaseAdmin
    .from("products")
    .select("id, retail_sort_order, wholesale_sort_order")
    .eq("id", id)
    .maybeSingle();

  if (currentError || !currentRaw) {
    redirect(back(scope, "error=product-not-found"));
  }

  const current = currentRaw as ProductMoveRow;
  const currentOrder =
    scope === "retail" ? current.retail_sort_order : current.wholesale_sort_order;

  let neighborQuery = supabaseAdmin
    .from("products")
    .select("id, retail_sort_order, wholesale_sort_order")
    .neq("id", id);

  if (direction === "up") {
    neighborQuery = neighborQuery
      .lt(sortField, currentOrder)
      .order(sortField, { ascending: false })
      .limit(1);
  } else {
    neighborQuery = neighborQuery
      .gt(sortField, currentOrder)
      .order(sortField, { ascending: true })
      .limit(1);
  }

  const { data: neighborRowsRaw, error: neighborError } = await neighborQuery;

  if (neighborError) {
    redirect(back(scope, "error=move-failed"));
  }

  const neighborRow = neighborRowsRaw?.[0];

  if (!neighborRow) {
    redirect(back(scope, "success=no-move"));
  }

  const neighbor = neighborRow as ProductMoveRow;
  const neighborOrder =
    scope === "retail" ? neighbor.retail_sort_order : neighbor.wholesale_sort_order;

  const { error: currentUpdateError } = await supabaseAdmin
    .from("products")
    .update({ [sortField]: neighborOrder })
    .eq("id", current.id);

  if (currentUpdateError) {
    redirect(back(scope, "error=move-failed"));
  }

  const { error: neighborUpdateError } = await supabaseAdmin
    .from("products")
    .update({ [sortField]: currentOrder })
    .eq("id", neighbor.id);

  if (neighborUpdateError) {
    redirect(back(scope, "error=move-failed"));
  }

  await logAdminMediaEvent({
    adminEmail: adminUser.email,
    actionType: "move_media",
    productId: id,
    details: {
      admin_catalog_reorder: true,
      scope,
      direction,
      previous_order: currentOrder,
      next_order: neighborOrder,
    },
  });

  redirect(back(scope, "success=product-moved"));
}