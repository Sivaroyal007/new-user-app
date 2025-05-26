"use server";

import {
  apiPlugin,
  getStoryblokApi,
  RichTextSchema,
  storyblokInit,
} from "@storyblok/react";

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  richText: {
    schema: RichTextSchema,
  },
});

const baseURL = "https://api.storyblok.com/v2/cdn/stories";
const token = process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN;
const version = "published";

// export async function fetchDataByTag(tagParam: string): Promise<{ data: any }> {
//   console.log("Fetching data for slug:", tagParam);

//   let sbParams: {
//     version: "published" | "draft";
//     with_tag: string;
//     starts_with?: string;
//     per_page?: number;
//   } = {
//     version: "published",
//     starts_with: "blog/",
//     with_tag: tagParam,
//     per_page: 100,
//   };
//   // let sbParams: { version: "published" | "draft", starts_with?: string } = { version: "published", starts_with: 'blog/' };

//   const storyblokApi = getStoryblokApi();
//   if (!storyblokApi) {
//     throw new Error("Storyblok API client is not initialized");
//   }

//   try {
//     const response = await storyblokApi.get(`cdn/stories`, sbParams, {
//       cache: "force-cache",
//       next: { tags: ["storyblok"] },
//     });
//     return { data: response?.data ?? ({} as any) };
//   } catch (error: any) {
//     console.error("Error fetching blog data:", error);
//     throw new Error("Failed to fetch blog data");
//   }
// }
export async function fetchDataByTag(tagParam: string): Promise<{ data: any }> {
  console.log("Fetching data for tag:", tagParam);

  const startsWith = "blog/";
  const perPage = 100;

  const url = `${baseURL}?token=${token}&version=${version}&starts_with=${startsWith}&with_tag=${tagParam}&per_page=${perPage}`;

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
  } catch (error: any) {
    console.error("Error fetching blog data:", error);
    throw new Error("Failed to fetch blog data");
  }
}

// export async function fetchAllBlogs(): Promise<{ data: any }> {
//   let sbParams: {
//     version: "published" | "draft";
//     starts_with?: string;
//     per_page?: number;
//   } = {
//     version: "published",
//     starts_with: "blog/",
//     per_page: 100,
//   };

//   const storyblokApi = getStoryblokApi();
//   if (!storyblokApi) {
//     throw new Error("Storyblok API client is not initialized");
//   }

//   try {
//     const response = await storyblokApi.get(`cdn/stories`, sbParams, {
//       cache: "force-cache",
//     });
//     return { data: response?.data ?? ({} as any) };
//   } catch (error: any) {
//     console.error("Error fetching blog data:", error);
//     throw new Error("Failed to fetch blog data");
//   }
// }

// static pages
export async function fetchAllBlogs(): Promise<{ data: any }> {
  const startsWith = "blog/";
  const perPage = 100;

  const url = `${baseURL}?token=${token}&version=${version}&starts_with=${startsWith}&per_page=${perPage}`;

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
  } catch (error: any) {
    console.error("Error fetching blog data:", error);
    throw new Error("Failed to fetch blog data");
  }
}

export type StoryblokData = {
  story: {
    content: any;
  };
};

type FetchDataResult = Promise<{ data: StoryblokData }>;

// export async function fetchDataBySlug(
//   slug: string,
// ): Promise<{ data: StoryblokData }> {
//   let sbParams: { version: "published" | "draft" } = { version: "published" };

//   const storyblokApi = getStoryblokApi();
//   if (!storyblokApi) {
//     return { data: {} as StoryblokData };
//   }
//   const response = await storyblokApi.get(`cdn/stories/${slug}`, sbParams, {
//     cache: "force-cache",
//   });

//   const data = response?.data ?? ({} as StoryblokData);

//   return { data };
// }

export async function fetchDataBySlug(
  slug: string,
): Promise<{ data: StoryblokData }> {
  const BASE_URL = "https://api.storyblok.com/v2/cdn/stories/";

  const url = `${BASE_URL}${slug}?token=${token}&version=${version}`;

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
    // console.log(data,"data1")
    return { data: data as StoryblokData };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { data: {} as StoryblokData };
  }
}
