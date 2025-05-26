import { fetchAllBlogs } from "@/lib/services/storyblok";
import { MetadataRoute } from "next";

export default async function sitemap({
  id,
}: {
  id: number;
}): Promise<MetadataRoute.Sitemap> {
  const BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

  const blogs = await fetchAllBlogs();

  // Create sitemap entries with images
  const blogSitemap = blogs?.data?.stories?.map(
    (blog: { slug: string; created_at: string; content: any }) => {
      // Extract image URL if available
      const imageUrl = blog.content?.Image?.filename || null;

      return {
        url: `${BASE_URL}/job-insights/${blog.slug}`,
        lastModified: new Date(blog.created_at).toISOString(),
        // Add image data
        images: imageUrl ? [{ url: imageUrl }] : [],
      };
    },
  );

  const listingPage = {
    url: `${BASE_URL}/job-insights`,
    lastModified: new Date().toISOString(),
  };

  return [listingPage, ...(blogSitemap || [])];
}
