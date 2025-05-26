import Image from "next/image";
import testimonialImg from "@/assets/career-fairs/testimonial.png";
import { josh } from "@/app/fonts";

export default function Testimonial({ data }: any) {
  return (
    <div className="flex flex-col items-center gap-y-6 px-5 pb-[74px] md:mx-auto md:max-w-8xl md:flex-row md:gap-x-24 md:gap-y-0 md:px-[5vw] md:pb-[112px]">
      <div className="relative aspect-[552/382] w-full">
        <Image
          src={data?.TestimonialImage?.filename ?? testimonialImg}
          alt="Testimonial image"
          fill
        />
      </div>
      <div className="flex w-full flex-col gap-y-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="49"
          height="49"
          viewBox="0 0 49 49"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M13.679 10.2619C6.14838 15.0981 1.96481 20.7271 1.12824 27.1488C-0.174105 37.1459 8.76609 42.0392 13.296 37.6426C17.8259 33.246 15.1105 27.6655 11.8304 26.1401C8.55028 24.6146 6.54438 25.1459 6.89428 23.1074C7.24418 21.069 11.9108 15.4172 16.0106 12.7851C16.2826 12.5538 16.3861 12.105 16.1242 11.7645C15.9519 11.5406 15.614 11.1014 15.1105 10.447C14.6702 9.87474 14.2484 9.89616 13.679 10.2619Z"
            fill="#7388B0"
          />
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M33.5041 10.2619C25.9736 15.0981 21.79 20.7271 20.9534 27.1488C19.6511 37.1459 28.5913 42.0392 33.1212 37.6426C37.6511 33.246 34.9357 27.6655 31.6556 26.1401C28.3755 24.6146 26.3695 25.1459 26.7195 23.1074C27.0694 21.069 31.736 15.4172 35.8358 12.7851C36.1078 12.5538 36.2113 12.105 35.9493 11.7645C35.7771 11.5406 35.4392 11.1014 34.9357 10.447C34.4954 9.87474 34.0736 9.89616 33.5041 10.2619Z"
            fill="#7388B0"
          />
        </svg>
        <p className="leading-6 text-grayDark">
          {data?.TestimonialQuote ??
            "My mental health would be helped immensely by not trying to put my  best foot forward and being repeatedly rejected by people that affect  my ability to pay my mortgage”"}
        </p>
        <p className={`font-semibold text-brand-black ${josh.className}`}>
          - {data?.TestimonialName ?? "Jake VT"}
        </p>
      </div>
    </div>
  );
}
