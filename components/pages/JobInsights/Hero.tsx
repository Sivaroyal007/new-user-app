"use client"

import { josh } from "@/app/fonts";
import HeroWrapper from "@/components/wrapper/HeroWrapper";
import { trackPageVisit } from "@/lib/services/Tracking/tracking";
import React, { useEffect } from "react";

const Hero = ({data}:any) => {

  useEffect(() => {
    trackPageVisit('other'); 
}, []);
  return (
    <HeroWrapper className="px-[5vw]">
      <div className="bg-transparent pt-[71.5px] md:pt-[125px] lg:pt-[124px]">
        <div className="mt-[30px] lg:mt-[64px] flex flex-col lg:flex-row gap-[8px] lg:gap-[5vw] mb-[24px] md:mb-[64px] ]">
          <h1
            className={`${josh.className} w-full text-[24px] sm:text-[32px] font-semibold text-brand-black md:text-[48px]  md:leading-[62px`}
          >
            {data?.Heading ?? "Job search intel and insights"}
          </h1>
          <p className="font-[400] text-[14px] md:text-[16px] text-[#434343] leading-[24px] items-center flex justify-center">
           {data?.Description ?? ` Wondering what others face? Explore anonymous stories from job
            seekers like you. Get a dose of reality, laugh, connect, and gain
            valuable insights on your path to landing your dream job!`}
          </p>
        </div>
      </div>
    </HeroWrapper>
  );
};

export default Hero;
