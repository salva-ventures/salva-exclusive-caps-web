import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { supabaseAdmin } from "@/lib/supabase/admin";

function isUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function POST(
  request: Request,
  context: { params: Promise<{ mediaId: string }> }
) {
  await requireAdminUser();

  const { mediaId } = await context.params;

  if (!isUuid(mediaId)) {
    return NextResponse.json({ error: "mediaId invalido." }, { status: 400 });
  }

  const formData = await request.formData();
  const direction = String(formData.get("direction") ?? "");

  if (direction !== "up" && direction !== "down") {
    return NextResponse.json({ error: "Direccion invalida." }, { status: 400 });
  }

  const { data: current, error: currentError } = await supabaseAdmin
    .from("product_media")
    .select("id, product_id, sort_order, status")
    .eq("id", mediaId)
    .maybeSingle();

  if (currentError) {
    return NextResponse.json({ error: currentError.message }, { status: 500 });
  }

  if (!current) {
    return NextResponse.json({ error: "Medio no encontrado." }, { status: 404 });
  }

  if (current.status !== "active") {
    return NextResponse.json({ error: "Solo medios activos pueden reordenarse." }, { status: 400 });
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
    return NextResponse.json({ error: neighborError.message }, { status: 500 });
  }

  const neighbor = neighborRows?.[0];

  if (!neighbor) {
    return NextResponse.json({ ok: true, moved: false });
  }

  const currentOrder = current.sort_order;
  const neighborOrder = neighbor.sort_order;

  const { error: updateCurrentError } = await supabaseAdmin
    .from("product_media")
    .update({ sort_order: neighborOrder })
    .eq("id", current.id);

  if (updateCurrentError) {
    return NextResponse.json({ error: updateCurrentError.message }, { status: 500 });
  }

  const { error: updateNeighborError } = await supabaseAdmin
    .from("product_media")
    .update({ sort_order: currentOrder })
    .eq("id", neighbor.id);

  if (updateNeighborError) {
    return NextResponse.json({ error: updateNeighborError.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, moved: true });
}