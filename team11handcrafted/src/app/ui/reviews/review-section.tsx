"use client";

import { useState } from "react";
import ReviewList from "./review-list";
import ReviewForm from "./review-form";

type ReviewSectionProps = {
    productId: string;
    currentUserId?: string;
    userRole?: string;
};

export default function ReviewSection({
    productId,
    currentUserId,
    userRole,
}: ReviewSectionProps) {
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [editingReview, setEditingReview] = useState<{
        id: string;
        rating: number;
        comment: string | null;
    } | null>(null);

    const handleReviewSubmitted = () => {
        setRefreshTrigger((prev) => prev + 1);
        setEditingReview(null);
    };

    const handleEditReview = (review: {
        id: string;
        rating: number;
        comment: string | null;
    }) => {
        setEditingReview(review);
    };

    const handleCancelEdit = () => {
        setEditingReview(null);
    };

    return (
        <section id="reviews" className="review-section">
            {/* Review Form - only for buyers */}
            {userRole === "buyer" && (
                <>
                    <ReviewForm
                        productId={productId}
                        onReviewSubmitted={handleReviewSubmitted}
                        existingReview={editingReview ?? undefined}
                    />
                    {editingReview && (
                        <button
                            onClick={handleCancelEdit}
                            style={{
                                marginTop: "0.5rem",
                                padding: "0.5rem 1rem",
                                background: "none",
                                border: "1px solid #ccc",
                                borderRadius: "0.375rem",
                                cursor: "pointer",
                                fontSize: "0.9rem",
                            }}
                        >
                            Cancel Editing
                        </button>
                    )}
                </>
            )}

            {/* Review List - visible to everyone */}
            <ReviewList
                productId={productId}
                currentUserId={currentUserId}
                onEditReview={handleEditReview}
                refreshTrigger={refreshTrigger}
            />
        </section>
    );
}
