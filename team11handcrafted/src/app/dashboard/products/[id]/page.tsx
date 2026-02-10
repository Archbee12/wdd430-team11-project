import { inter } from '@/app/ui/fonts';

export default async function ProductDetails() {
  return (
    <>
      <div className={`${inter.className} p-4 dashboard-header`}>
        <h1 className="text-2xl font-bold mb-4">Product Details</h1>
      </div>
    </>
  );
}