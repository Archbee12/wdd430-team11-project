// ui/dashboard/product-card.tsx

type ProductCardProps = {
  imageSrc: string;
  title: string;
  subtitle?: string;
  amount?: number;
};

export function ProductCard({ imageSrc, title, subtitle, amount }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-card__image">
        <img src={imageSrc} alt={title} />
      </div>

      <div className="product-card__content">
        <h3>{title}</h3>
        {subtitle && <p className="subtitle">{subtitle}</p>}
        {amount !== undefined && <p className="amount">${amount}</p>}
      </div>
    </div>
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
          imageSrc={p.image_url}
          title={p.name}
          subtitle={p.description}
          amount={p.price}
        />
      ))}
    </div>
  );
}
