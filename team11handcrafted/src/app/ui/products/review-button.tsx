"use client";

import ReviewForm from "../reviews/review-form";
import { useState } from "react";

export default function ReviewButton({ productId }: { productId: string }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <button className="review-btn" onClick={() => setShowForm(!showForm)}>
        ★ Reviews
      </button>
      {showForm && <ReviewForm productId={productId} onReviewSubmitted={() => setShowForm(false)} />}
    </>
  );
}