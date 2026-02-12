import ProductForm from "@/app/ui/products/product-form";
import { getProductById } from "@/app/lib/actions";

type Props = {
  params: Promise<{ id: string }>; // <- notice the Promise
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params; // unwrap the promise
  const product = await getProductById(id);

  if (!product) return <p>Product not found</p>;

  return <ProductForm artisan_id={product.artisan_id} product={product} />;
}
