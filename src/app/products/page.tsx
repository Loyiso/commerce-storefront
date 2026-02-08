import Link from "next/link";
import { getProducts } from "@/services/productService";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-2xl font-semibold  text-gray-900">Products</h1>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col border bg-white"
          > 
            <div className="flex h-64 items-center justify-center p-6">
              <img
                src={product.image}
                alt={product.title}
                className="h-full object-contain"
              />
            </div>
 
            <div className="flex flex-col gap-2 px-4 pb-4">
              <h2 className="text-sm font-medium text-blue-600 hover:underline">
                <Link href={`/products/${product.id}`} className="text-sm font-medium text-blue-600 hover:underline">
                  {product.title}
                </Link>
              </h2>

              <div className="text-sm">
                <span className="font-semibold text-gray-900">
                  ${product.price.toFixed(2)}
                </span>
              </div>

              <Link href={`/products/${product.id}`} 
                className="mt-3 bg-blue-500 py-2 text-sm font-medium text-white hover:bg-blue-600 justify-center flex items-center rounded">
                  ADD TO CART
                </Link> 
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
