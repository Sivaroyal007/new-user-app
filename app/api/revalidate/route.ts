export const dynamic = "force-dynamic"; // defaults to auto
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET(request: Request) {
  try {
    revalidatePath("/", "page");
    // revalidateTag("storyblok");
    revalidatePath("/us-govt-financial-support", "page");
    revalidatePath("/job-insights", "page");
    revalidatePath("/ai-tools", "page");
    revalidatePath("/self-care-tools", "page");
    revalidatePath("/career-fairs", "page");
    revalidatePath("/who-we-are", "page");
    revalidatePath("/job-insights/[slug]", "page");
    return Response.json({ success: true });
  } catch (e: any) {
    return Response.json({ success: false, error: e.message });
  }
}

export async function POST(request: Request) {
  try {
    // revalidatePath("/", "layout");
    // revalidateTag("storyblok");
    revalidatePath("/", "page");
    revalidatePath("/us-govt-financial-support", "page");
    revalidatePath("/job-insights", "page");
    revalidatePath("/ai-tools", "page");
    revalidatePath("/self-care-tools", "page");
    revalidatePath("/career-fairs", "page");
    revalidatePath("/who-we-are", "page");
    revalidatePath("/job-insights/[slug]", "page");
    return Response.json({ success: true });
  } catch (e: any) {
    return Response.json({ success: false, error: e.message });
  }
}
