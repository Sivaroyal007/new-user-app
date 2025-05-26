import Typography from "@/components/ui/typography";
import {
  capitalizeFirstLetterOfEveryWord,
  formatCurrency,
  formatDate,
  timeDifference,
} from "@/lib/Config";
import React from "react";

type JobCardProps = {
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
  };
};

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  // const test = "Fulltime";
  // const isJobActive = test === "Fulltime" ? true : false;
  return (
    <section className="jobCard relative flex w-full justify-between">
      <div className="w-full leading-[24px]">
        <div className="flex w-full justify-between">
          <div className={`activeButton leading-[24px]`}>
            {capitalizeFirstLetterOfEveryWord(job?.jobType)}
          </div>
          <Typography
            variant={"p"}
            className="text-[14px] font-[500] leading-[27px] text-gray-normal"
          >
            {timeDifference(job?.createdAt)}
          </Typography>
        </div>
        <div className="mt-[12px] flex items-end gap-[12px]">
          <Typography
            variant={"h2"}
            className="text-[18px] leading-[27px] md:text-[24px] md:leading-[36px]"
          >
            {capitalizeFirstLetterOfEveryWord(job?.jobTitle)}
          </Typography>
        </div>
        <Typography
          variant={"p"}
          className="mt-[2px] font-[700] leading-[21px] text-label-gray md:leading-[24px]"
        >
          {capitalizeFirstLetterOfEveryWord(job?.companyName)}
        </Typography>
        <div className="mt-[24px] flex w-full">
          {/* <div className="flex flex-col sm:flex-row gap-x-[40px] md:gap-[90px] gap-y-[16px]"> */}
          <div className="flex w-1/2 flex-col gap-[4px]">
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
          {/* <div>
              <p className="text-[#434343] font-[700] text-[14px] md:text-[16px]">
                {capitalizeFirstLetterOfEveryWord(job?.jobType)}
              </p>
              <p className="font-[500] text-[#A2A2A2] text-[14px]">Job type</p>
            </div> */}
          {/* </div> */}

          <div className="flex w-1/2 flex-col gap-x-[40px] gap-y-[16px] sm:flex-row md:gap-[90px]">
            <div>
              <p className="text-[14px] font-[700] text-[#434343] md:text-[16px]">
                {capitalizeFirstLetterOfEveryWord(
                  job?.workPlaceType === "onsite"
                    ? job?.jobLocation
                    : job?.workPlaceType,
                )}
              </p>
              <p className="text-[14px] font-[500] text-[#A2A2A2]">
                Job Location
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobCard;
