import HeroContentPrivacy from "@/components/pages/PrivacyPolicy/HeroContentPrivacy";
import { fetchDataBySlug, StoryblokData } from "@/lib/services/storyblok";
import { trackPageVisit } from "@/lib/services/Tracking/tracking";
import React, { useEffect } from "react";

const PrivacyPolicy = async () => {




    const { data }: { data: StoryblokData } = await fetchDataBySlug("privacy-policy");
    // console.log(data?.story?.content)
  return (
    <>
    <HeroContentPrivacy data={data?.story} />
    </>
  );
};

export default PrivacyPolicy;
