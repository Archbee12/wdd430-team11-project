// app/lib/actions.ts
import postgres from 'postgres';
import { Product, Artisan } from './definitions';

// Create a Postgres client using the same env and SSL as seed/route
const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

/* ===== PRODUCTS ===== */
export async function getAllProducts(): Promise<Product[]> {
  try {
    return await sql<Product[]>`SELECT * FROM products ORDER BY name ASC;`;
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
