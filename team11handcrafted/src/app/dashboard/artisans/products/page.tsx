import { inter } from "@/app/ui/fonts";
import { getCurrentUser } from "@/app/lib/session";
import { getProductsByArtisanId, normalizeProducts } from "@/app/lib/actions";
import ProductCardWrapper from "@/app/ui/products/product-cards";
import Link from "next/dist/client/link";

export default async function ArtisanProductsPage() {
  const user = await getCurrentUser();

  if (!user) return <p>Please log in</p>;
  if (user.role !== "artisan") return <p>Unauthorized</p>;

  const products = await normalizeProducts(await getProductsByArtisanId(user.id));

  return (
    <div className={`${inter.className} p-6`}>
      <h1 className="text-2xl font-bold mb-6">My Products</h1>

      <Link href="/dashboard/products/create" className="create-product">
         + Create Product
      </Link>

      {products.length > 0 ? (
        <ProductCardWrapper products={products} />
      ) : (
        <p>You haven&apos;t created any products yet.</p>
      )}
    </div>
  );
}
