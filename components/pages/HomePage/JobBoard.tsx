import { josh } from "@/app/fonts";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const JobBoard = ({ data }: any) => {
  // console.log(data)

  return (
    <section className="mb-[100px] w-full">
      <h2
        className={` ${josh.className} text-center text-[32px] font-[600] leading-[52px] text-[#121212] md:text-[40px]`}
      >
        { data?.JobBoardTitle ?? `For more local jobs and opportunities visit`}
      </h2>

      <div className="mt-[48px] grid w-full grid-cols-1 gap-[8px] sm:grid-cols-3">
        {data?.JobBoard?.map((item: any) => (
          <Link
            href={`${item?.Link}`}
            target="_blank" rel="noopener noreferrer"
            key={item?._uid}
            className={`group flex min-h-[80px] w-full cursor-pointer justify-between rounded-[14px] border-2 p-[16px] transition-all duration-200 hover:border-2 hover:border-primary`}
            style={{ boxShadow: "0px 8px 35px 0px #0000000A" }}
          >
            <h3 className="flex items-center justify-center text-[18px] md:text-[20px] font-[500] text-[#170F49]">
              {item?.Name ?? ""}
            </h3>
            <div className="flex items-center justify-center">
              <ChevronRightIcon
                strokeWidth="1.25"
                className="flex size-[30px] shrink-0 cursor-pointer items-center justify-center rounded-full p-1 text-[#9CABC7] transition-all duration-200 group-hover:bg-primary group-hover:text-white"
              />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default JobBoard;
