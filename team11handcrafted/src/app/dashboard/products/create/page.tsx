// src/app/dashboard/products/create/page.tsx

import ProductForm from "@/app/ui/products/product-form";
import { inter } from "@/app/ui/fonts";
import { getCurrentUser } from "@/app/lib/session";

export default async function CreateProductPage() {
  const user = await getCurrentUser();  // ✅ server-side
  const artisanId = user?.id || "";

  return (
    <main className={`${inter.className} p-4`}>
      <h1 className="text-2xl font-bold mb-6">Create a New Product</h1>
      <ProductForm artisanId={artisanId} /> {/* client-side form */}
    </main>
  );
}
