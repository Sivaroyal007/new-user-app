import Page404 from "@/components/common/LottieComponents/Page404";
import HeroWrapper from "@/components/wrapper/HeroWrapper";
import Link from "next/link";

export default function NotFound() {
  return (
    <HeroWrapper className="flex min-h-screen items-center justify-center px-[5vw]">
      <div className="bg-transparent">
        <div className="mx-auto mb-[24px] mt-[30px] flex max-w-[930px] flex-col items-center justify-center gap-[12px] md:mb-[64px] lg:mt-[64px]">
          <div className="max-w-[240px] md:max-w-[327px]">
            <Page404 />
          </div>
          <h1
            className={`w-full text-center text-[24px] font-[700] leading-[36px] text-black`}
          >
            Oops! Looks like you&apos;ve wandered off the map.
          </h1>
          <p className="text-center font-[300]">
            The page you&apos;re looking for seems to have gone on vacation
            without leaving a forwarding address. Remember, not all who wander
            are lost... but you might be. Let&apos;s get you back on track!
          </p>
        </div>
      </div>
    </HeroWrapper>
  );
}
