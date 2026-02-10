import { pool } from './db';
import { Product, Artisan } from './definitions';

export async function getAllProducts(): Promise<Product[]> {
  try { 
    const res = await pool.query('SELECT * FROM products');
    return res.rows;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  const res = await pool.query(
    'SELECT * FROM products WHERE id = $1',
    [id]
  );
  return res.rows[0] ?? null;
}

export async function getAllArtisans(): Promise<Artisan[]> {
  try { 
    const res = await pool.query('SELECT * FROM artisans');
    return res.rows;
  } catch (error) {
    console.error('Error fetching artisans:', error);
    throw error;
  }
}
