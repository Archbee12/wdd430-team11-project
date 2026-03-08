import { getArtisanById, getProductsByArtisanId, normalizeProducts } from "@/app/lib/actions";
import { getCurrentUser } from "@/app/lib/session";
import { inter } from "@/app/ui/fonts";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import ProductCardWrapper from '@/app/ui/products/product-cards';

type Props = { params: Promise<{ id: string }> };

export default async function ArtisanDetailPage({ params }: Props) {
  const { id } = await params;
  const artisan = await getArtisanById(id);

  if (!artisan) return notFound();

  const user = await getCurrentUser();

  // Fetch and normalize 2 products by this artisan
  const productsRaw = await getProductsByArtisanId(artisan.id);
  const products = await normalizeProducts(productsRaw).then((p) => p.slice(0, 2));

  return (
    <main className={`${inter.className} artisan-detail-page`}>

      {/* Artisan Info */}
      <section className="artisan-layout">
        <div className="artisan-image-col">
          <Image
            src={artisan.image_url ?? "/images/artisans/default-artisan.png"}
            alt={artisan.name ?? "Artisan"}
            width={400}
            height={400}
            className="artisan-image"
          />
        </div>

        <div className="artisan-info-col">
          <h1 className="artisan-name">{artisan.name}</h1>
          {artisan.bio && <p className="artisan-bio">{artisan.bio}</p>}
          {artisan.location && (
            <p className="artisan-location"><strong>Location:</strong> {artisan.location}</p>
          )}

          {/* Show edit button only if current user is the artisan */}
          {user?.role === "artisan" && user.id === artisan.id && (
            <div className="artisan-buttons">
              <Link href={`/dashboard/artisans/${id}/edit`} className="edit-profile-btn">
                Edit Profile
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Products by this artisan */}
      {products.length > 0 && (
        <section className="more-products">
          <h2 className="more-products-title">Products by {artisan.name}</h2>
          <ProductCardWrapper products={products} />
        </section>
      )}
    </main>
  );
}