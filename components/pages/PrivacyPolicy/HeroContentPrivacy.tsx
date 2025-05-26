"use client";

import { josh } from "@/app/fonts";
import HeroWrapper from "@/components/wrapper/HeroWrapper";
import RichTextField from "@/lib/providers/RichTextField";
import { trackPageVisit } from "@/lib/services/Tracking/tracking";

import React, { useEffect } from "react";

const HeroContentPrivacy = ({ data }: any) => {

  useEffect(() => {
    trackPageVisit('other'); 
}, []);

  function formatDate(createdAt: any) {
    const date = new Date(createdAt);

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    const dayWithSuffix =
      day +
      (day % 10 === 1 && day !== 11
        ? "st"
        : day % 10 === 2 && day !== 12
          ? "nd"
          : day % 10 === 3 && day !== 13
            ? "rd"
            : "th");

    return `${dayWithSuffix} ${month} ${year}`;
  }
  // console.log(data?.content)
  return (
    <>
      <HeroWrapper className="px-[5vw]">
        <div className="bg-transparent pt-[71.5px] md:pt-[125px] lg:pt-[124px]">
          <div className="mb-[19px] mt-[24px]">
            <h1
              className={` ${josh.className} text-[28px] font-[600] md:text-[40px]`}
            >
              {data?.content?.Heading ?? `Privacy Policy`}
            </h1>
            <p className="text-[14px] font-[400] text-[#434343]">
              last updated on {formatDate(data?.created_at)}.
            </p>
          </div>
        </div>
      </HeroWrapper>

      <div className="w-full px-5 pb-[30px] pt-[23px] text-[#434343] md:px-[5vw] md:pb-[59px]">
        <RichTextField data={data?.content} />
      </div>
    </>
  );
};

export default HeroContentPrivacy;
