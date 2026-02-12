import { getProductById } from '@/app/lib/actions';
import { inter } from '@/app/ui/fonts';
import { notFound } from 'next/navigation';
import Image from 'next/image';

type Props = { params: Promise<{ id: string }> };

export default async function ProductDetailsPage({ params }: Props) {
  const { id } = await params;
  const product = await getProductById(id);

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

          <button className="buy-now-btn">Add To Cart</button>
        </div>
      </section>
    </main>
  );
}
