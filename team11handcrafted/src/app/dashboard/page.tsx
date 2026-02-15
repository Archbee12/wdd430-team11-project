import { inter } from "@/app/ui/fonts";
import "@/app/globals.css";
import CardWrapper from "@/app/ui/dashboard/cards";
import ProductCardWrapper from "@/app/ui/products/product-cards";
import ArtisanCardWrapper from "@/app/ui/artisans/artisan-cards";

import {
  getAllProducts,
  getAllArtisans,
  normalizeProducts,
  normalizeArtisans,
} from "@/app/lib/actions";

export default async function Page() {
  const [products, artisans] = await Promise.all([
    normalizeProducts(await getAllProducts()),
    normalizeArtisans(await getAllArtisans()),
  ]);

  const artisanCount = artisans.length;
  const productCount = products.length;

  // 👇 LIMIT TO 2 ONLY FOR DASHBOARD
  const dashboardProducts = products.slice(0, 2);
  const dashboardArtisans = artisans.slice(0, 2);

  return (
    <div className={`${inter.className} dashboard-page p-6`}>
      {/* Dashboard Title */}
      <h1 className="dashboard-title">Dashboard</h1>

      {/* Cards */}
      <CardWrapper artisanCount={artisanCount} productCount={productCount} />

      {/* Products Section */}
      <section className="dashboard-section mt-10">
        <h2 className="section-title">Handcrafted Products</h2>
        <ProductCardWrapper products={dashboardProducts} />
      </section>

      {/* Artisans Section */}
      <section className="dashboard-section mt-10">
        <h2 className="section-title">Artisans</h2>
        <ArtisanCardWrapper artisans={dashboardArtisans} />
      </section>
    </div>
  );
}
