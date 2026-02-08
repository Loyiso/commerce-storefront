import { notFound } from "next/navigation";
import { getProductById } from "@/services/productService";
import StarRating from "@/components/StarRating";
import AddToCartButton from "@/components/AddToCartButton";

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;  
  const productId = Number(id);

  if (Number.isNaN(productId)) {
    notFound();
  }

  let product;
  try {
    product = await getProductById(productId);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        <div className="flex items-center justify-center border bg-white p-8">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-[520px] w-full object-contain"
          />
        </div>

        <div>
          <h1 className="text-3xl font-semibold text-gray-900">{product.title}</h1>
          <div className="mt-3 h-px w-full bg-gray-200" />

          <p className="mt-4 text-sm leading-6 text-gray-600">
            {product.description}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <StarRating value={product.rating?.rate ?? 0} />
            <span className="text-sm text-gray-600">
              {product.rating?.count ? `${product.rating.count} review(s)` : "No reviews yet"}
            </span>
          </div>

          <div className="mt-6 space-y-3 text-sm text-gray-700">
            <div>
              <span className="font-medium">SKU:</span>{" "}
              <span className="text-gray-600">FS_{product.id}</span>
            </div>
            <div className="flex items-center gap-2"> 
              <span className="text-gray-500" > Category: {product.category}</span>
            </div>
          </div>

          <div className="mt-6 text-2xl font-semibold text-gray-900">
            Price: ${product.price.toFixed(2)}
          </div>

          <div className="mt-6 flex items-center gap-3">
            <input
              type="number"
              min={1}
              defaultValue={1}
              className="w-20 border px-3 py-2 text-sm outline-none focus:border-gray-400"
              aria-label="Quantity"
            />
            <AddToCartButton productId={product.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
