import type { Metadata } from "next";

import "./globals.css";
import MainLayout from "@/components/layouts/MainLayout";

import ReactQueryProvider from "@/lib/providers/ReactQueryProvider";
import { Toaster } from "@/components/ui/toaster";
import { JobProvider } from "@/lib/context/JobContext";
import { ReviewProvider } from "@/lib/context/ReviewContext";
import icon4 from "@/public/192_192.png";
import { manrope } from "./fonts";
import { storyblokInit, apiPlugin, RichTextSchema } from "@storyblok/react/rsc";
// import StoryblokProvider from "@/components/StoryblokProvider";
import Footer from "@/components/layouts/Footer";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import Head from "next/head";

import Script from "next/script";


storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  richText: {
    schema: RichTextSchema,
  },
});

export const metadata: Metadata = {
  title: "The Job Applicant Perspective",
  description: "The Job Applicant Perspective ",
  icons: {
    icon: icon4.src,
  },
  // manifest: "/manifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <meta property="og:title" content="The Job Applicant Perspective" />
        <meta property="og:type" content="article" />

        <meta property="og:locale" content="The Job Applicant Perspective" />
        <meta
          property="og:site_name"
          content="The Job Applicant Perspective "
        />
      </Head>
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8039834515015004"
        crossOrigin="anonymous"
        strategy="lazyOnload"
        // strategy="afterInteractive"
      />

      {/* <head>
        <AdSense />
      </head> */}

      <GoogleAnalytics
        gaId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_TOKEN || ""}
      />
      <body className={manrope.className}>
        <ReactQueryProvider>
          <JobProvider>
            <ReviewProvider>
              {/* <BlogProvider> */}
              {/* <StoryblokProvider> */}
              <MainLayout className="">{children}</MainLayout>
              <footer className="w-full">
                <Footer />
              </footer>
              <Toaster />
              {/* </StoryblokProvider> */}
              {/* </BlogProvider> */}
            </ReviewProvider>
          </JobProvider>
        </ReactQueryProvider>
      </body>
     
    </html>
  );
}
