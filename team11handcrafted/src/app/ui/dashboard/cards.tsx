import {
  UserGroupIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  BanknotesIcon,
} from '@heroicons/react/24/outline';
// import { ProductCard } from '@/app/ui/dashboard/product-cards';

const iconMap = {
  artisans: UserGroupIcon,
  revenue: BanknotesIcon,
  products: ShoppingBagIcon,
  orders: ClipboardDocumentListIcon,
};

export default function CardWrapper() {
  return (
    <div className="card-wrapper">
      <Card title="Artisans" value={12} type="artisans" />
      <Card title="Products" value={48} type="products" />
      <Card title="Orders" value={7} type="orders" />
      <Card title="Revenue" value="$1,200" type="revenue" />
    </div>
  );
}

export function Card({
  title,
  value,
  type,
}: {
  title: string;
  value: number | string;
  type: 'artisans' | 'products' | 'orders' | 'revenue';
}) {
  const Icon = iconMap[type]; 
  return (
    <div className="card">
      <div className="card__icon">
        <Icon className="h-8 w-8 text-gray-500" />
      </div>
      <div className="card__content">
        <p className='title'>{title}</p>
        <p className="value">{value}</p>
      </div>
    </div>
  );
}