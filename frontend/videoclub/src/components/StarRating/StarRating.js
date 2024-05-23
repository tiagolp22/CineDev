// StarRating.js
import React from "react";
import "./StarRating.css";

const StarRating = ({ rating, onRate }) => {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="star-rating">
      <span className="rating-value">{rating.toFixed(2)} sur 5</span>
      <div className="stars">
        {stars.map((star) => (
          <span
            key={star}
            className={`star ${star <= rating ? "filled" : ""}`}
            onClick={() => onRate(star)}
          >
            ★
          </span>
        ))}
      </div>
    </div>
  );
};

export default StarRating;
