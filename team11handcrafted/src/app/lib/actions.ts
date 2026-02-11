"use server";

import { sql } from "@/app/lib/db";
import { Product, Artisan } from "./definitions";

/* ===== PRODUCTS ===== */

export async function normalizeProducts(products: Product[]): Promise<Product[]> {
  return await Promise.all(products.map(async (p) => ({
    id: p.id,
    artisan_id: p.artisan_id,
    name: p.name ?? "Untitled Product",
    description: p.description ?? "No description provided",
    price: p.price ?? 0,
    rating: p.rating ?? 0,
    image_url: p.image_url ?? "/placeholder.jpg",
  })));
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const data = await sql`SELECT * FROM products ORDER BY name ASC;`;
    return data.map((product) => ({
      ...product,
      price:
        product.price !== null && product.price !== undefined
          ? Number(product.price)
          : undefined,
    })) as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const [product] = await sql<Product[]>`
      SELECT * FROM products WHERE id = ${id};
    `;
    return product ?? null;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    return null;
  }
}

// Create product
export async function createProduct(product: {
  name: string;
  description: string;
  price: number;
  artisan_id: string;
  image_url: string;
}) {
  const [result] = await sql<Product[]>`
    INSERT INTO products (name, description, price, artisan_id, image_url)
    VALUES (${product.name}, ${product.description}, ${product.price}, ${product.artisan_id}, ${product.image_url})
    RETURNING *;
  `;
  return result;
}

//  update & delete
// export async function updateProduct(
//   id: string,
//   updates: Partial<Omit<Product, "id" | "artisan_id">>
// ): Promise<Product> {
//   const existing = await getProductById(id);
//   const updated = { ...existing, ...updates };
//   const [result] = await sql<Product[]>`
//     UPDATE products SET
//       name = ${updated.name},
//       description = ${updated.description},
//       price = ${updated.price},
//       rating = ${updated.rating},
//       image_url = ${updated.image_url}
//     WHERE id = ${id}
//     RETURNING *;
//   `;
//   return normalizeProducts([result])[0];
// }

// export async function deleteProduct(id: string) {
//   await sql`DELETE FROM products WHERE id = ${id};`;
// }

/* ===== ARTISANS ===== */

export async function normalizeArtisans(artisans: Artisan[]): Promise<Artisan[]> {
  return await Promise.all(artisans.map(async (a) => ({
    id: a.id,
    name: a.name ?? "Unnamed Artisan",
    bio: a.bio ?? "No bio available",
    location: a.location ?? "Unknown",
    image_url: a.image_url ?? "/placeholder.jpg",
  })));
}

export async function getAllArtisans(): Promise<Artisan[]> {
  try {
    return await sql<Artisan[]>`SELECT * FROM artisans ORDER BY name ASC;`;
  } catch (error) {
    console.error("Error fetching artisans:", error);
    throw error;
  }
}

export async function getArtisanById(id: string): Promise<Artisan | null> {
  try {
    const [artisan] = await sql<Artisan[]>`
      SELECT * FROM artisans WHERE id = ${id};
    `;
    return artisan ?? null;
  } catch (error) {
    console.error("Error fetching artisan by ID:", error);
    return null;
  }
}
