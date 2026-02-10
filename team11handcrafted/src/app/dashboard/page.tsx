import { inter } from '@/app/ui/fonts';
import '@/app/globals.css';
import CardWrapper from '@/app/ui/dashboard/cards';
import ProductCardWrapper from '@/app/ui/dashboard/product-cards';
import ArtisanCardWrapper from '@/app/ui/dashboard/artisan-cards';
import { getAllProducts, getAllArtisans } from '@/app/lib/actions';


export default async function Page() {
  // Fetch data from DB
  const products = await getAllProducts();
  const artisans = await getAllArtisans();

  return (
    <main>
      <div className={`${inter.className} p-4 dashboard-header`}>
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

        <CardWrapper />

        <div className="product-dashboard">
          <h2 className="text-xl font-semibold mb-4 mt-8">Handcrafted Products</h2>
          {/* Pass products as prop */}
          <ProductCardWrapper products={products} />
        </div>

        <div className="artisan-dashboard">
          <h2 className="text-xl font-semibold mb-4 mt-8">Artisans</h2>
          {/* Pass artisans as prop */}
          <ArtisanCardWrapper artisans={artisans} />
        </div>
      </div>
    </main>
  );
}
