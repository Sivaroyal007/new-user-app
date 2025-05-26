"use client";

import Image from "next/image";
import whoWeAreImg from "@/assets/who-we-are/ourStory.png";
import { josh } from "@/app/fonts";
import NorthAmericaMap from "./ReactSimpleMap/NorthAmericaMap";
import USMapWithStates from "./ReactSimpleMap/NorthAmericaMap";

const fallbackData = [
  {
    Heading: "Unemployment benefits by state",
    Description: `Our mission is to revolutionize the way people think about sustainability. We are committed to designing and manufacturing products that reduce environmental impact, `,
    // Image: { filename: whoWeAreImg },
  },
  {
    Heading: "Welfare benefits by state",
    Description: `Our mission is to revolutionize the way  people think about sustainability. We are committed to designing and manufacturing products that reduce environmental impact,`,
    // Image: { filename: whoWeAreImg },
  },
];

const MapSection = ({ data }: any) => {
  const sectionData = fallbackData;
  return (
    <div className="px-5 md:px-[5vw]">
      <div className="mt-[65px] flex flex-col items-center justify-center gap-y-6 md:gap-[10px] md:gap-y-[20px] lg:flex-row lg:gap-x-12 lg:gap-y-0 xl:gap-x-28">
        <div className="md:max-w-1/2 flex w-full items-center justify-center">
          <USMapWithStates />
        </div>
        <div className="md:w-50% w-full space-y-2">
          <h2
            className={`${josh.className} text-2xl font-semibold leading-[31px] text-brand-black md:text-[40px] md:leading-[52px]`}
          >
            {data?.UnemploymentHeading ?? sectionData[0]?.Heading}
          </h2>
          <p className="mt-[] leading-6 text-gray-normal">
            {data?.UnemploymentDescription ?? sectionData[0].Description}
          </p>
        </div>
      </div>

      <div className="my-[64px] flex flex-col items-center justify-center gap-y-6 md:gap-[10px] md:gap-y-[20px] lg:my-[108px] lg:flex-row-reverse lg:gap-x-12 lg:gap-y-0 xl:gap-x-24">
        <div className="md:max-w-1/2 flex w-full items-center justify-center">
          <USMapWithStates />
        </div>
        <div className="md:max-w-50% w-full space-y-2">
          <h2
            className={`${josh.className} text-2xl font-semibold leading-[31px] text-brand-black md:text-[40px] md:leading-[52px]`}
          >
            {data?.WelfareHeading ?? sectionData[1]?.Heading}
          </h2>
          <p className="mt-[] leading-6 text-gray-normal">
            {data?.WelfareDescription ?? sectionData[1].Description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MapSection;
