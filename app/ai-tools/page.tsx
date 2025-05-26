

import Hero from "@/components/pages/AiTools/Hero";
import JobHuntingMenu from "@/components/pages/AiTools/JobHuntingMenu";
import { fetchDataBySlug, StoryblokData } from "@/lib/services/storyblok";
import { trackPageVisit } from "@/lib/services/Tracking/tracking";
import { getStoryblokApi } from "@storyblok/react/rsc";
import { Metadata } from "next/types";
import { useEffect } from "react";


export async function generateMetadata(): Promise<Metadata> {
  const { data }: { data: StoryblokData } = await fetchDataBySlug("ai-tools");

  return {
    title: data?.story?.content?.SeoTitle || "",
    description: data?.story?.content?.SeoDescription || "",
    openGraph: {
      images: [`${data?.story?.content?.Image?.filename}`],
      title: data?.story?.content?.SeoTitle || "",
      description: data?.story?.content?.SeoDescription || "",
      // url: 'https://www.yoursite.com',
      // siteName: 'The Job Applicant Perspective',
      // type: 'website',
    },
  };
}

export default async function AiTools() {
  const { data }: { data: StoryblokData } = await fetchDataBySlug("ai-tools");



  const aiToolsData = data?.story?.content;
  return (
    <>
      <Hero data={aiToolsData} />
      <JobHuntingMenu data={aiToolsData} />
    </>
  );
}
