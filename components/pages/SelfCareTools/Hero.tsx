"use client"

import HeroWrapper from "@/components/wrapper/HeroWrapper";
import heroImg from "@/assets/career-fairs/hero.png";
import Image from "next/image";
import { josh } from "@/app/fonts";
import { useEffect } from "react";
import { trackPageVisit } from "@/lib/services/Tracking/tracking";

export default function Hero({ data }: any) {
  useEffect(() => {
    trackPageVisit("other");
  }, []);
  return (
    <HeroWrapper>
      <div className="bg-transparent pt-[71.5px] md:pt-[145px] lg:pt-[124px]">
        <div className="flex flex-col-reverse items-center justify-between gap-y-6 px-[5vw] pb-8 pt-2 md:mx-auto md:flex-row md:gap-x-[136px] md:gap-y-0 md:pb-[88px] md:pt-[13px]">
          <div className="space-y-2 md:w-1/2">
            <h1
              className={`${josh.className} text-[32px] font-semibold leading-10 text-brand-black md:text-[56px] md:leading-[72px]`}
            >
              {data?.Heading ?? "Staying sane while job searching matters!"}
            </h1>
            <p className="leading-6 text-grayDark">
              {data?.Description ??
                "Our mission is to revolutionize the way people think about sustainability. We are committed to designing and manufacturing products that reduce environmental impact,"}
            </p>
          </div>
          <div className="relative h-[232px] w-full md:h-[382px] md:w-[573px]">
            <Image src={data?.Image?.filename ?? heroImg} alt="hero" fill />
          </div>
        </div>{" "}
      </div>
    </HeroWrapper>
  );
}
