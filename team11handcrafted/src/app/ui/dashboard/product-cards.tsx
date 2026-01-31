type ImageCardProps = {
  imageSrc: string;
  title: string;
  subtitle?: string;
  amount?: number;
};

export function ProductCard({
  imageSrc,
  title,
  subtitle,
  amount,
}: ImageCardProps) {
  return (
    <div className="product-card">
      <div className={`product-card__image ${imageSrc}`}>
        <img src={imageSrc} alt={title} />
      </div>

      <div className="product-card__content">
        <h3>{title}</h3>
        {subtitle && <p className="subtitle">{subtitle}</p>}
        {amount && <p className="amount">${amount}</p>}
      </div>
    </div>
  );
}

export default function ProductCardWrapper() {
  return (
    <div className="products">
      <ProductCard imageSrc="/images/harvest-chest.png" title="Harvest Chest Handcrafted Wooden Storage Box" subtitle="Handcrafted with care" amount={12}/>
      <ProductCard imageSrc="/images/shopping.png" title="Handcrafted Italian Full Grain Leather Woven Handbag" subtitle="Premium quality" amount={15.99}/>
      {/* <ProductCard title="Products" subtitle={48} />
      <ProductCard title="Orders" subtitle={7} />
      <ProductCard title="Revenue" subtitle="$1,200" /> */}
    </div>
  );
}
// export function Card({
//   title,
//   subtitle, 
// }: {
//   title: string;
//   subtitle: number | string;  
// }) {
//   return (
//     <div className="card">
//       <div className="card__icon">
//         <img src="/images/harvest-chest.webp" alt={title} />
//       </div>  
//       <div className="card__content">
//         <h3>{title}</h3>
//         <p className="subtitle">{subtitle}</p>
//       </div>
//     </div>
//   );
// }
