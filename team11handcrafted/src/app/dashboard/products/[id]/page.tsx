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
      <div className="product-card-detail">
        {/* Left Side - Image */}
        <div className="product-image">
          <Image
            src={product.image_url ?? '/images/products/default-product.png'}
            alt={product.name ?? 'Product'}
            width={400}
            height={300}
          />
        </div>

        {/* Right Side - Details */}
        <div className="product-info">
          <h1 className="product-name">{product.name}</h1>

          {product.description && (
            <p className="product-description">
              <strong>Description:</strong> {product.description}
            </p>
          )}

          {product.price != null && (
            <p className="product-price">
              <strong>Price:</strong> ${Number(product.price).toFixed(2)}
            </p>
          )}

          {product.rating != null && (
            <p className="product-rating">
              <strong>Rating:</strong> ⭐ {product.rating}
            </p>
          )}

          <button className="buy-now-btn">Buy Now</button>
        </div>
      </div>
    </main>
  );
}
