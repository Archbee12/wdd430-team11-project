"use client";

import { useState } from "react";
import styles from "./star-rating.module.css";

type StarRatingProps = {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "small" | "medium" | "large";
};

export default function StarRating({
  rating,
  onRatingChange,
  readonly = false,
  size = "medium"
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const handleClick = (value: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const displayRating = hoverRating || rating;

  return (
    <div 
      className={`${styles.starRating} ${styles[size]} ${!readonly ? styles.interactive : ''}`}
      onMouseLeave={handleMouseLeave}
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <span
          key={value}
          className={`${styles.star} ${value <= displayRating ? styles.filled : ''}`}
          onClick={() => handleClick(value)}
          onMouseEnter={() => handleMouseEnter(value)}
        >
          ★
        </span>
      ))}
      {!readonly && (
        <span className={styles.ratingText}>
          {displayRating > 0 ? `${displayRating} star${displayRating !== 1 ? 's' : ''}` : 'Select rating'}
        </span>
      )}
    </div>
  );
}