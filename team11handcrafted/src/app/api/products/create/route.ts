import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";

export async function POST(req: NextRequest) {
  const { name, description, price, artisan_id, image_url } = await req.json();

  const [product] = await sql`
    INSERT INTO products (name, description, price, artisan_id, image_url)
    VALUES (${name}, ${description}, ${price}, ${artisan_id}, ${image_url})
    RETURNING *;
  `;

  return NextResponse.json(product);
}
