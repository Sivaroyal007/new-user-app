import React from "react";
import Image from "next/image";
import starfill from "@/assets/svg/starfill.svg";
import TruncatedText from "@/components/common/TruncatedReadmore";
import { JobReviewCardType } from "@/lib/types/ReviewTypes";
import { timeDifference } from "@/lib/Config";

const ReviewCard = (paginatedReviewData: JobReviewCardType) => {
  return (
    <div
      className="h-full rounded-[12px]  p-[24px]"
      style={{ boxShadow: "0px 8px 35px 0px #0000000A" }}
    >
      <div className="flex w-full justify-between">
        <h1 className="text-[18px] font-[700] leading-[36px] md:text-[24px]">
          {paginatedReviewData?.title}
        </h1>
        <div className="flex items-center gap-[4px]">
          <span className="text-[16px] font-[700]">
            {Math.round(paginatedReviewData?.rating)}.0
          </span>
          <Image src={starfill} alt="rating star icon" width={24} height={24} />
        </div>
      </div>
      <h2 className="mt-[4px] text-[14px] font-[700] text-gray-normal md:text-[16px]">
        {paginatedReviewData?.jobTitle}
      </h2>

      <div className="my-[16px] h-[58px]">
        <TruncatedText
          text={paginatedReviewData?.description}
          maxLength={198}
        />
      </div>
    
      <p className="text-[12px] font-[500] text-gray-light md:text-[14px] ">
        {timeDifference(paginatedReviewData?.createdAt)}
      </p>
      
    </div>
  );
};

export default ReviewCard;
