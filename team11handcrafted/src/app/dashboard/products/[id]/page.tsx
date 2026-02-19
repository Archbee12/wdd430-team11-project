import { getProductById } from '@/app/lib/actions';
import { getCurrentUser } from '@/app/lib/session';
import { inter } from '@/app/ui/fonts';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import AddToCartButton from '@/app/ui/cart/cart-button';
import ReviewSection from '@/app/ui/reviews/review-section';
import Link from 'next/dist/client/link';

type Props = { params: Promise<{ id: string }> };

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);
  const user = await getCurrentUser();

  if (!product) return notFound();

  return (
    <main className={`${inter.className} product-detail-page`}>
      <section className="hero-detail">
        {/* Image */}

        <div className="hero-title">
          <h1 className="hero-name">{product.name}</h1>
        </div>
        <div className="hero-image">
          <Image
            src={product.image_url ?? "/images/products/default-product.png"}
            alt={product.name ?? "Product"}
            width={500}
            height={500}
            className="image-rounded"
          />
        </div>

        {/* Info */}
        <div className="hero-info">
          {product.artisan_name && (
            <p className="hero-artisan">
              <strong>Artisan:</strong> {product.artisan_name}
            </p>
          )}

          {product.description && (
            <p className="hero-description"><strong>Description</strong>: {product.description} </p>
          )}

          {product.price != null && (
            <p className="hero-price"><strong>Price:</strong> ${Number(product.price).toFixed(2)}</p>
          )}

          {product.rating != null && (
            <p className="hero-rating">⭐ {product.rating}</p>
          )}

          <AddToCartButton
            id={product.id}
            name={product.name}
            price={product.price}
            image_url={product.image_url}
          />

          <Link href={`/dashboard/products/${id}#reviews`} className="review-btn">
          ★ Reviews
          </Link>

        </div>
      </section>

      {/* Reviews Section */}
      <ReviewSection
        productId={product.id}
        currentUserId={user?.id}
        userRole={user?.role}
      />
    </main>
  );
}

