"use client";

import ProductForm from "@/app/ui/products/product-form";
import { inter } from "@/app/ui/fonts";

export default function CreateProductPage() {
  // TODO: Replace with actual logged-in artisan ID
  const artisanId = "artisan-123";

  return (
    <main className={`${inter.className} p-4`}>
      <h1 className="text-2xl font-bold mb-6">Create a New Product</h1>
      <ProductForm artisanId={artisanId} />
    </main>
  );
}
