import BgSquare from "@/components/common/BgSquare";
import React from "react";
import Image from "next/image";
import dummyImg from "@/assets/career-fairs/image33.png";
import rigtharrow from "@/assets/career-fairs/rightarrow.svg";
import Link from "next/link";
import { josh } from "@/app/fonts";

const UnvielingMission = ({ data }: any) => {
  return (
    <div className="relative w-full px-[5vw] py-[83px]">
      <BgSquare className="left-[37%] top-[84px] z-0 hidden -translate-x-[24%] -translate-y-[18%] rotate-[-33.668deg] md:block" />
      <BgSquare className="bottom-16 right-[10%] z-10 hidden -translate-x-[24%] -translate-y-[18%] rotate-[-33.668deg] md:block" />
      <div className="z-30 flex flex-col items-center justify-center gap-x-24 md:flex-row">
        <div className="md:max-w-1/2 z-30 mx-auto w-full items-center">
          <Image
            src={data?.CardImage?.filename ?? dummyImg}
            alt="hero image"
            width={506}
            height={338}
            className="z-30"
          />
        </div>

        <div className="md:max-w-1/2 w-full">
          <h1
            className={` ${josh.className} mt-[24px] text-[32px] font-[600] leading-[41px] text-[#121212] md:mt-0 md:text-[48px] md:leading-[62px]`}
          >
            {data?.CardTitle ?? `Unveiling Our Mission`}
          </h1>
          <p className="mt-[8px] text-[#7C7C7C]">
            {data?.CardDescription ??
              `Frustrated by the isolating job hunt? We are too. That&apos;s why we
            built a platform that empowers applicants with a supportive
            community, celebrates companies with good hiring practices, and
            equips everyone with free resources.`}
          </p>
          <Link
            href="/who-we-are"
            className="mt-[24px] flex items-center gap-[4px]"
          >
            <p className="font-[700] text-[#0D3276]">Know more</p>
            <Image src={rigtharrow} alt="arrow icon" width={24} height={24} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnvielingMission;
