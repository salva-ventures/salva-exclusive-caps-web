import { NextResponse } from "next/server";
import { requireAdminUser } from "@/lib/admin/auth";
import { listAdminProducts } from "@/lib/admin/products";

export async function GET() {
  await requireAdminUser();

  try {
    const products = await listAdminProducts();
    return NextResponse.json({ products });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Error listando productos.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
