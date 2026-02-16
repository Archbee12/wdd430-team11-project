"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { getCart } from "@/app/lib/cart";

export default function CartIcon() {
  const [uniqueCount, setUniqueCount] = useState(0);

  useEffect(() => {
    function updateCartCount() {
      const cart = getCart();
      const uniqueProducts = new Set(cart.map(item => item.id)); // count only unique IDs
      setUniqueCount(uniqueProducts.size);
    }

    updateCartCount();
    window.addEventListener("storage", updateCartCount); // update if localStorage changes

    return () => window.removeEventListener("storage", updateCartCount);
  }, []);

  return (
    <Link href="/dashboard/cart" className="cart-link">
      <ShoppingCartIcon className="cart-icon" />
      {uniqueCount > 0 && (
        <span className="cart-badge">{uniqueCount}</span>
      )}
    </Link>
  );
}
