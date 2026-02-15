"use client";

import { useEffect, useState } from "react";
import { getCart, clearCart } from "@/app/lib/cart";

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>(() => getCart());
  const [purchased, setPurchased] = useState(false);

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  function handlePurchase() {
    clearCart();
    setCart([]);
    setPurchased(true);
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {purchased && (
        <p className="text-green-600 font-semibold mb-4">
          Purchase successful! 🎉
        </p>
      )}

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} className="mb-4 border-b pb-2">
              <p>{item.name}</p>
              <p>
                ${item.price} × {item.quantity}
              </p>
            </div>
          ))}

          <h3 className="mt-4 font-bold">
            Total: ${total.toFixed(2)}
          </h3>

          <button
            onClick={handlePurchase}
            className="buy-now-btn mt-4"
          >
            Purchase
          </button>
        </>
      )}
    </div>
  );
}
