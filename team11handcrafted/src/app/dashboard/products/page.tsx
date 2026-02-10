import { getAllProducts } from '@/app/lib/actions';
import ProductCardWrapper from '@/app/ui/dashboard/product-cards';
import { inter } from '@/app/ui/fonts';

export default async function ProductsPage() {
  // Fetch products data first
  const products = await getAllProducts();

  return (
    <main>
      <div className={`${inter.className} p-4 dashboard-header`}>
        <h1 className="text-2xl font-bold mb-4">Products</h1>
      </div>

      {/* Products Grid */}
      <div className="products">
        {products.map((p) => (
          <ProductCardWrapper
            key={p.id}
            imageSrc={p.image_url}
            title={p.name}
            subtitle={p.description}
            amount={p.price}
          />
        ))}
      </div>
    </main>
  );
}
