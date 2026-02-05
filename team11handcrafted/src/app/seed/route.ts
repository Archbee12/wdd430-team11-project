import postgres from 'postgres';

// Sample product data
const products = [
  {
    id: '11111111-1111-1111-1111-111111111111',
    name: 'Handcrafted Necklace',
    description: 'Beautiful handmade necklace with natural stones',
    price: 45,
    rating: 4.5,
    image_url: '/images/necklace.webp',
  },
  {
    id: '22222222-2222-2222-2222-222222222222',
    name: 'Artisan Pottery Mug',
    description: 'Hand-thrown pottery mug with unique glaze',
    price: 30,
    rating: 4.8,
    image_url: '/images/mug.webp',
  },
];

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: { rejectUnauthorized: false },
});

async function seedProducts() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  // Create products table
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      price NUMERIC NOT NULL,
      rating NUMERIC NOT NULL,
      image_url VARCHAR(255) NOT NULL
    );
  `;

  // Insert products
  const insertedProducts = await Promise.all(
    products.map(
      (product) => sql`
        INSERT INTO products (id, name, description, price, rating, image_url)
        VALUES (${product.id}, ${product.name}, ${product.description}, ${product.price}, ${product.rating}, ${product.image_url})
        ON CONFLICT (id) DO NOTHING;
      `
    )
  );

  return insertedProducts;
}

// API route
export async function GET() {
  try {
    await sql.begin((sql) => [seedProducts()]);
    return new Response(JSON.stringify({ message: 'Products seeded successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error }), { status: 500 });
  }
}

