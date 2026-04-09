import { redirect } from "next/navigation";
import { requireAdminUser } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

function backToEditor(productId: string, params: string) {
  return `/admin/products/${productId}/media?${params}`;
}

export async function POST(
  request: Request,
  context: { params: Promise<{ mediaId: string }> }
) {
  await requireAdminUser();

  const { mediaId } = await context.params;

  if (!isUuid(mediaId)) {
    redirect("/admin/products?error=invalid-media");
  }

  const formData = await request.formData();
  const direction = String(formData.get("direction") ?? "");

  if (direction !== "up" && direction !== "down") {
    redirect("/admin/products?error=invalid-direction");
  }

  const { data: current, error: currentError } = await supabaseAdmin
    .from("product_media")
    .select("id, product_id, sort_order, status")
    .eq("id", mediaId)
    .maybeSingle();

  if (currentError || !current) {
    redirect("/admin/products?error=media-not-found");
  }

  if (current.status !== "active") {
    redirect(backToEditor(current.product_id, "error=move-inactive"));
  }

  let neighborQuery = supabaseAdmin
    .from("product_media")
    .select("id, sort_order")
    .eq("product_id", current.product_id)
    .eq("status", "active");

  if (direction === "up") {
    neighborQuery = neighborQuery.lt("sort_order", current.sort_order).order("sort_order", { ascending: false }).limit(1);
  } else {
    neighborQuery = neighborQuery.gt("sort_order", current.sort_order).order("sort_order", { ascending: true }).limit(1);
  }

  const { data: neighborRows, error: neighborError } = await neighborQuery;

  if (neighborError) {
    redirect(backToEditor(current.product_id, "error=move-failed"));
  }

  const neighbor = neighborRows?.[0];

  if (!neighbor) {
    redirect(backToEditor(current.product_id, "success=no-move"));
  }

  const currentOrder = current.sort_order;
  const neighborOrder = neighbor.sort_order;

  const { error: updateCurrentError } = await supabaseAdmin
    .from("product_media")
    .update({ sort_order: neighborOrder })
    .eq("id", current.id);

  if (updateCurrentError) {
    redirect(backToEditor(current.product_id, "error=move-failed"));
  }

  const { error: updateNeighborError } = await supabaseAdmin
    .from("product_media")
    .update({ sort_order: currentOrder })
    .eq("id", neighbor.id);

  if (updateNeighborError) {
    redirect(backToEditor(current.product_id, "error=move-failed"));
  }

  redirect(backToEditor(current.product_id, "success=moved"));
}