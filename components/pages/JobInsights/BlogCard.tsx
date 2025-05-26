"use client"

import Image from "next/image";
import React from "react";
import TestImg from "@/assets/job-insights/blogImg.png";
import { formatDateForBlog } from "@/lib/Config";
import useDraggable from "@/lib/hooks/useDraggable";

const BlogCard = ({ blog }: any) => {
  const {
    ref,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    handleTouchStart,
    handleTouchEnd,
    handleTouchMove,
  } = useDraggable();
  // console.log(blog);
  return (
    <div className="w-full cursor-pointer ">
      <Image
        src={blog?.content?.Image?.filename}
        alt="blog cover image"
        width={380}
        height={240}
        style={{ objectFit: "cover", objectPosition:"center" }}
        className="w-full h-[240px]"
      />

      <h6 className="mt-[32px] text-[14px] font-[600] text-primary">
        {blog?.content?.WrittenBy ?? ""} {"•"} {formatDateForBlog(blog?.published_at)}
      </h6>
      <h3 className="mt-[12px] text-[24px] font-[600] leading-[32px] text-[#434343]">
        {blog?.content?.Heading ?? ""}
      </h3>
      <p className="mt-[12px] line-clamp-2 min-h-[48px] font-[400] leading-[24px] text-[#7C7C7C]">
        {blog?.content?.SubHeading ?? ""}
      </p>
      <div className="mt-[24px] flex flex-col gap-[24px] md:flex-row md:justify-between md:gap-[32px]">
        <ul 
           onClick={(event:React.MouseEvent) => {event.isPropagationStopped(); console.log("clicked")}}
           ref={ref}
           className="hide-scrollbar1 flex w-full gap-[4px] overflow-x-auto draggable"
           onMouseDown={handleMouseDown}
           onMouseLeave={handleMouseLeave}
           onMouseUp={handleMouseUp}
           onMouseMove={handleMouseMove}
           onTouchStart={handleTouchStart}
           onTouchEnd={handleTouchEnd}
           onTouchMove={handleTouchMove}
          // className="hide-scrollbar1 flex w-full gap-[4px] overflow-x-auto cursor-grab draggable"
          >
          {blog?.tag_list?.map((tag:string,index:number) => (
            <li
              key={index}
              className="min-w-fit rounded-[16px] bg-[#EEF4FF] px-[10px] py-[2px] text-[14px] font-[500] text-[#3538CD]"
            >
              {tag}
            </li>
          ))}
        </ul>
        <div className="flex w-[138px] gap-2">
          <div className="w-[100px] text-[16px] font-[700] leading-[24px] text-primary">
            Read more
          </div>
          {">"}
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
