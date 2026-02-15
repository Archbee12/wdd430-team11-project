"use client";

import { addToCart } from "@/app/lib/cart";
import { useState } from "react";

type Props = {
  id: string;
  name: string;
  price: number;
  image_url: string;
};

export default function AddToCartButton({ id, name, price, image_url }: Props) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addToCart({ id, name, price, image_url });
    setAdded(true);

    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button onClick={handleAdd} className="buy-now-btn">
      {added ? "Added ✓" : "Add To Cart"}
    </button>
  );
}
