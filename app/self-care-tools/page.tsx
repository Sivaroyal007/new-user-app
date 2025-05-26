import Hero from "@/components/pages/SelfCareTools/Hero";
import OnlineTherapyProviders from "@/components/pages/SelfCareTools/OnlineTherapyProviders";
import Testimonial from "@/components/pages/SelfCareTools/Testimonial";
import WaysToProtectMentalHealth from "@/components/pages/SelfCareTools/WaysToProtectMentalHealth";
import { fetchDataBySlug, StoryblokData } from "@/lib/services/storyblok";
import { trackPageVisit } from "@/lib/services/Tracking/tracking";
import { getStoryblokApi } from "@storyblok/react/rsc";
import { Metadata } from "next/types";
import { useEffect } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { data }: { data: StoryblokData } = await fetchDataBySlug("self-care");

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


export default async function SelfCareTools() {



  const { data }: { data: StoryblokData } = await fetchDataBySlug("self-care");

  const selfCareToolsData = data?.story?.content;
  // console.log(selfCareToolsData,":data")
  return (
    <>
      <Hero data={selfCareToolsData} />
      <OnlineTherapyProviders data={selfCareToolsData} />
      <WaysToProtectMentalHealth data={selfCareToolsData} />
      <Testimonial data={selfCareToolsData} />
    </>
  );
}
