"use client";
import { josh } from "@/app/fonts";
import {
  Accordion,
  AccordionContent,
  AccordionHeading,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export default function JobHuntingMenu({ data }: any) {
  // console.log(data.Sections,"data")
  return (
    <div className="px-[5vw] pb-[90px] pt-11 md:pb-[160px] md:pt-16">
      <div className="space-y-10 md:mx-auto md:space-y-[72px]">
        <div className="flex flex-col gap-y-2 md:flex-row md:gap-x-[120px]">
          <h2
            className={`${josh.className} w-full text-2xl font-semibold text-brand-black md:text-[40px] leading-[31px] md:leading-[52px]`}
          >
            {data?.MenuHeading ?? "Our AI job hunting menu"}
          </h2>
          <p className="w-full text-grayDark md:leading-6">
            {data?.MenuDescription ??
              "Our mission is to revolutionize the way people think about sustainability. We are committed to designing and manufacturing products that reduce environmental impact,"}
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {data?.Sections?.map((item: any) => (
            <AccordionItem value={item?.Heading} key={item?._uid}>
              <AccordionTrigger>
                <AccordionHeading className="items-center mb-0 ">
                  {item?.Heading ??
                    "What is your favorite template from BRIX Templates?"}
                </AccordionHeading>
                <AccordionContent className="cursor-default">
                 <div className="mt-[16px] md:mt-[48px] flex flex-col gap-[48px]">
                {item?.Tools?.map((tool:any) => (
                  <div key={tool?._uid}>
                   <Link href={tool?.Link} 
                   target="_blank"  rel="noopener noreferrer"
                   className="text-[18px] md:text-[20px] font-[600] text-[#170F49] ">
                    {tool?.Heading ?? ""}
                  </Link>
                  <p className="text-[16px] md:text-[18px] font-[400] leading-7 text-[#6F6C90] my-[16px]">
                    {tool?.Description ?? ""}
                  </p>
                  <h6 className="text-[16px] font-[500] text-[#170F49]">Cost:{" "} {tool?.Cost ?? ""} </h6>
                  </div>
                ))}
                 </div>
                </AccordionContent>
              </AccordionTrigger>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
