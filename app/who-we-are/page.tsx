import Hero from "@/components/pages/WhoWeAre/Hero";
import AboutUs from "@/components/pages/WhoWeAre/AboutUs";
import SupportOurMission from "@/components/pages/WhoWeAre/SupportOurMission";
import OurTeam from "@/components/pages/WhoWeAre/OutTeam";
import { getStoryblokApi } from "@storyblok/react/rsc";
import { fetchDataBySlug, StoryblokData } from "@/lib/services/storyblok";
import { useEffect } from "react";
import { trackPageVisit } from "@/lib/services/Tracking/tracking";
import { Metadata } from "next/types";
import Head from "next/head";

export async function generateMetadata(): Promise<Metadata> {
  const { data }: { data: StoryblokData } = await fetchDataBySlug("about-us");

  return {
    title: data?.story?.content?.SeoTitle || "",
    description: data?.story?.content?.SeoDescription || "",
    openGraph: {
      images: [`${data?.story?.content?.Stories[0]?.Image?.filename}`],
      title: data?.story?.content?.SeoTitle || "",
      description: data?.story?.content?.SeoDescription || "",
      // url: 'https://www.yoursite.com',
      siteName: "The Job Applicant Perspective",
      // type: 'website',
    },
  };
}

export default async function WhoWeAre() {
  const { data }: { data: StoryblokData } = await fetchDataBySlug("about-us");
  // console.log(data.story?.content?.Heading, "DATA FROM STORYBLOK");
  const aboutUsData = data?.story?.content;
  return (
    <>
      {/* <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8039834515015004"
          crossOrigin="anonymous"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `(adsbygoogle = window.adsbygoogle || []).push({});`,
          }}
        />
      </Head> */}
      <Hero data={aboutUsData?.Heading} />
      <AboutUs data={aboutUsData?.Stories} />
      <SupportOurMission data={aboutUsData} />
      <OurTeam data={aboutUsData} />
    </>
  );
}
