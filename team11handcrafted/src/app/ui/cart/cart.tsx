"use client";

import { useState } from "react";
import Image from "next/image";
import { getCart, clearCart, saveCart } from "@/app/lib/cart";
import type { CartItem } from "@/app/lib/cart";

export default function Cart() {
  const [cart, setCart] = useState<CartItem[]>(() => getCart());
  const [purchased, setPurchased] = useState(false);

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const vat = subtotal * 0.07;
  const total = subtotal + vat;

  function updateQuantity(id: string, amount: number) {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    );

    setCart(updated);
    saveCart(updated);
  }

  function handleRemove(id: string) {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    saveCart(updated);
  }

  function handlePurchase() {
    clearCart();
    setCart([]);
    setPurchased(true);
  }

  if (purchased) {
    return (
      <div className="p-10 text-center">
        <h1 className="text-3xl font-bold text-green-600">
          Purchase Successful 🎉
        </h1>
        <p className="mt-4 text-gray-600">
          Thank you for your order!
        </p>
      </div>
    );
  }

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="cart-page">
      <div className="cart-container">

        {/* Products */}
        <div className="cart-products">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">

              <div className="cart-item-left">
                <Image
                  src={item.image_url}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="cart-image"
                />

                <div className="cart-details">
                  <h2 className="cart-title">{item.name}</h2>
                  <p className="cart-price">
                    ${Number(item.price).toFixed(2)}
                  </p>

                  <div className="quantity-controls">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="qty-btn"
                    >
                      −
                    </button>

                    <span className="qty-number">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="qty-btn"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="cart-item-right">
                <p className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="remove-btn"
                >
                  Remove
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <h2 className="summary-title">Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>VAT (7%)</span>
            <span>${vat.toFixed(2)}</span>
          </div>

          <hr className="summary-divider" />

          <div className="summary-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <button
            onClick={handlePurchase}
            className="checkout-btn"
          >
            Checkout
          </button>
        </div>

      </div>
    </div>
  );
}
