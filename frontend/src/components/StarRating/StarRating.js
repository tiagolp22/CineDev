import React, { useState } from "react";
import "./StarRating.css";

const StarRating = ({ rating, onRate }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const stars = [1, 2, 3, 4, 5];

  const handleMouseEnter = (star) => {
    setHoverRating(star);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div className="star-rating">
      <span className="rating-value">{rating.toFixed(2)} sur 5</span>
      <div className="stars">
        {stars.map((star) => (
          <span
            key={star}
            className={`star ${star <= (hoverRating || rating) ? "filled" : ""}`}
            onMouseEnter={() => handleMouseEnter(star)}
            onMouseLeave={handleMouseLeave}
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
