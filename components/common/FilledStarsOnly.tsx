import React from "react";
import Image from "next/image";
import filledStar from "@/assets/svg/starfill.svg";

interface FixedStarRatingProps {
  rating: number;
}

const FilledStarRating: React.FC<FixedStarRatingProps> = ({ rating }) => {
  return (
    <div style={{ display: "flex" }}>
      {[...Array(rating)].map((_, index) => (
        <Image
          key={index}
          src={filledStar}
          alt={`${index + 1} star`}
          width={24}
          height={24}
          style={{ marginRight: 1 }}
        />
      ))}
    </div>
  );
};

export default FilledStarRating;
