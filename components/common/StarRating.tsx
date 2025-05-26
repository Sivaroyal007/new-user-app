"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import filledStar from "@/assets/svg/filled1.svg";
import emptyStar from "@/assets/svg/empty1.svg";
import halfStar from '@/assets/svg/Half Star1.svg'

type StarRatingProps = {
  initialRating?: number;
  onRatingChange?: (rating: number) => void;
  fixedRating?: number;
};

const StarRating: React.FC<StarRatingProps> = ({
  initialRating = 0,
  onRatingChange,
  fixedRating,
}) => {
  const [rating, setRating] = useState<number>(initialRating);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  useEffect(() => {
    if (fixedRating !== undefined) {
      setRating(fixedRating);
    }
  }, [fixedRating]);

  const handleRating = (rate: number) => {
    if (fixedRating !== undefined) return;
    setRating(rate);
    if (onRatingChange) {
      onRatingChange(rate);
    }
  };

  const getStarType = (star:number):string => {
    if (rating >= star) {
      return filledStar;
    } else if (rating >= star - 0.5) {
      return halfStar;
    } else {
      return emptyStar;
    }
  }

  return (
    <div
    className="pl-[8px]"
      style={{
        display: "flex",
        cursor: fixedRating !== undefined ? "default" : "pointer",
      }}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <Image
          key={star}
          // src={star <= rating ? filledStar : emptyStar}
          src={getStarType(star)}
          alt={`${star} star`}
          width={24}
          height={24}
          onClick={() => handleRating(star)}
          style={{ marginRight: 8 }}
          className="p-[3px] md:p-[1px]"
        />
      ))}
    </div>
  );
};

export default StarRating;
