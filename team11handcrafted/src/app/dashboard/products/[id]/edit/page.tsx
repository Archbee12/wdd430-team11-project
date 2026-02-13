import ProductForm from "@/app/ui/products/product-form";
import { getProductById } from "@/app/lib/actions";
import { getCurrentUser } from "@/app/lib/session";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: Props) {
  const { id } = await params;

  const user = await getCurrentUser();

  if (!user) {
    return <p>You must be logged in to edit products.</p>;
  }

  const product = await getProductById(id);

  if (!product) return <p>Product not found</p>;

  const isOwner = product.artisan_id === user.id;
  const isAdmin = user.role === "admin";

  if (!isOwner && !isAdmin) {
    return <p>You do not have permission to edit this product.</p>;
  }

  return <ProductForm artisan_id={product.artisan_id} product={product} />;
}
