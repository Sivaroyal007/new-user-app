import React from "react";
import Image from "next/image";
import starfill from "@/assets/svg/starfill.svg";
import { roundToHalf } from "@/lib/Config";

export type companyDataProps = {
  _id: string;
  companyName: string;
  industry: string;
  employmentCount: string;
  location: string;
  jobTitles: any;
  avgRating: number;
  reviewCount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
};
const RatingCard = (companyData: companyDataProps) => {
  return (
    <div
      className="h-full rounded-[12px] border-[1px] border-[#E7EBF1] p-[24px]"
      style={{ boxShadow: "0px 8px 35px 0px #0000000A" }}
    >
      <div className="flex w-full flex-col-reverse justify-between gap-[2px] md:flex-row md:gap-0">
        <h1 className="text-[24px] font-[700] leading-[36px]">
          {companyData?.companyName}
        </h1>
        <div className="flex items-center gap-[4px]">
          <span className="text-[16px] font-[700]">
            {roundToHalf(companyData?.avgRating).toFixed(1)}
          </span>
          <Image src={starfill} alt="rating star icon" width={24} height={24} />
        </div>
      </div>
      <p className="mt-[3px] text-[16px] font-[700px] text-[#36558D]">
        {/* <span className="text-[#36558D]">{companyData?.reviewCount} </span> */}
        {companyData?.reviewCount === 1
          ? "1 Review found"
          : companyData?.reviewCount === 0
            ? "No reviews yet"
            : `${companyData?.reviewCount}  Reviews found`}
      </p>
      <div className="mt-[24px] flex w-full flex-col-reverse justify-between md:flex-row">
        <div className="mt-[24px] w-1/3 md:mt-0">
          <h3 className="reviewCardValue">{companyData?.location}</h3>
          <p className="reviewCardLabel">Location</p>
        </div>
        <div className="flex w-full md:w-2/3">
          <div className="w-1/2">
            <h3 className="reviewCardValue">{companyData?.industry}</h3>
            <p className="reviewCardLabel">Industry</p>
          </div>
          <div className="w-1/2">
            <h3 className="reviewCardValue">
              {companyData?.employmentCount} Employees
            </h3>
            <p className="reviewCardLabel">Company Size</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RatingCard;
