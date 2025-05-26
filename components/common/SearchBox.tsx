import React from "react";
import Image from "next/image";
import search from "@/assets/svg/searchIcon.svg";

const SearchBox = () => {
  return (
    <section
      className="flex w-full gap-[24px] rounded-[8px] border-[1px] border-[#D0D9E9] p-[16px] text-label-gray"
      style={{ boxShadow: "0px 8px 26.4px 0px #0000000D" }}
    >
      <Image src={search} alt="search icon" />
      <input
        placeholder="Search"
        type="text"
        className="h-full w-full text-[16px]"
      />
    </section>
  );
};

export default SearchBox;
