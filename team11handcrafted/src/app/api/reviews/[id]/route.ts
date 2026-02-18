import { NextRequest, NextResponse } from "next/server";
import { sql } from "@/app/lib/db";
import { getSession } from "@/app/lib/session";

// GET /api/reviews/[id] - Get single review (Status: 200)
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const [review] = await sql`
      SELECT 
        r.id,
        r.product_id,
        r.user_id,
        r.rating,
        r.comment,
        r.created_at,
        r.updated_at,
        u.name as user_name,
        p.name as product_name
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      JOIN products p ON r.product_id = p.id
      WHERE r.id = ${id}
    `;

    if (!review) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(review, { status: 200 });

  } catch (error) {
    console.error("Error fetching review:", error);
    return NextResponse.json(
      { error: "Failed to fetch review" },
      { status: 500 }
    );
  }
}

// PUT /api/reviews/[id] - Update a review (Status: 200)
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSession();

    if (!session || !session.userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { rating, comment } = body;

    // Validate rating
    if (rating && (rating < 1 || rating > 5)) {
      return NextResponse.json(
        { error: "Rating must be between 1 and 5" },
        { status: 400 }
      );
    }

    // Check if review exists and belongs to user
    const [existingReview] = await sql`
      SELECT * FROM reviews WHERE id = ${id}
    `;

    if (!existingReview) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    if (existingReview.user_id !== session.userId) {
      return NextResponse.json(
        { error: "You can only update your own reviews" },
        { status: 403 }
      );
    }

    // Update the review
    const [updatedReview] = await sql`
      UPDATE reviews
      SET 
        rating = ${rating || existingReview.rating},
        comment = ${comment !== undefined ? comment : existingReview.comment},
        updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `;

    // Update product average rating
    const [avgRating] = await sql`
      SELECT AVG(rating)::numeric(2,1) as avg_rating
      FROM reviews
      WHERE product_id = ${updatedReview.product_id}
    `;

    await sql`
      UPDATE products
      SET rating = ${avgRating.avg_rating}
      WHERE id = ${updatedReview.product_id}
    `;

    return NextResponse.json(
      {
        message: "Review updated successfully",
        review: updatedReview
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error updating review:", error);
    return NextResponse.json(
      { error: "Failed to update review" },
      { status: 500 }
    );
  }
}

// DELETE /api/reviews/[id] - Delete a review (Status: 204)
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getSession();

    if (!session || !session.userId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Check if review exists and belongs to user
    const [existingReview] = await sql`
      SELECT * FROM reviews WHERE id = ${id}
    `;

    if (!existingReview) {
      return NextResponse.json(
        { error: "Review not found" },
        { status: 404 }
      );
    }

    // Check if user owns the review or is admin
    const [user] = await sql`
      SELECT role FROM users WHERE id = ${session.userId}
    `;

    if (existingReview.user_id !== session.userId && user.role !== "admin") {
      return NextResponse.json(
        { error: "You can only delete your own reviews" },
        { status: 403 }
      );
    }

    const product_id = existingReview.product_id;

    // Delete the review
    await sql`
      DELETE FROM reviews WHERE id = ${id}
    `;

    // Update product average rating
    const [avgRating] = await sql`
      SELECT AVG(rating)::numeric(2,1) as avg_rating
      FROM reviews
      WHERE product_id = ${product_id}
    `;

    await sql`
      UPDATE products
      SET rating = ${avgRating.avg_rating || 0}
      WHERE id = ${product_id}
    `;

    // Return 204 No Content (successful deletion)
    return new NextResponse(null, { status: 204 });

  } catch (error) {
    console.error("Error deleting review:", error);
    return NextResponse.json(
      { error: "Failed to delete review" },
      { status: 500 }
    );
  }
}