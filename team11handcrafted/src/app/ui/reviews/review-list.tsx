"use client";

import { useState, useEffect } from "react";
import StarRating from "./star-rating";
import styles from "./review-list.module.css";

type Review = {
  id: string;
  rating: number;
  comment: string | null;
  created_at: string;
  updated_at: string;
  user_name: string;
  user_id: string;
};

type ReviewListProps = {
  productId: string;
  currentUserId?: string;
  onEditReview?: (review: Review) => void;
  refreshTrigger?: number;
};

export default function ReviewList({
  productId,
  currentUserId,
  onEditReview,
  refreshTrigger = 0
}: ReviewListProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [stats, setStats] = useState({ review_count: 0, average_rating: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchReviews();
  }, [productId, refreshTrigger]);

  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/products/${productId}/reviews`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch reviews");
      }

      const data = await response.json();
      setReviews(data.reviews);
      setStats(data.stats);
    } catch (err) {
      setError("Failed to load reviews");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete review");
      }

      // Refresh reviews
      fetchReviews();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete review");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (isLoading) {
    return <div className={styles.loading}>Loading reviews...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  return (
    <div className={styles.reviewList}>
      <div className={styles.reviewHeader}>
        <h3>Customer Reviews</h3>
        <div className={styles.reviewStats}>
          <div className={styles.averageRating}>
            <span className={styles.ratingNumber}>
              {stats.average_rating.toFixed(1)}
            </span>
            <StarRating rating={stats.average_rating} readonly size="medium" />
            <span className={styles.reviewCount}>
              {stats.review_count} {stats.review_count === 1 ? "review" : "reviews"}
            </span>
          </div>
        </div>
      </div>

      {reviews.length === 0 ? (
        <div className={styles.noReviews}>
          <p>No reviews yet. Be the first to review this product!</p>
        </div>
      ) : (
        <div className={styles.reviews}>
          {reviews.map((review) => (
            <div key={review.id} className={styles.reviewItem}>
              <div className={styles.reviewHeader}>
                <div className={styles.reviewUser}>
                  <span className={styles.userName}>{review.user_name}</span>
                  <StarRating rating={review.rating} readonly size="small" />
                </div>
                <div className={styles.reviewActions}>
                  <span className={styles.reviewDate}>
                    {formatDate(review.created_at)}
                  </span>
                  {currentUserId === review.user_id && (
                    <div className={styles.actionButtons}>
                      <button
                        onClick={() => onEditReview && onEditReview(review)}
                        className={styles.editButton}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(review.id)}
                        className={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {review.comment && (
                <p className={styles.reviewComment}>{review.comment}</p>
              )}
              {review.updated_at !== review.created_at && (
                <span className={styles.edited}>
                  (Edited on {formatDate(review.updated_at)})
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}