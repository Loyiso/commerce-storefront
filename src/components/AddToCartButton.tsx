"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";

export default function AddToCartButton({
  productId,
  userId = 1,  
}: {
  productId: number;
  userId?: number;
}) {
  const { addItem } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  async function onAdd() { 
    addItem(productId, 1);

    setIsLoading(true);
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, quantity: 1 }),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => null);
        throw new Error(json?.message ?? `Add to cart failed (${res.status})`);
      }
    } catch (e) {
      console.error(e); 
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={onAdd}
      disabled={isLoading}
      className="rounded bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
    >
      {isLoading ? "ADDING..." : "ADD TO CART"}
    </button>
  );
}
