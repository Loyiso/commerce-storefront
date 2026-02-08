"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { CartItem } from "@/types/cart";

type CartContextValue = {
  items: CartItem[];
  count: number;
  addItem: (productId: number, quantity?: number) => void;
  setQuantity: (productId: number, quantity: number) => void;
  removeItem: (productId: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "cart_items_v1";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        setItems(JSON.parse(raw));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const count = useMemo(
    () => items.reduce((sum, x) => sum + (x.quantity ?? 0), 0),
    [items]
  );

  function addItem(productId: number, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((x) => x.productId === productId);
      if (!existing) return [...prev, { productId, quantity }];
      return prev.map((x) =>
        x.productId === productId ? { ...x, quantity: x.quantity + quantity } : x
      );
    });
  }

  function setQuantity(productId: number, quantity: number) {
    const q = Math.max(1, Math.floor(quantity || 1));
    setItems((prev) =>
      prev.map((x) => (x.productId === productId ? { ...x, quantity: q } : x))
    );
  }

  function removeItem(productId: number) {
    setItems((prev) => prev.filter((x) => x.productId !== productId));
  }

  function clear() {
    setItems([]);
  }

  const value: CartContextValue = { items, count, addItem, setQuantity, removeItem, clear };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
