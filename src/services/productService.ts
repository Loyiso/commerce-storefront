import { Product } from "@/types/product";
import { safeJson } from "@/utils/safeJson";

const BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`;

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(BASE_URL, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(`Failed to fetch products (${res.status})`);
  }

  return safeJson<Product[]>(res);
}

export async function getProductById(id: number): Promise<Product> {
  console.log("Fetching product with ID:", id);

  const res = await fetch(`${BASE_URL}/${id}`, { cache: "no-store" });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(
      `Failed to fetch product ${id} (${res.status}). Body: ${body.slice(0, 120)}`
    );
  }

  return safeJson<Product>(res);
}
