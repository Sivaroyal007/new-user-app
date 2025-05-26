"use client"

import { josh } from "@/app/fonts";
import HeroWrapper from "@/components/wrapper/HeroWrapper";
import { trackPageVisit } from "@/lib/services/Tracking/tracking";
import { useEffect } from "react";

export default function Hero({data}:any) {

  useEffect(() => {
    trackPageVisit('other'); 
}, []);

  return (
    <HeroWrapper className="px-[5vw]">
      <div className="bg-transparent pt-[71.5px] md:pt-[145px] lg:pt-[124px]">
        <h1
          className={`${josh.className} w-full break-all pb-[19px] pt-2 text-center text-[32px] font-semibold text-brand-black md:pb-[35px] md:pt-4 md:text-[64px]`}
        >
         {data}
        </h1>
      </div>
    </HeroWrapper>
  );
}
