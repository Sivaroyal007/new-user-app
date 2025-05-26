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

export default function WaysToProtectMentalHealth({ data }: any) {
  return (
    <div className="px-[5vw] pb-10 pt-11 md:mx-auto md:pb-[64px] md:pt-16">
      <div className="space-y-10 md:space-y-[72px]">
        <div className="flex flex-col gap-y-2 md:flex-row md:gap-x-[120px]">
          <h2
            className={`${josh.className} w-full text-2xl font-semibold text-brand-black md:text-[40px] leading-[31px] md:leading-[52px]`}
          >
            {data?.MentalHealthProvidersHeading ?? "Online therapy providers"}
          </h2>
          <p className="w-full text-grayDark md:leading-6">
            {data?.MentalHealthProvidersDescription ??
              "Explore a comprehensive list of job fairs happening across all 50  states. Find events near you, connect with top employers, and land  your dream job! Whether you&apos;re seeking in-person networking or the  convenience of virtual fairs, we&apos;ve got you covered."}
          </p>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-2">
          {data?.MentalHealthProvidersCards?.map((item: any) => (
            <AccordionItem value={item?.Name} key={item?._uid}>
              <AccordionTrigger>
                <AccordionHeading className="items-center mb-0">{item?.Name || ""}</AccordionHeading>
                <AccordionContent className="flex flex-col gap-[16px]">
                  <p className="leading-7 text-[#6F6C90] md:text-lg">
                    {item?.Description || ""}
                  </p>{" "}
                  <Link
                    href={item?.Link}
                     target="_blank"  rel="noopener noreferrer"
                    className="w-fit text-[16px] font-[600] text-[#170F49]"
                  >
                    Check now
                  </Link>
                </AccordionContent>
              </AccordionTrigger>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
