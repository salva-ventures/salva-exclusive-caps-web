import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { listAdminFeaturedProducts } from "@/lib/catalog/featured";

export async function GET(request: Request) {
  await requireAdminUser();

  const { searchParams } = new URL(request.url);
  const placement = searchParams.get("placement") === "home" ? "home" : "home";

  const items = await listAdminFeaturedProducts(placement);

  return NextResponse.json({
    placement,
    items,
  });
}