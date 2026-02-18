import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import { getSession } from "@/app/lib/session";

// POST /api/products/[id]/reviews - Create a review (Status: 201)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: product_id } = await params;
    const session = await getSession();

    // Check if user is logged in
    if (!session || !session.userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please log in to leave a review." },
        { status: 401 }
      );
    }

    // Check if user is a buyer (not artisan or admin)
    const [user] = await sql`
      SELECT role FROM users WHERE id = ${session.userId}
    `;

    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    if (user.role !== "buyer") {
      return NextResponse.json(
        { error: "Only buyers can leave reviews" },
        { status: 403 }
      );
    }

    // Parse request body
    const body = await req.json();
    const { rating, comment } = body;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Check if product exists
    const [product] = await sql`
      SELECT id FROM products WHERE id = ${product_id}
    `;

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Check if user already reviewed this product
    const [existingReview] = await sql`
      SELECT id FROM reviews 
      WHERE product_id = ${product_id} AND user_id = ${session.userId}
    `;

    if (existingReview) {
      return NextResponse.json(
        { error: "You have already reviewed this product. Please update your existing review." },
        { status: 409 }
      );
    }

    // Create the review
    const [newReview] = await sql`
      INSERT INTO reviews (product_id, user_id, rating, comment)
      VALUES (${product_id}, ${session.userId}, ${rating}, ${comment || null})
      RETURNING *
    `;

    // Update product average rating
    const [avgRating] = await sql`
      SELECT AVG(rating)::numeric(2,1) as avg_rating
      FROM reviews
      WHERE product_id = ${product_id}
    `;

    await sql`
      UPDATE products
      SET rating = ${avgRating.avg_rating}
      WHERE id = ${product_id}
    `;

    return NextResponse.json(
      {
        message: "Review created successfully",
        review: newReview
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Error creating review:", error);
    return NextResponse.json(
      { error: "Failed to create review" },
      { status: 500 }
    );
  }
}

// GET /api/products/[id]/reviews - Get all reviews for a product (Status: 200)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: product_id } = await params;

    // Get all reviews with user information
    const reviews = await sql`
      SELECT 
        r.id,
        r.product_id,
        r.user_id,
        r.rating,
        r.comment,
        r.created_at,
        r.updated_at,
        u.name as user_name
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.product_id = ${product_id}
      ORDER BY r.created_at DESC
    `;

    // Get review statistics
    const [stats] = await sql`
      SELECT 
        COUNT(*)::int as review_count,
        AVG(rating)::numeric(2,1) as average_rating
      FROM reviews
      WHERE product_id = ${product_id}
    `;

    return NextResponse.json(
      {
        reviews,
        stats: {
          review_count: stats?.review_count || 0,
          average_rating: stats?.average_rating || 0
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error fetching reviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch reviews" },
      { status: 500 }
    );
  }
}