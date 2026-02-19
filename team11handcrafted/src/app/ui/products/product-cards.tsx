import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from '@/app/ui/cart/cart-button';

type ProductCardProps = {
  id: string;
  imageSrc: string;
  title: string;
  // subtitle: string;
  amount: number;
};

export function ProductCard({ id, imageSrc, title, amount }: ProductCardProps) {
  return (
    <div className="product-card cursor-pointer hover:shadow-lg transition">
      <Link href={`/dashboard/products/${id}`}>
        <div className="product-card__image">
          <Image src={imageSrc} alt={title} width={300} height={200} />
        </div>
        <div className="product-card__content">
          <h3>{title}</h3>
          {/* <p className="subtitle">{subtitle}</p> */}
          <p className="amount">${amount.toFixed(2)}</p>

        </div>
      </Link>
      <div className="product-card__actions">
        <AddToCartButton
          id={id}
          name={title}
          price={amount}
          image_url={imageSrc}
        />
        
      </div>
    </div>
  );
}

// ---------------- Wrapper ----------------

type ProductCardWrapperProps = {
  products: {
    id: string;
    name: string;
    // description: string;
    price: number;
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
          // subtitle={p.description}
          amount={p.price}
        />
      ))}
    </div>
  );
}
