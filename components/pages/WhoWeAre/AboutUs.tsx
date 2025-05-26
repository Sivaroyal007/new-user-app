import { josh } from "@/app/fonts";
import Image from "next/image";
import whoWeAreImg from "@/assets/who-we-are/ourStory.png";
import unvielingOurMission from "@/assets/who-we-are/unvielingOurMission.png";

import { storyblokEditable, StoryblokComponent } from "@storyblok/react";

export default function AboutUs({data}:any) {

  const fallbackData = [
    {
      Heading: "Our Story",
      Description: `Our mission is to revolutionize the way people think about
        sustainability. We are committed to designing and manufacturing
        products that reduce environmental impact, promote healthy living,
        and inspire change. We believe that small steps can lead to big
        changes, and we strive to empower our customers to make those steps
        with confidence.`,
      Image: {filename:whoWeAreImg},
    },
    {
      Heading: "Unveiling Our Mission",
      Description: `Our mission is to revolutionize the way people think about
        sustainability. We are committed to designing and manufacturing
        products that reduce environmental impact, promote healthy living,
        and inspire change. We believe that small steps can lead to big
        changes, and we strive to empower our customers to make those steps
        with confidence.`,
        Image: {filename:whoWeAreImg},
    },
  ];

  // Use the provided data if available, otherwise use fallback data
  const sectionData = data && data.length ? data : fallbackData;
  return (
    <div className="space-y-16 px-5 pb-[102px] pt-[70px] md:space-y-[120px] md:px-[5vw] md:pb-[120px] md:pt-20">
      <div className="flex flex-col items-center justify-center gap-y-6 md:flex-row md:gap-x-28 md:gap-y-0 ">
        <Image src={sectionData[0]?.Image?.filename} width={573} height={382} alt="our story image" className="md:w-full md:max-w-1/2"/>
        <div className="space-y-2 md:w-full md:max-w-1/2">
          <h2
            className={`${josh.className} text-2xl font-semibold text-brand-black md:text-[40px]`}
          >
              {sectionData[0]?.Heading}
          </h2>
          <p className="leading-6 text-gray-normal">
          {sectionData[0].Description}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center gap-y-6 md:flex-row md:gap-x-24 md:gap-y-0">
        <div className="space-y-2 md:w-full md:max-w-1/2">
          <h2
            className={`${josh.className} text-2xl font-semibold text-brand-black md:text-[40px]`}
          >
              {sectionData[1]?.Heading}{" "}
          </h2>
          <p className="leading-6 text-gray-normal">
          {sectionData[1].Description}
          </p>
        </div>
        <Image src={sectionData[1]?.Image?.filename} width={573} height={382} alt="unvieling our mission image" className="md:w-full md:max-w-1/2" />
      </div>
    </div>
  );
}
