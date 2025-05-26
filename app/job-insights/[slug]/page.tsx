import HeroWrapper from "@/components/wrapper/HeroWrapper";
import React, { useEffect } from "react";

import Image from "next/image";
import backicon from "@/assets/icons/backicon.svg";
import blogImage from "@/assets/job-insights/blog1.png";

import {
  apiPlugin,
  getStoryblokApi,
  RichTextSchema,
  storyblokInit,
} from "@storyblok/react/rsc";
import BlogDetails from "@/components/pages/JobInsights/BlogDetails";
import { fetchAllBlogs, fetchDataByTag } from "@/lib/services/storyblok";
import { trackPageVisit } from "@/lib/services/Tracking/tracking";
import { Metadata, ResolvingMetadata } from "next/types";

export const dynamicParams = true;

type Props = {
  params: { slug: string }
  
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // const { data }: { data: StoryblokData } = await fetchDataBySlug("self-care");
  const { data }: { data: any } = await fetchData(params?.slug);

  return {
    title: data?.story?.content?.SeoTitle || "",
    description: data?.story?.content?.SeoDescription || "",
    openGraph: {
      images: [`${data?.story?.content?.Image?.filename}`],
      title: data?.story?.content?.SeoTitle || "",
      description: data?.story?.content?.SeoDescription || "",
      // url: 'https://www.yoursite.com',
      siteName: 'The Job Applicant Perspective',
      // type: 'website',
    },
  };
}

export async function generateStaticParams() {
  const { data }: { data: any } = await fetchAllBlogs();
  const stories = data?.stories || [];
  // console.log(stories)

  return stories.map((blog: any) => ({
    slug: blog.slug,
  }));
}

const BlogPage = async ({ params }: { params: { slug: string } }) => {



  // console.log(params.slug, "SLUG1");
  const { data }: { data: any } = await fetchData(params?.slug);
  // console.log(data, "blog data response");

  return (
    <>
      <HeroWrapper className="h-[70px] lg:h-[124px]">
        <div className="flex w-full items-center justify-center bg-transparent px-[5vw] pt-[145px] lg:pt-[124px]" />
      </HeroWrapper>
      <BlogDetails data={data?.story} />
    </>
  );
};

export default BlogPage;



type StoryblokData = {
  story: {
    content: any;
  };
};

type FetchDataResult = Promise<{ data: StoryblokData }>;

async function fetchData(slug: string): Promise<{ data: StoryblokData }> {
  // console.log("Fetching data for slug in page:", slug);

  const baseURL = "https://api.storyblok.com/v2/cdn/stories/blog/";
  const token = process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN;
  const version = "published";

  const url = `${baseURL}${slug}?token=${token}&version=${version}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return { data: data as StoryblokData };
  } catch (error: any) {
    console.error("Error fetching blog data:", error);
    throw new Error("Failed to fetch blog data");
  }
}



