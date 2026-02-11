"use client";

import { useState } from "react";
import { createProduct } from "@/app/lib/actions";
import styles from "./product-form.module.css";

type ProductFormProps = {
  artisanId: string;
};

export default function ProductForm({ artisanId }: ProductFormProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!name || !description || !price || Number(price) <= 0) {
      setMessage("Please fill all required fields correctly.");
      return;
    }

    await createProduct({
      artisan_id: artisanId,
      name,
      description,
      price: Number(price),
      image_url: image ? URL.createObjectURL(image) : "/placeholder.jpg",
    });

    setMessage("Product created successfully!");

    setName("");
    setDescription("");
    setPrice("");
    setImage(null);
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <h2 className={styles.title}>Create New Product</h2>

        {message && <p className={styles.message}>{message}</p>}

        <div className={styles.formGroup}>
          <label>Product Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter product name"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Price (₦)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            min={0}
            placeholder="Enter price"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Product Image</label>
          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
          />
        </div>

        <button type="submit" className={styles.button}>
          Create Product
        </button>
      </form>
    </div>
  );
}
