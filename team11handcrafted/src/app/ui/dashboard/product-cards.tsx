import Image from 'next/image';
import Link from 'next/link';

type ProductCardProps = {
  id: string;
  imageSrc: string | null;
  title: string;
  subtitle?: string;
  amount?: number;
};

export function ProductCard({ id, imageSrc, title, subtitle, amount }: ProductCardProps) {
  return (
    <Link href={`/dashboard/products/${id}`}>
      <div className="product-card cursor-pointer hover:shadow-lg transition">
        <div className="product-card__image">
          <Image src={imageSrc || '/placeholder.jpg'} 
            alt={title} 
            width={300} 
            height={200} 
          />
        </div>

        <div className="product-card__content">
          <h3>{title}</h3>
          {subtitle && <p className="subtitle">{subtitle}</p>}
          {amount !== undefined && <p className="amount">${amount?.toFixed(2)}</p>}
        </div>
      </div>
    </Link>
  );
}

// ---------------- Wrapper ----------------

type ProductCardWrapperProps = {
  products: {
    id: string;
    name: string;
    description?: string;
    price?: number;
    image_url: string;
  }[];
};

export default function ProductCardWrapper({ products }: ProductCardWrapperProps) {
  return (
    <div className="products">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          id={p.id}
          imageSrc={p.image_url}
          title={p.name}
          subtitle={p.description}
          amount={p.price}
        />
      ))}
    </div>
  );
}
