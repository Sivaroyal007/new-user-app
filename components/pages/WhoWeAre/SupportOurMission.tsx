import { josh } from "@/app/fonts";
import Image from "next/image";
import supportOurMission from "@/assets/who-we-are/supportOurMission.png";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export default function SupportOurMission({ data }: any) {
  return (
    <div className="md:px-[5vw]">
      <div className="flex flex-col items-center justify-center gap-x-[115px] gap-y-6 bg-primary-gradient px-5 pb-[48px] pt-[46px] md:mb-[113px] md:flex-row md:gap-y-0 md:px-[53px] md:py-8">
        <Image src={data?.DonationImage?.filename ?? supportOurMission} width={383} height={315} alt="support our mission image" />
        <div className="space-y-4 md:space-y-6">
          <div className="space-y-2">
            <h2
              className={`${josh.className} text-[32px] font-semibold text-brand-black md:text-[40px]`}
            >
              {data?.DonationHeading ?? "Support Our Mission"}
            </h2>
            <p className="leading-6 text-gray-normal">
              {data?.DonationDescription ??
                "Your generosity helps us continue our work and make a difference in the lives of those we serve. By donating, you contribute directly to our initiatives and help us achieve our goals. Every contribution, no matter how small, makes a significant impact."}
            </p>
          </div>

          <Button asChild variant="ghost" className="text-base">
            <Link href="https://buymeacoffee.com/thejobapplicant" target="_blank" rel="noopener noreferrer">
              Donate <ChevronRightIcon className="size-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
