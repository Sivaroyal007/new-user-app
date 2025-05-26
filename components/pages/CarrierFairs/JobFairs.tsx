"use client";

import { josh } from "@/app/fonts";
import {
  Accordion,
  AccordionContent,
  AccordionHeading,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React, {  useState } from "react";
import PopupCard from "./PopupCard";

export default function JobFairs({ data }: any) {
  const [isInfoDrawerOpen, setIsInfoDrawerOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<any>({});


  const handleCardClick = (id: string) => {
    const selectedData = data?.States?.find((item: any) => item?._uid === id);
    //    const selectedData = {}
    if (selectedCard) {
      setSelectedCard(selectedData);

      setIsInfoDrawerOpen(true);
    }
  };

  return (
    <div className="px-[5vw] pb-10 pt-11 md:mx-auto md:pb-[64px] md:pt-16">
      <div className="space-y-10 md:space-y-[72px]">
        <div className="flex flex-col gap-y-2 md:flex-row md:gap-x-[120px]">
          <h2
            className={`${josh.className} w-full text-2xl font-semibold text-brand-black md:text-[40px] leading-[31px] md:leading-[52px]`}
          >
            {data?.MenuHeading ?? "Online therapy providers"}
          </h2>
          <p className="w-full text-grayDark md:leading-6">
            {data?.MenuDescription ??
              "Explore a comprehensive list of job fairs happening across all 50 states. Find events near you, connect with top employers, and land  your dream job! Whether you're seeking in-person networking or the  convenience of virtual fairs, we've got you covered."}{" "}
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-[8px] sm:grid-cols-3">
          {data?.States?.map((item: any) => (
            <div
              key={item?._uid}
              onClick={() => {
                handleCardClick(item?._uid);
              }}
              //   className="flex min-h-[80px] w-full cursor-pointer justify-between rounded-[14px] p-[16px]"
              className={`group flex min-h-[80px]  border-2 w-full cursor-pointer justify-between rounded-[14px] p-[16px] transition-all duration-200 hover:border-2 hover:border-primary`}
              style={{ boxShadow: "0px 8px 35px 0px #0000000A" }}
            >
              <h3 className="flex items-center justify-center text-[18px] md:text-[20px] font-[500] text-[#170F49]">
                {item?.Heading ?? ""}
              </h3>
              <div className="flex items-center justify-center">
                <ChevronRightIcon
                  strokeWidth="1.25"
                  className="flex size-[30px] shrink-0 cursor-pointer items-center justify-center rounded-full p-1 text-[#9CABC7] transition-all duration-200 group-hover:bg-primary group-hover:text-white"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <PopupCard
        isOpen={isInfoDrawerOpen}
        handleOpenChange={setIsInfoDrawerOpen}
        selectedCard={selectedCard}
      />
    </div>
  );
}
