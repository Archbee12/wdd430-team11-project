"use server";

import { sql } from "@/app/lib/db";
import { Product, Artisan } from "./definitions";
import { getCurrentUser } from "./session";

/* ===== PRODUCTS ===== */

export async function normalizeProducts(products: Product[]): Promise<Product[]> {
  return await Promise.all(products.map(async (p) => ({
    id: p.id,
    artisan_id: p.artisan_id,
    name: p.name ?? "Untitled Product",
    description: p.description ?? "No description provided",
    price: p.price ?? 0,
    rating: p.rating ?? 0,
    image_url: p.image_url ?? "/images/products/placeholder.jpg",
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
      SELECT p.id,
        p.artisan_id,
        p.name,
        p.description,
        p.price,
        p.image_url,
        p.rating,
        u.name AS artisan_name
      FROM products p
      LEFT JOIN users u
        ON p.artisan_id = u.id
      WHERE p.id = ${id};
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
  const user = await getCurrentUser();
  if (!user) {
    throw new Error("Not authenticated  - please log in.");
  }

  if (user.role !== "artisan" && user.role !== "admin") {
    throw new Error("Unauthorized - only artisans can create products.");
  }

  const [result] = await sql<Product[]>`
    INSERT INTO products (name, description, price, artisan_id, image_url)
    VALUES (${product.name}, ${product.description}, ${product.price}, ${user.id}, ${product.image_url})
    RETURNING *;
  `;
  return result;
}

// ---------------- Update Product ----------------
export async function updateProduct(
  id: string,
  updates: Partial<Omit<Product, "id" | "artisan_id">>
): Promise<Product | null> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  // Optional: you can enforce only artisan/seller can update their own products
  const existing = await getProductById(id);
  if (!existing) return null;

  if (user.id !== existing.artisan_id && user.role !== "admin") {
    throw new Error("Unauthorized to update this product");
  }

  const [result] = await sql<Product[]>`
    UPDATE products SET
      name = ${updates.name ?? existing.name},
      description = ${updates.description ?? existing.description},
      price = ${updates.price ?? existing.price},
      rating = ${updates.rating ?? existing.rating},
      image_url = ${updates.image_url ?? existing.image_url}
    WHERE id = ${id}
    RETURNING *;
  `;

  return result ?? null;
}

// ---------------- Delete Product ----------------
export async function deleteProduct(id: string): Promise<void> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const existing = await getProductById(id);
  if (!existing) throw new Error("Product not found");

  if (user.id !== existing.artisan_id && user.role !== "admin") {
    throw new Error("Unauthorized to delete this product");
  }

  await sql`
    DELETE FROM products WHERE id = ${id};
  `;
}


/* ===== ARTISANS ===== */

export async function normalizeArtisans(artisans: Artisan[]): Promise<Artisan[]> {
  return await Promise.all(artisans.map(async (a) => ({
    id: a.id,
    name: a.name ?? "Unnamed Artisan",
    bio: a.bio ?? "No bio available",
    location: a.location ?? "Unknown",
    image_url: a.image_url ?? "/images/artisans/placeholder.jpg",
  })));
}

export async function getAllArtisans(): Promise<Artisan[]> {
  const artisans = await sql<Artisan[]>`
    SELECT 
      u.id,
      u.name,
      a.bio,
      a.location,
      a.image_url
    FROM users u
    LEFT JOIN artisans a ON a.id = u.id
    WHERE u.role = 'artisan'
    ORDER BY u.name;
  `;
  return artisans;
}


export async function getArtisanById(id: string): Promise<Artisan | null> {
  const [artisan] = await sql<Artisan[]>`
    SELECT 
      u.id,
      u.name,
      a.bio,
      a.location,
      a.image_url
    FROM users u
    LEFT JOIN artisans a ON a.id = u.id
    WHERE u.role = 'artisan' AND u.id = ${id};
  `;
  return artisan ?? null;
}

// ------- Update Artisan -----------
export async function updateArtisan(
  id: string,
  updates: Partial<{
    name: string;
    bio: string;
    location: string;
    image_url: string;
  }>
): Promise<Artisan | null> {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const existing = await getArtisanById(id);
  if (!existing) throw new Error("Artisan not found");

  // 🔐 Authorization (same logic as products)
  if (user.id !== id && user.role !== "admin") {
    throw new Error("Unauthorized to update this artisan");
  }

  // Update users table (name)
  await sql`
    UPDATE users
    SET name = ${updates.name ?? existing.name}
    WHERE id = ${id};
  `;

  // Update artisans table (bio, location, image)
  await sql`
    UPDATE artisans
    SET
      bio = ${updates.bio ?? existing.bio},
      location = ${updates.location ?? existing.location},
      image_url = ${updates.image_url ?? existing.image_url}
    WHERE id = ${id};
  `;

  // Return updated artisan
  return await getArtisanById(id);
}

// ==== Get Product by Artisan ID ====
export async function getProductsByArtisanId(artisanId: string) {
  const data = await sql<Product[]>`
    SELECT p.id, p.artisan_id, p.name, p.description, p.price, p.rating, p.image_url
    FROM products p
    WHERE p.artisan_id = ${artisanId}
    ORDER BY p.name ASC;
  `;
  return data.map((product) => ({
    ...product,
    price:
      product.price !== null && product.price !== undefined
        ? Number(product.price)
        : 0,
  }));
}

