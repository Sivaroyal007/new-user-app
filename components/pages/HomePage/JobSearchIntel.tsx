import { josh } from "@/app/fonts";
import Link from "next/link";
import React from "react";
import Image from "next/image";

import rigtharrow from "@/assets/career-fairs/rightarrow.svg";
import { fetchDataByTag } from "@/lib/services/storyblok";
import BlogCard from "../JobInsights/BlogCard";
import { title } from "process";

const JobSearchIntel = async ({ titleData }: any) => {
  const { data }: { data: any } = await fetchDataByTag("");
  // console.log(data?.stories,"DATATEST")

  const latestBlogs = data?.stories?.slice(0, 3) || [];
  return (
    <section className="px-[5vw] py-[64px] md:py-[130px]">
      <div className="flex flex-col items-center justify-center gap-x-16 md:flex-row">
        <div className="md:max-w-1/2 w-full">
          <h1
            className={` ${josh.className} mt-[24px] text-[32px] font-[600] leading-[41px] text-[#121212] md:mt-0 md:text-[48px] md:leading-[62px]`}
          >
            {titleData?.BlogSectionTitle ?? `Job search intel and insights`}
          </h1>
        </div>

        <div className="md:max-w-1/2 w-full">
          <p className="mt-[8px] text-[#7C7C7C] md:mt-0">
            {titleData?.BlogSectionDescription ??
              `Wondering what others face? Explore anonymous stories from job
            seekers like you. Get a dose of reality, laugh, connect, and gain
            valuable insights on your path to landing your dream job!`}
          </p>
          <Link
            href="/job-insights"
            className="mt-[14px] flex items-center gap-[4px]"
          >
            <p className="font-[700] text-[#0D3276]">Read all</p>
            <Image src={rigtharrow} alt="arrow icon" width={24} height={24} />
          </Link>
        </div>
      </div>

      <div className="mt-[40px] md:mt-[64px]">
        <div className=" grid grid-cols-1 gap-x-[32px] gap-y-[24px] md:grid-cols-2 lg:grid-cols-3">
          {latestBlogs.length > 0 ? (
            latestBlogs.map((blog: any) => (
              <Link
                key={blog?._uid}
                href={`job-insights/${blog?.slug}`}
                className=""
              >
                <BlogCard key={blog.id} blog={blog} />
              </Link>
            ))
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default JobSearchIntel;
