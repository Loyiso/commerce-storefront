"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { getCartProducts } from "@/services/cartViewService";
import type { Product } from "@/types/product";

type CartRow = {
  productId: number;
  quantity: number;
  product?: Product;
};

function money(value: number) {
  return `$${value.toFixed(2)}`;
}

export default function CartPage() {
  const { items, setQuantity, removeItem, clear } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const productIds = useMemo(() => items.map((x) => x.productId), [items]);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setIsLoading(true);
      try {
        if (productIds.length === 0) {
          setProducts([]);
          return;
        }
        const data = await getCartProducts(productIds);
        if (!cancelled) setProducts(data);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [productIds.join(",")]);  

  const rows: CartRow[] = useMemo(() => {
    return items.map((it) => ({
      productId: it.productId,
      quantity: it.quantity,
      product: products.find((p) => p.id === it.productId),
    }));
  }, [items, products]);

  const subTotal = useMemo(() => {
    return rows.reduce((sum, r) => {
      const price = r.product?.price ?? 0;
      return sum + price * r.quantity;
    }, 0);
  }, [rows]);

  const shipping = 0;
  const tax = 0;
  const total = subTotal + shipping + tax;

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-semibold text-gray-900">Shopping cart</h1>
        <p className="mt-6 text-sm text-gray-600">Loading cart…</p>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-12">
        <h1 className="text-3xl font-semibold text-gray-900">Shopping cart</h1>
        <p className="mt-6 text-sm text-gray-600">Your cart is empty.</p>
        <Link
          href="/products"
          className="mt-6 inline-block rounded bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="text-center text-3xl font-semibold text-gray-900">Shopping cart</h1>
 
      <div className="mt-10 overflow-x-auto border bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-4 py-3 text-left font-medium">SKU</th>
              <th className="px-4 py-3 text-left font-medium">Image</th>
              <th className="px-4 py-3 text-left font-medium">Product(s)</th>
              <th className="px-4 py-3 text-left font-medium">Price</th>
              <th className="px-4 py-3 text-left font-medium">Qty.</th>
              <th className="px-4 py-3 text-left font-medium">Total</th>
              <th className="px-4 py-3 text-left font-medium">Remove</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {rows.map((row) => {
              const p = row.product;
              const price = p?.price ?? 0;
              const lineTotal = price * row.quantity;

              return (
                <tr key={row.productId} className="text-gray-800">
                  <td className="px-4 py-4 align-top text-gray-500">
                    {p ? `FS_${p.id}` : `FS_${row.productId}`}
                  </td>

                  <td className="px-4 py-4">
                    <div className="relative h-20 w-20 overflow-hidden border bg-white">
                      {p?.image ? (
                        <Image
                          src={p.image}
                          alt={p.title}
                          fill
                          className="object-contain p-2"
                          sizes="80px"
                        />
                      ) : null}
                    </div>
                  </td>

                  <td className="px-4 py-4 align-top">
                    <div className="font-medium text-gray-900">
                      {p ? (
                        <Link href={`/products/${p.id}`} className="hover:underline">
                          {p.title}
                        </Link>
                      ) : (
                        "Loading product…"
                      )}
                    </div>
                    {p?.category ? (
                      <div className="mt-2 text-xs text-gray-500">
                        Category: {p.category}
                      </div>
                    ) : null}
                    <div className="mt-3">
                      {p ? (
                        <Link
                          href={`/products/${p.id}`}
                          className="text-sm text-blue-600 hover:underline"
                        >
                          Edit
                        </Link>
                      ) : null}
                    </div>
                  </td>

                  <td className="px-4 py-4 align-top">{money(price)}</td>
 
                  <td className="px-4 py-4 align-top">
                    <div className="inline-flex items-center border">
                      <button
                        className="px-3 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setQuantity(row.productId, row.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        ▲
                      </button>

                      <input
                        className="w-14 border-x px-2 py-2 text-center outline-none"
                        value={row.quantity}
                        onChange={(e) =>
                          setQuantity(row.productId, Number(e.target.value))
                        }
                      />

                      <button
                        className="px-3 py-2 text-gray-700 hover:bg-gray-50"
                        onClick={() => setQuantity(row.productId, row.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        ▼
                      </button>
                    </div>
                  </td>

                  <td className="px-4 py-4 align-top">{money(lineTotal)}</td>

                  <td className="px-4 py-4 align-top">
                    <button
                      onClick={() => removeItem(row.productId)}
                      className="text-red-600 hover:text-red-700"
                      aria-label="Remove"
                      title="Remove"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
 
        <div className="flex items-center justify-end gap-4 bg-gray-50 px-6 py-6">
          <Link
            href="/products"
            className="rounded bg-blue-500 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-600"
          >
            Continue shopping
          </Link> 
        </div>
      </div>
 
      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3"> 
        <div className="md:col-span-2 space-y-8"> 
 
          <button
            className="text-sm text-gray-500 hover:underline"
            onClick={clear}
            type="button"
          >
            Clear cart
          </button>
        </div>
 
        <div className="rounded border bg-gray-50 p-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-700">Sub-Total:</span>
              <span className="text-gray-900">{money(subTotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Shipping:</span>
              <span className="text-gray-900">{money(shipping)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-700">Tax:</span>
              <span className="text-gray-900">{money(tax)}</span>
            </div>

            <div className="mt-4 flex justify-between border-t pt-4">
              <span className="text-lg font-semibold text-blue-600">Total:</span>
              <span className="text-lg font-semibold text-blue-600">{money(total)}</span>
            </div>

            <label className="mt-4 flex items-start gap-2 text-xs text-gray-700">
              <input type="checkbox" className="mt-1" />
              <span>
                I agree with the terms of service and I adhere to them unconditionally{" "}
                <span className="text-blue-600">(read)</span>
              </span>
            </label>

            <button
              className="mt-5 w-full rounded bg-blue-500 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-600"
              onClick={() => {}}
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
