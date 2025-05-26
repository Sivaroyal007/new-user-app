import Hero from "@/components/pages/UsGovtFinancialSupport/Hero";
import MapSection from "@/components/pages/UsGovtFinancialSupport/MapSection";
import UnemploymentBenefitsByDistricts from "@/components/pages/UsGovtFinancialSupport/UnemploymentBenefitsByDistricts";
import { fetchDataBySlug, StoryblokData } from "@/lib/services/storyblok";
import { trackPageVisit } from "@/lib/services/Tracking/tracking";
import { getStoryblokApi } from "@storyblok/react/rsc";
import { Metadata } from "next/types";
import { useEffect } from "react";

export async function generateMetadata(): Promise<Metadata> {
  const { data }: { data: StoryblokData } = await fetchDataBySlug("financial-support");
  // console.log(data?.story?.content?.SeoDescription,"description")

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

export default async function UsGovtFinancialSupport() {



  const { data }: { data: StoryblokData } =
    await fetchDataBySlug("financial-support");

  const EmploymentData = data?.story?.content;
  return (
    <>
      <Hero data={EmploymentData} />
      <MapSection data={EmploymentData} />
      <UnemploymentBenefitsByDistricts data={EmploymentData} />
    </>
  );
}
