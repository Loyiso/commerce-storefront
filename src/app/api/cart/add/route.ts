import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);

  if (!body?.userId || !body?.productId) {
    return NextResponse.json(
      { message: "userId and productId are required" },
      { status: 400 }
    );
  }

  const payload = {
    userId: Number(body.userId),
    date: new Date().toISOString(),
    products: [
      {
        productId: Number(body.productId),
        quantity: Number(body.quantity ?? 1),
      },
    ],
  };

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/carts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    return NextResponse.json(
      { message: text || `Failed to add to cart (${res.status})` },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data, { status: 201 });
}
