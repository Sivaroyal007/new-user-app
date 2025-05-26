"use client";

import Typography from "@/components/ui/typography";
import React, { useEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import parse from "html-react-parser";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import ApplyJobForm from "@/components/forms/ApplyJobForm";
import {
  capitalizeFirstLetterOfEveryWord,
  decodeBase64,
  formatCurrency,
  formatDate,
  timeDifference,
} from "@/lib/Config";

type Side = "center" | "top" | "bottom" | "left" | "right";
type JobDetailsCardProps = {
  job: {
    _id: string;
    jobTitle: string;
    companyName: string;
    jobSalaryFrom: number;
    jobSalaryTo: number;
    jobLocation: string;
    workPlaceType: string;
    createdAt: string;
    jobType: string;
    jobDescription: string;
  };
  handleCloseJobDetailsClick: () => void;
};

const JobDetailsCard: React.FC<JobDetailsCardProps> = ({
  job,
  handleCloseJobDetailsClick,
}) => {
  const test = "Full-time";
  const isJobActive = test === "Full-time" ? true : false;
  const [side, setSide] = useState<Side>("bottom");

  const applyNowButtonRef = useRef<HTMLButtonElement>(null);
  const closeApplyNowButtonRef = useRef<HTMLButtonElement>(null);

  // console.log(job,"JOB")

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSide("center");
      } else {
        setSide("bottom");
      }
    };

    handleResize(); // Set the initial side value
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleApplyNowClick = () => {
    applyNowButtonRef.current?.click();
  };

  const handleCloseApplyFormClick = () => {
    closeApplyNowButtonRef.current?.click();
    // handleCloseJobDetailsClick()
  };

  return (
    <div className="relative w-full">
      <div className="mt-[12px] w-full leading-[24px]">
        <div className="mb-4 lg:hidden">
          <p className="text-[16px] font-[500] text-[#A2A2A2]">
            {timeDifference(job?.createdAt)}
          </p>
        </div>
        <div className="flex w-full items-end justify-between gap-[12px]">
          <Typography
            variant={"h2"}
            className="text-[24px] font-[700] leading-[36px]"
          >
            {capitalizeFirstLetterOfEveryWord(job?.jobTitle)}
          </Typography>
          <Typography
            variant={"p"}
            className="hidden font-[500] leading-[27px] text-gray-normal lg:flex"
          >
            {formatDate(job?.createdAt)}
          </Typography>
        </div>
        <Typography
          variant={"p"}
          className="mt-[2px] font-[700] leading-[21px] text-label-gray md:leading-[24px]"
        >
          {capitalizeFirstLetterOfEveryWord(job?.companyName)}
        </Typography>
        <div className="flex w-full justify-between">
          <div className="] mt-[24px] flex gap-[15px] xl:gap-x-[34px]">
            <div className="flex flex-col gap-x-[10px] gap-y-[16px] sm:flex-row xl:gap-[34px]">
              <div className="flex flex-col gap-[4px]">
                <p className="text-[14px] font-[700] text-[#434343] md:text-[16px]">
                  <span>
                    {formatCurrency(job?.jobSalaryFrom)}
                    {" - "}
                  </span>
                  <span>{formatCurrency(job?.jobSalaryTo)}</span>
                </p>
                <p className="text-[14px] font-[500] text-[#A2A2A2]">
                  Salary Range
                </p>
              </div>
              <div className="hidden flex-col gap-[4px] lg:flex">
                <p className="text-[14px] font-[700] text-[#434343] md:text-[16px]">
                  {capitalizeFirstLetterOfEveryWord(job?.jobType)}
                </p>
                <p className="text-[14px] font-[500] text-[#A2A2A2]">
                  Job type
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-x-[40px] gap-y-[16px] sm:flex-row md:gap-[90px]">
              <div className="pl-[14px] lg:pl-0">
                <p className="text-[14px] font-[700] text-[#434343] md:text-[16px]">
                  {capitalizeFirstLetterOfEveryWord(
                    job?.workPlaceType === "onsite"
                      ? job?.jobLocation
                      : job?.workPlaceType,
                  )}
                </p>
                <p className="pt-[4px] text-[14px] font-[500] text-[#A2A2A2]">
                  Job Location
                </p>
              </div>
            </div>
          </div>

          <div className="mb-3 hidden min-w-[100px] max-w-[150px] place-items-end lg:grid">
            <Sheet>
              <SheetTrigger ref={applyNowButtonRef}>
                <span className="h-[44px] rounded-[8px] bg-primary px-[10px] py-[10px] text-[14px] text-white lg:text-[16px]">
                  Apply now
                </span>
              </SheetTrigger>
              <SheetContent side={side} className=" ">
                <div>
                  <ApplyJobForm
                    handleCloseApplyFormClick={handleCloseApplyFormClick}
                    jobId={job?._id}
                    handleCloseJobDetailsClick={handleCloseJobDetailsClick}
                  />
                </div>
                <SheetClose ref={closeApplyNowButtonRef} className="hidden">
                  close
                </SheetClose>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      <Separator className="my-[24px]" />

      <div className="h-[306px] overflow-y-auto lg:h-[462px]">
        <h3 className="mb-[16px] text-[17px] font-[700] leading-[25px] text-grayDark">
          Job Description
        </h3>
        <div className="my-container text-gray-normal">
          {parse(decodeBase64(job?.jobDescription))}
        </div>
      </div>
      <div className="absolute bottom-[0px] left-0 right-0 flex w-full items-center gap-[8px] bg-white pt-3 text-[16px] font-[600] lg:hidden">
        <button
          onClick={handleCloseJobDetailsClick}
          className="h-[44px] w-full rounded-[8px] px-[20px] text-primary hover:bg-gray-100"
        >
          Close
        </button>
        <button
          onClick={handleApplyNowClick}
          className="h-[44px] w-full rounded-[8px] bg-primary px-[20px] text-white"
        >
          Apply now
        </button>
      </div>
    </div>
  );
};

export default JobDetailsCard;
