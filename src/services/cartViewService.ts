import type { Product } from "@/types/product";
import { getProductById } from "@/services/productService";
 
export async function getCartProducts(productIds: number[]): Promise<Product[]> {
  const uniqueIds = Array.from(new Set(productIds));
  const products = await Promise.all(uniqueIds.map((id) => getProductById(id)));
  return products;
}
