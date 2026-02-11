// app/lib/actions.ts
import postgres from 'postgres';
import { Product, Artisan } from './definitions';

// Create a Postgres client using the same env and SSL as seed/route
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/* ===== PRODUCTS ===== */

export function normalizeProducts(products: Product[]) {
  return products.map((p) => ({
    id: p.id,
    name: p.name,
    description: p.description ?? undefined,
    price: p.price ?? undefined,
    image_url: p.image_url ?? '/placeholder.jpg',
  }));
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
    console.error('Error fetching products:', error);
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
    console.error('Error fetching product by ID:', error);
    return null;
  }
}

/* ===== ARTISANS ===== */

export function normalizeArtisans(artisans: Artisan[]) {
  return artisans.map((a) => ({
    id: a.id,
    name: a.name,
    bio: a.bio ?? undefined,                 // null → undefined
    image_url: a.image_url ?? '/placeholder.jpg', // null → placeholder
  }));
}

export async function getAllArtisans(): Promise<Artisan[]> {
  try {
    return await sql<Artisan[]>`SELECT * FROM artisans ORDER BY name ASC;`;
  } catch (error) {
    console.error('Error fetching artisans:', error);
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
    console.error('Error fetching artisan by ID:', error);
    return null;
  }
}
