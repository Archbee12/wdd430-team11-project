import postgres from 'postgres';
import { artisans, products } from '@/app/lib/placeholder-data';

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: 'require',
});

async function seedArtisans() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

  await sql`
    CREATE TABLE IF NOT EXISTS artisans (
      id UUID PRIMARY KEY,
      name TEXT NOT NULL,
      bio TEXT,
      location TEXT,
      image_url TEXT
    );
  `;

  const insertedArtisans = await Promise.all(
    artisans.map(
      (artisan) => sql`
        INSERT INTO artisans (id, name, bio, location, image_url)
        VALUES (
          ${artisan.id},
          ${artisan.name},
          ${artisan.bio},
          ${artisan.location},
          ${artisan.image_url}
        )
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedArtisans;
}

async function seedProducts() {
  await sql`
    CREATE TABLE IF NOT EXISTS products (
      id UUID PRIMARY KEY,
      artisan_id UUID REFERENCES artisans(id),
      name TEXT NOT NULL,
      description TEXT,
      price NUMERIC,
      rating NUMERIC,
      image_url TEXT
    );
  `;

  const insertedProducts = await Promise.all(
    products.map(
      (product) => sql`
        INSERT INTO products
        (id, artisan_id, name, description, price, rating, image_url)
        VALUES (
          ${product.id},
          ${product.artisan_id},
          ${product.name},
          ${product.description},
          ${product.price},
          ${product.rating},
          ${product.image_url}
        )
        ON CONFLICT (id) DO NOTHING;
      `,
    ),
  );

  return insertedProducts;
}

export async function GET() {
  try {
    await sql.begin(() => [
      seedArtisans(),
      seedProducts(),
    ]);

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    console.error('Seed error:', error);
    return Response.json(
      { error: 'Failed to seed database' },
      { status: 500 },
    );
  }
}
