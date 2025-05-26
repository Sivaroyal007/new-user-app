"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import backicon from "@/assets/icons/backicon.svg";
import blogImage from "@/assets/job-insights/blog1.png";
import RichTextField from "@/lib/providers/RichTextField";
// import { renderRichText } from '@storyblok/js';
import {
  apiPlugin,
  renderRichText,
  RichTextSchema,
  storyblokInit,
} from "@storyblok/react";

import { formatDateForBlog } from "@/lib/Config";
import { trackPageVisit } from "@/lib/services/Tracking/tracking";
// import { formatDateForBlog } from '@/lib/Config';

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  richText: {
    schema: RichTextSchema,
  },
});

const BlogDetails = ({ data }: any) => {

  useEffect(() => {
    trackPageVisit('other'); 
}, []);
  const router = useRouter();

  return (
    <section className="mx-auto w-full max-w-[88vw]">
      <div className="mt-[30px] md:mt-[63px] flex w-fit items-center gap-[16px]">
        <div
          onClick={() => router.back()}
          className=" cursor-pointer gap-[4px] flex"
        >
          <Image src={backicon} alt="close icon" width={24} height={24} />
          <span className=" text-[16px] font-[700] text-primary">Go back</span>
        </div>

        <div className="hidden h-[12px] w-[1px] bg-[#8D90D5] md:flex" />

        <div className="flex gap-1">{data?.tag_list?.join(", ")}</div>
      </div>

      <h1 className="mt-[16px] text-[32px] font-[700] leading-[48px] text-[#434343]">
        {data?.content?.Heading ?? ""}
      </h1>
      <h4 className="mt-[16px] text-[14px] md:text-[20px] font-[400] md:font-[600] text-[#7C7C7C]">
        {data?.content?.SubHeading ?? ""}
      </h4>

      <div className="mt-[40px] w-full">
        <Image
          src={data?.content?.Image?.filename}
          alt="blog cover image"
          width={1206}
          height={751}
          style={{ objectFit: "cover" }}
          className="max-h-[70vh] w-full"
        />
      </div>

      <div className="mb-[82px] mt-[40px] flex justify-between gap-[28px]">
        <div className="max-w-70% w-full">
          <RichTextField data={data?.content} />
         

        </div>
        <div className="sticky top-[40px] hidden max-h-[400px] w-[20vw] rounded-[12px] border-l-[1px] md:block md:pl-[20px] md:pr-[20px] lg:pl-[60px] lg:pr-[43px]">
          <p className="text-[14px] font-[600] text-[#A2A2A2]">Written By</p>
          <p className="text-[16px] font-[600] text-[#7C7C7C]">
            {data?.content?.WrittenBy ?? ""}
          </p>

          <p className="mt-[40px] text-[14px] font-[600] text-[#A2A2A2]">
            POSTED ON
          </p>
          <p className="text-[16px] font-[600] text-[#7C7C7C]">
            {formatDateForBlog(data?.published_at)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogDetails;
