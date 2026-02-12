import ProductForm from "@/app/ui/products/product-form";
import { inter } from "@/app/ui/fonts";
import { getCurrentUser } from "@/app/lib/session";
import { redirect } from "next/navigation";

export default async function CreateProductPage() {
  const user = await getCurrentUser();

  // 🚨 Not logged in
  if (!user) {
    redirect("/auth/login");
  }

  // 🚨 Logged in but NOT artisan or seller
  if (user.role !== "artisan" && user.role !== "seller") {
    // throw new Error("Unauthorized"); 
    redirect("/dashboard");
  }

  return (
    <main className={`${inter.className} p-4`}>
      <h1 className="text-2xl font-bold mb-6">Create a New Product</h1>
      <ProductForm artisan_id={user.id} />
    </main>
  );
}


