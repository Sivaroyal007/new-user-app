import { josh } from "@/app/fonts";
import React from "react";
import Image from "next/image";
import BgSquare from "@/components/common/BgSquare";
import us4 from "@/assets/us-govt-financial-support/us4.png";
import Link from "next/link";

const UnemploymentBenefitsByDistricts = ({ data }: any) => {
  return (
    <div className="relative overflow-x-hidden">
      <div className="space-y-6 bg-secondary-gradient px-[5vw] pb-[91px] pt-8 md:space-y-[64px] md:px-[116px] md:py-[79px]">
        <div className="space-y-2 text-start">
          <div className="relative z-10 flex flex-col md:flex-row md:justify-between">
            <h2
              className={`${josh.className} max-w-[528px] text-[32px] font-semibold leading-[41px] text-brand-black md:w-1/2 md:pr-1 md:text-[40px] md:leading-[52px]`}
            >
              {"Unemployment benefits by districts & territories"}
            </h2>
            <BgSquare className="left-[30%] top-0 hidden -translate-x-[24%] -translate-y-[18%] rotate-[-33.668deg] md:block" />
            <p className="text-[16px] font-medium text-[#7C7C7C] md:w-1/2 md:text-[18px] md:text-[#434343]">
              {
                "Our mission is to revolutionize the way people think about sustainability. We are committed to designing and manufacturing products that reduce environmental impact, "
              }{" "}
            </p>
          </div>
        </div>
        <div className="grid w-full grid-cols-2 place-items-center gap-x-[10px] gap-y-[16px] md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
          {data?.DistrictsCards?.map((card: any) => (
            <Link
              href={card?.Link}
              target="_blank"
              rel="noopener noreferrer"
              key={card?._uid}
              className="min-w-[163px] max-w-full rounded-[5px]"
              style={{ border: "0.56px solid #A2A2A2" }}
            >
              <div className="max-w-[700px]">
                <Image
                  src={card?.Image?.filename ?? us4}
                  alt="state image"
                  width={271}
                  height={141}
                  style={{ objectFit: "cover" }}
                  className="rounded-t-[5px]"
                />
              </div>
              <div className="flex h-[62px] items-center justify-center rounded-b-[5px] bg-white text-center">
                <p className="text-[12px] font-[600] text-[#434343] md:text-[14px]">
                  {card?.Name ?? ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
        {/* <BgSquare className=" left-[50%] top-0 hidden -translate-x-[24%] -translate-y-[18%]  rotate-[-33.668deg] md:block" /> */}
      </div>
    </div>
  );
};

export default UnemploymentBenefitsByDistricts;
