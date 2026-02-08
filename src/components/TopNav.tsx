"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";

export default function TopNav() {
  const { count } = useCart();

  return (
    <div className="border-b text-gray-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold">
          Loyiso Online Store
        </Link>

        <div className="flex items-center gap-6 text-sm">
          <Link href="/login">Login</Link>
          <Link href="/register">Register</Link>

          <Link href="/cart" className="relative">
            Cart
            <span className="absolute -right-3 -top-3 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-xs text-white">
              {count}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
