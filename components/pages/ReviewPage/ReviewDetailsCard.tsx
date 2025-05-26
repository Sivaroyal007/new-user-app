"use client";

import StarRating from "@/components/common/StarRating";
import { SheetClose } from "@/components/ui/NavSheet";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsLargeScreen } from "@/lib/hooks/screenSizeCheck";
import React, { forwardRef, useEffect, useRef, useState } from "react";
import closeicon from "@/assets/svg/mi_close.svg";
import Image from "next/image";
import { JobReviewCardType } from "@/lib/types/ReviewTypes";
import { formatForDate, timeDifference } from "@/lib/Config";




export type ReviewDetailsCardProps = {
  reviewData: JobReviewCardType | null;
};

export const ReviewDetailsCard = forwardRef<HTMLButtonElement,ReviewDetailsCardProps>(
  ({reviewData}, ref) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button ref={ref}  className="hidden">
          open
        </button>
      </SheetTrigger>
      <SheetContent
        side={useIsLargeScreen() ? "center" : "bottom"}
        className="w-full bg-white lg:max-w-[551px]"
      >
        <SheetClose className="absolute right-[24px] top-[24px]">
          <Image src={closeicon} alt="close icon" width={25} height={25} />
        </SheetClose>
        <div>
          <h1 className="text-[24px] font-[700] leading-[36px]">
            {reviewData?.title}
          </h1>
          <h2 className="mb-[16px] mt-[4px] text-[16px] font-[700] text-gray-normal">
            {reviewData?.jobTitle}
          </h2>
          <StarRating fixedRating={reviewData?.rating} />

          <div className="mt-[24px] grid w-full grid-cols-2 gap-y-[24px]">
            <div>
              <h3 className="reviewCardValue">{reviewData?.noOfInterviews}</h3>
              <p className="reviewCardLabel">Number of interviews faced</p>
            </div>

            <div>
              <h3 className="reviewCardValue">{reviewData?.noOfDays}{" "}{reviewData?.noOfDays ===1 ? "Day" : "Days"}</h3>
              <p className="reviewCardLabel">Duration of process</p>
            </div>

            <div>
              <h3 className="reviewCardValue">{formatForDate(reviewData?.applicationDate)}</h3>
              <p className="reviewCardLabel">Date of application</p>
            </div>

            <div>
              <h3 className="reviewCardValue">{reviewData?.hiringPlatform === "others" ? reviewData?.otherHiringPlatform : reviewData?.hiringPlatform}</h3>
              <p className="reviewCardLabel">Hiring Channel</p>
            </div>
          </div>

          <p className="mt-[24px] text-[16px] font-[400] text-[#434343] overflow-y-auto h-[24vh] md:h-[20vh]">
            {reviewData?.description}
          </p>

          <div className="mt-[32px] flex w-full justify-end">
            <p className="text-[14px] font-[600] text-gray-light">
              {timeDifference(reviewData?.createdAt)}
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
});

ReviewDetailsCard.displayName = "ReviewDetailsCard";
