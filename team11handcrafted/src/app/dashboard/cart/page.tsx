import Cart from "@/app/ui/cart/cart";

export default function CartPage() {
  return (
    <div className="p-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        Shopping Cart
      </h1>

      <Cart />
    </div>
  );
}
