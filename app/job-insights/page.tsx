import BlogListSection from "@/components/pages/JobInsights/BlogListSection";
import Hero from "@/components/pages/JobInsights/Hero";
import { fetchDataBySlug } from "@/lib/services/storyblok";
import { trackPageVisit } from "@/lib/services/Tracking/tracking";
// import { getStoryblokApi } from "@storyblok/react/rsc";
import React from "react";

const JobInsights = async () => {



  const { data }: { data: any } = await fetchData();
  const { data: BlogListingData }: { data: any } =
    await fetchDataBySlug("blog-listing");
  // console.log(BlogListingData,"tags")
  return (
    <>
      <Hero data={BlogListingData?.story?.content} />
      <BlogListSection tags={data?.tags || []} />
    </>
  );
};

export default JobInsights;

// async function fetchData(): Promise<{ data: any }> {
//   let sbParams: { version: "published" | "draft" } = { version: "published" };

//   const storyblokApi = getStoryblokApi();
//   if (!storyblokApi) {
//     return { data: {} as any };
//   }
//   const response = await storyblokApi.get(`cdn/tags`, sbParams, {
//     cache: "force-cache",
//   });

//   // return { data: {} as StoryblokData };

//   return { data: response?.data ?? ({} as any) };
// }

async function fetchData(): Promise<{ data: any }> {
  const baseURL = "https://api.storyblok.com/v2/cdn/tags";
  const token = process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN;
  // const version = "published";

  const url = `${baseURL}?token=${token}`;

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
    return { data };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: {} as any };
  }
}



