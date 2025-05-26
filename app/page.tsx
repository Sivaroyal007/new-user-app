import JobListSection from "@/components/pages/HomePage/JobListSection";
import { josh } from "./fonts";
import HeroWrapper from "@/components/wrapper/HeroWrapper";
import { Suspense } from "react";
import { Metadata } from "next/types";
import { fetchDataBySlug, StoryblokData } from "@/lib/services/storyblok";
import UnvielingMission from "@/components/pages/HomePage/UnvielingMission";
import JobSearchIntel from "@/components/pages/HomePage/JobSearchIntel";
import JobBoard from "@/components/pages/HomePage/JobBoard";
import Head from "next/head";
import Image from "next/image";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  if (searchParams.tab === "review") {
    return {
      title: "The Job Applicant Perspective Review Section",
      description:
        "connect anonymously, share insights and share your experience with the job application process",
    };
  }
  if (searchParams.tab === "classified") {
    return {
      title: "The Job Applicant Perspective Classified Section",
      description: "find job opportunities near you",
    };
  }
  const { data }: { data: StoryblokData } = await fetchDataBySlug("home");
  return {
    title: data?.story?.content?.SeoTitle || "The Job Applicant Perspective",
    description:
      data?.story?.content?.SeoDescription || "The Job Applicant Perspective",
    openGraph: {
      images: [`${data?.story?.content?.SeoImage?.filename}`],
      title: data?.story?.content?.SeoTitle || "The Job Applicant Perspective",
      description:
        data?.story?.content?.SeoDescription || "The Job Applicant Perspective",
      // url: 'https://www.yoursite.com',
      siteName: "The Job Applicant Perspective",
      // type: 'website',
    },
  };
}

export default async function Home() {
  const { data }: { data: StoryblokData } = await fetchDataBySlug("home");
  console.log(data?.story?.content?.BannerMobile?.filename, "imagename");
  return (
    <>
      <HeroWrapper>
        <div className="flex w-full items-center justify-center bg-transparent px-[5vw] pt-[145px] lg:pt-[124px]">
          <div className="mb-[56px] w-full max-w-[699px] text-center md:mb-[89px] lg:mt-[71px]">
            <h1
              className={`${josh.className} text-[32px] font-[700] leading-[46px] tracking--2pct text-[#121212] lg:text-[64px] lg:leading-[92px]`}
            >
              {data?.story?.content?.Title ?? `Empower your job hunt`}
            </h1>
            <p className="mt-[8px] text-[14px] font-[400] text-[#434343] lg:text-[18px]">
              {data?.story?.content?.Description ??
                `connect anonymously, share insights and give yourself the
              emotional support and strategies needed to thrive as modern job
              seeker`}
            </p>
          </div>
        </div>
      </HeroWrapper>
      <div className="px-[5vw]">
        <Suspense fallback={<div></div>}>
          <JobListSection />
        </Suspense>

        <div className="mb-[54px] w-full md:mb-[80px]">
          {(data?.story?.content?.BannerMobile &&
          data?.story?.content?.BannerDesktop) ? (
            <>
              <Image
                src={data?.story?.content?.BannerMobile?.filename}
                alt="banner image"
                width={350}
                height={180}
                className="w-full md:hidden"
              />
              <Image
                src={data?.story?.content?.BannerDesktop?.filename}
                alt="banner image"
                width={1220}
                height={160}
                className="hidden w-full md:block"
              />
            </>
          ) : (
            ""
          )}
        </div>

        <div>
          <JobBoard data={data?.story?.content} />
        </div>
      </div>
      <div className="bg-secondary-gradient">
        <UnvielingMission data={data?.story?.content} />
      </div>
      <JobSearchIntel titleData={data?.story?.content} />
    </>
  );
}
