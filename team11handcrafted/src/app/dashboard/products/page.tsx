import { getAllProducts, normalizeProducts } from '@/app/lib/actions';
import ProductCardWrapper from '@/app/ui/dashboard/product-cards';
import { inter } from '@/app/ui/fonts';

export default async function ProductsPage() {
  const products = await getAllProducts();
  const normalizedProducts = normalizeProducts(products);

  return (
    <main>
      <div className={`${inter.className} p-4 dashboard-header`}>
        <h1 className="text-2xl font-bold mb-4">Products</h1>
      </div>

      <ProductCardWrapper products={normalizedProducts} />
    </main>
  );
}
