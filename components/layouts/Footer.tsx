import React from "react";
import { josh } from "../../app/fonts";
import FooterForm from "./FooterForm";
import { Separator } from "../ui/separator";
import fb from "@/assets/footer/fb.svg";
import twitter from "@/assets/footer/twitter.svg";
import ig from "@/assets/footer/instagram.svg";
import Linkedin from "@/assets/footer/linkedin.svg";
import Image from "next/image";
import Link from "next/link";
import { fetchDataBySlug} from "@/lib/services/storyblok";

import { getStoryblokApi } from "@storyblok/react/rsc";

export default async function Footer() {
  const { data } = await fetchDataBySlug("footer");
  // console.log(data, "DATA FROM STORYBLOK");
  const currentYear = new Date().getFullYear();

  return (
    <section className="w-full bg-[#081F48]">
      <div className="px-[5vw] pt-[20px] md:pt-[113px]">
        <div className="flex w-full flex-col md:flex-row md:justify-between md:gap-[5vw]">
          <div className="w-48%">
            <h2
              className={` ${josh.className} text-[32px] font-[600] leading-[41px] text-[#FAFAFA] md:text-[48px] md:leading-[62px]`}
            >
              {data?.story?.content?.Heading ||
                "We&apos;re here to answer all your questions"}
            </h2>
            <p className="mt-[16px] text-[16px] font-[400] leading-[24px] text-[#E8E8E8]">
              {data?.story?.content?.Description ||
                " your journey&apos;s important to us. Need help, resources, or just someone to talk to? we&apos;re just a message away!"}
            </p>
          </div>

          <div className="mt-[40px] w-full md:mt-0">
            <FooterForm />
          </div>
        </div>
        <Separator className="mt-[66px] text-[#FFFFFF] md:mt-[68px]" />

        <div className="mt-[24px] flex flex-col justify-between md:flex-row">
          <ul className="flex justify-between md:gap-[40px]">
            <Link href="/who-we-are" className="footerNav">About us</Link>
            <Link href="/privacy-policy" className="footerNav">Privacy policy</Link>
            {/* <li className="footerNav">FAQ</li> */}
          </ul>
          <div className="mx-auto mt-[24px] flex gap-[40px] md:mx-0 md:mt-0">
            <Link href={data?.story?.content?.Facebook}>
              <Image src={fb} alt="facebook" />
            </Link>
            <Link href={data?.story?.content?.Twitter}>
              <Image src={twitter} alt="Twitter" />
            </Link>
            <Link href={data?.story?.content?.Instagram}>
              <Image src={ig} alt="Instagram" />
            </Link>
            <Link href={data?.story?.content?.Linkedin}>
              <Image src={Linkedin} alt="Linkedin" />
            </Link>
          </div>
        </div>

        <div className="mt-[40px] flex items-center justify-center pb-[28px] text-[14px] font-[400] text-white opacity-70 md:mt-[90px] md:pb-[32px]">
          Copyright © {currentYear} • thejobapplicantperspective
        </div>
      </div>
    </section>
  );
}

// storyblok

type StoryblokData = {
  story: {
    content: any;
  };
};

async function fetchData() {
  let sbParams: { version: "published" | "draft" } = { version: "published" };

  const storyblokApi = getStoryblokApi();

  if (!storyblokApi) {
    return { data: {} as StoryblokData };
  }

  const response = await storyblokApi.get(`cdn/stories/footer`, sbParams, {
    cache: "force-cache",
  });

  return { data: response?.data ?? ({} as StoryblokData) };
}
