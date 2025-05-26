import { josh } from "@/app/fonts";
import BgSquare from "@/components/common/BgSquare";
import Image from "next/image";
import supportOurMission from "@/assets/who-we-are/supportOurMission.png";

export default function OurTeam({data}:any) {
  return (
    <div className="relative -z-50 overflow-x-hidden">
      <div className="space-y-6 px-8 pb-[91px] pt-8 md:space-y-[64px] md:bg-secondary-gradient md:px-[116px] md:py-[79px]">
        <div className="space-y-2 text-center">
          <div className="relative z-10 inline-block">
            <h2
              className={`${josh.className} text-[40px] font-semibold text-brand-black`}
            >
              {data?.TeamHeading ?? "Meet the Team"}
            </h2>
            <BgSquare className="left-0 top-0 hidden -translate-x-[24%] -translate-y-[18%] rotate-[-33.668deg] md:block" />
          </div>
          <p className="text-2xl font-medium text-gray-normal">
            {data?.TeamDescription ?? "Meet our team of professionals to serve you"}{" "}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-y-10 mx-auto max-w-fit md:max-w-fit lg:grid-cols-2 xl:grid-cols-3 md:gap-x-7 md:gap-y-6 md:px-[56px]">
         
        {data?.Team?.map((teamData:any,i:any) => (
            <div key={i} className="sm:h-[352px] sm:w-[323px] rounded-lg border-[0.87px] border-[#E8E8E8]">
            <div className="relative h-[206px] rounded-lg">
              <Image
                src={teamData?.Image?.filename  ?? supportOurMission}
                width={322}
                height={206}
                style={{objectFit:"cover" , objectPosition:"center"}}
                alt="support our mission image"
                className="h-[206px]"
              />
            </div>
            <div className="px-5 pb-5 pt-6">
              <div className="space-y-2.5 pb-5 text-center">
                <h3 className="text-sm font-medium text-gray-normal">{teamData?.Role ?? " "}</h3>
                <p className="text-[21px] font-semibold text-grayDark">
                  {teamData?.Name ?? ""}
                </p>
              </div>
              <div className="flex items-center justify-center gap-x-[7px]">
                <div className="h-[21px] w-[28px] rounded-lg bg-bordercolor"></div>
                <div className="h-[21px] w-[28px] rounded-lg bg-bordercolor"></div>
                <div className="h-[21px] w-[28px] rounded-lg bg-bordercolor"></div>
              </div>
            </div>
          </div>
        ))}

        </div>
      </div>
      <BgSquare className="space-y-1/2 right-2 top-1/2 hidden -translate-y-1/2 translate-x-6 rotate-[-48deg] md:block" />
    </div>
  );
}
