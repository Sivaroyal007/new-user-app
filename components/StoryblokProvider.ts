"use client";

import { storyblokInit, apiPlugin, RichTextSchema } from "@storyblok/react/rsc";
import AboutUs from '@/components/pages/WhoWeAre/AboutUs';

const components = {
  // "About us Content": AboutUs,
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  richText: {
    schema: RichTextSchema
  }
});

export default function StoryblokProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
