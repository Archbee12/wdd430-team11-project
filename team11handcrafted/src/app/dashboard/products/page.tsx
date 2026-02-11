import { getAllProducts, normalizeProducts } from "@/app/lib/actions";
import ProductCardWrapper from "@/app/ui/products/product-cards";
import { inter } from "@/app/ui/fonts";

export default async function ProductsPage() {
  const products = await normalizeProducts(await getAllProducts());

  return (
    <main>
      <div className={`${inter.className} p-4 dashboard-header`}>
        <h1 className="text-2xl font-bold mb-4">Products</h1>
      </div>

      <ProductCardWrapper products={products} />
    </main>
  );
}
