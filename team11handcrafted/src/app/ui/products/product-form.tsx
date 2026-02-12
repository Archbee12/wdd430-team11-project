"use client";

import { useState } from "react";
import { createProduct, updateProduct, deleteProduct } from "@/app/lib/actions";
import styles from "./product-form.module.css";
import Image from "next/image";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  artisan_id: string;
};

type ProductFormProps = {
  artisan_id: string;
  product?: Product;
};

export default function ProductForm({ artisan_id, product }: ProductFormProps) {
  const [name, setName] = useState(product?.name ?? "");
  const [description, setDescription] = useState(product?.description ?? "");
  const [price, setPrice] = useState<number | "">(product?.price ?? "");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!name || !description || !price || Number(price) <= 0) {
      setMessage("Please fill all required fields correctly.");
      return;
    }

    // Use existing image_url unless a new file is selected
    let imageUrl = product?.image_url ?? "/placeholder.jpg";

    if (image) {
      const formData = new FormData();
      formData.append("file", image);

      const uploadRes = await fetch("/api/uploads", {
        method: "POST",
        body: formData,
      });

      if (!uploadRes.ok) {
        setMessage("Image upload failed. Please try again.");
        return;
      }

      const data = await uploadRes.json();
      imageUrl = data.imageUrl;
    }

    try {
      if (product?.id) {
        // Update
        await updateProduct(product.id, {
          name,
          description,
          price: Number(price),
          image_url: imageUrl,
        });
        setMessage("Product updated successfully!");
      } else {
        // Create
        await createProduct({
          artisan_id: artisan_id,
          name,
          description,
          price: Number(price),
          image_url: imageUrl,
        });
        setMessage("Product created successfully!");

        setName("");
        setDescription("");
        setPrice("");
        setImage(null);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred. Please try again.";
      setMessage(errorMessage);
    }
  };

  const handleDelete = async () => {
    if (!product) return;
    const confirmed = confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      await deleteProduct(product.id);
      setMessage("Product deleted successfully!");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to delete product";
      setMessage(errorMessage);
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.formCard}>
        <h2 className={styles.title}>
          {product ? "Edit Product" : "Create New Product"}
        </h2>

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
          {/* Show current image from database */}
          <Image
            src={image ? URL.createObjectURL(image) : product?.image_url ?? "/placeholder.jpg"}
            alt="Product Image"
            width={200}
            height={200}
            className={styles.imagePreview}
          />
        </div>

        <button type="submit" className={styles.button}>
          {product ? "Update Product" : "Create Product"}
        </button>

        {product && (
          <button
            type="button"
            className={`${styles.button} ${styles.deleteButton}`}
            onClick={handleDelete}
          >
            Delete Product
          </button>
        )}
      </form>
    </div>
  );
}
