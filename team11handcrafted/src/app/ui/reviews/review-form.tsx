"use client";

import { useState } from "react";
import StarRating from "./star-rating";
import styles from "./review-form.module.css";

type ReviewFormProps = {
  productId: string;
  onReviewSubmitted?: () => void;
  existingReview?: {
    id: string;
    rating: number;
    comment: string | null;
  };
};

export default function ReviewForm({
  productId,
  onReviewSubmitted,
  existingReview
}: ReviewFormProps) {
  const [rating, setRating] = useState(existingReview?.rating || 0);
  const [comment, setComment] = useState(existingReview?.comment || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }

    setIsSubmitting(true);

    try {
      const url = existingReview
        ? `/api/reviews/${existingReview.id}`
        : `/api/products/${productId}/reviews`;

      const method = existingReview ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ rating, comment }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit review");
      }

      setSuccess(existingReview ? "Review updated successfully!" : "Review submitted successfully!");
      
      if (!existingReview) {
        setRating(0);
        setComment("");
      }

      if (onReviewSubmitted) {
        onReviewSubmitted();
      }

    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.reviewForm}>
      <h3>{existingReview ? "Edit Your Review" : "Write a Review"}</h3>
      
      {error && <div className={styles.error}>{error}</div>}
      {success && <div className={styles.success}>{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Your Rating *</label>
          <StarRating
            rating={rating}
            onRatingChange={setRating}
            size="large"
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="comment">Your Review (Optional)</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={5}
            maxLength={1000}
          />
          <span className={styles.charCount}>{comment.length}/1000</span>
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={isSubmitting || rating === 0}
        >
          {isSubmitting
            ? "Submitting..."
            : existingReview
            ? "Update Review"
            : "Submit Review"}
        </button>
      </form>
    </div>
  );
}