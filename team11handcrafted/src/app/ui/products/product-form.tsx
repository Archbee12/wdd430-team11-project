"use client";

import { useState } from "react";
import { createProduct } from "@/app/lib/actions";

type ProductFormProps = {
  artisanId: string;
};

export default function ProductForm({ artisanId }: ProductFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || price <= 0) {
      alert("Please fill all required fields correctly.");
      return;
    }

    await createProduct({
      artisan_id: artisanId,
      name,
      description,
      price,
      image_url: image ? URL.createObjectURL(image) : "/placeholder.jpg",
    });

    alert("Product created successfully!");
    setName("");
    setDescription("");
    setPrice(0);
    setImage(null);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        min={0}
        required
      />
      <input type="file" onChange={(e) => setImage(e.target.files?.[0] ?? null)} />
      <button type="submit" className="btn">
        Create Product
      </button>
    </form>
  );
}
