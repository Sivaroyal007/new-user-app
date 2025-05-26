import { NextResponse } from "next/server";
import { fetchAllBlogs } from "@/lib/services/storyblok";

export async function GET() {
  const BASE_URL = process.env.NEXT_PUBLIC_FRONTEND_URL;

  const blogs = await fetchAllBlogs();



  // Start constructing the XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n`;

  // Add listing page
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}/job-insights</loc>\n`;
  xml += `    <lastmod>${new Date().toISOString()}</lastmod>\n`;
  xml += `  </url>\n`;

  // Add blog entries
  blogs?.data?.stories?.forEach((blog: { slug: string; created_at: string; content: any }) => {
    const imageUrl = blog.content?.Image?.filename || null;

    xml += `  <url>\n`;
    xml += `    <loc>${BASE_URL}/job-insights/${blog.slug}</loc>\n`;
    xml += `    <lastmod>${new Date(blog.created_at).toISOString()}</lastmod>\n`;
    if (imageUrl) {
      xml += `    <image:image>\n`;
      xml += `      <image:loc>${imageUrl}</image:loc>\n`;
      xml += `    </image:image>\n`;
    }
    xml += `  </url>\n`;
  });

  xml += `</urlset>\n`;




  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
