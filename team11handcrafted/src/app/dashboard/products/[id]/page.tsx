import { getProductById, getProductsByArtisanId } from '@/app/lib/actions';
import { getCurrentUser } from '@/app/lib/session';
import { inter } from '@/app/ui/fonts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import AddToCartButton from '@/app/ui/cart/cart-button';
import ReviewSection from '@/app/ui/reviews/review-section';
import Link from 'next/dist/client/link';
import ProductCardWrapper from '@/app/ui/products/product-cards';

type Props = { params: Promise<{ id: string }> };

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);
  const user = await getCurrentUser();

  if (!product) return notFound();

  // Get more products by artisan
  let moreProducts: typeof product[] = [];
  if (product.artisan_id) {
    const artisanProducts = await getProductsByArtisanId(product.artisan_id);
    moreProducts = artisanProducts
      .filter((p) => p.id !== product.id)
      .slice(0, 2);
  }

  return (
    <main className={`${inter.className} product-detail-page`}>
      <section className="product-layout">
        {/* IMAGE COLUMN */}
        <div className="product-image-col">
          <Image
            src={product.image_url ?? "/images/products/default-product.png"}
            alt={product.name ?? "Product"}
            width={800}
            height={800}
            className="product-image"
          />
        </div>

        {/* INFO COLUMN */}
        <div className="product-info-col">
          <h1 className="product-name">{product.name}</h1>

          {product.price != null && (
            <p className="product-price">
              ${Number(product.price).toFixed(2)}
            </p>
          )}

          {product.artisan_name && (
            <p className="product-artisan">
              <strong>Artisan:</strong> {product.artisan_name}
            </p>
          )}

          {product.description && (
            <p className="product-description"> <strong>Description:</strong> {product.description}
            </p>
          )}

          {product.rating != null && (
            <p className="product-rating">
              ⭐ {product.rating}
            </p>
          )}

          <div className="product-buttons">
            <AddToCartButton
              id={product.id}
              name={product.name}
              price={product.price}
              image_url={product.image_url}
            />

            <Link
              href={`/dashboard/products/${id}#reviews`}
              className="review-btn"
            >
              ★ Reviews
            </Link>
          </div>
        </div>
      </section>

      {/* More Products By Artisan */}
      {moreProducts.length > 0 && (
        <section className="more-products">
          <h2 className="more-products-title">More Products from {product.artisan_name}   </h2>
          <ProductCardWrapper products={moreProducts} />
        </section>
      )}

      <ReviewSection
        productId={product.id}
        currentUserId={user?.id}
        userRole={user?.role}
      />
    </main>
  );
}

