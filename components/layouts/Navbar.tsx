"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import logo from "@/assets/svg/logo.svg";
import { IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SideNavbar } from "./SideNavbar";
import logoSm from "@/assets/icons/logosm.png";
import { NavbarTest } from "./NavbarTest";

const navLinks = [
  {
    label: "About Us",
    link: "/who-we-are",
    openSheet:false
  },
  {
    label: "Job Insights",
    link: "/job-insights",
    openSheet:false
  },
  {
    label: "Job App Tools",
    link: "#",
    openSheet:true,
    subNavs: [
      { label: "AI Tools", link: "/ai-tools" },
      { label: "US Govt. Financial Support", link: "/us-govt-financial-support" },
      { label: "Self-Care Tools", link: "/self-care-tools" },
      { label: "Career Fairs", link: "/career-fairs" },
    ],
  },
  {
    label: "Sign in as employer",
    link: `${process.env.NEXT_PUBLIC_HR_LOGIN_URL}/login`,
    openSheet:false
  },
];

const Navbar = () => {
  const pathname = usePathname();
  const [isJobAppToolsOpen, setIsJobAppToolsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      (dropdownRef.current as HTMLElement).contains(event.target as Node)
    ) {
      return;
    }
    setIsJobAppToolsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <div className="flex px-[5vw] py-[24px] lg:hidden">
        <Link href="/">
        <Image src={logoSm} alt="logo" width={137} height={22}  />
        </Link>
        <div className="absolute right-0 top-0 flex lg:hidden">
          <SideNavbar navLinks={navLinks} />
        </div>
      </div>

      <section className="hidden w-full justify-between bg-transparent px-[5vw] py-[40px] lg:flex">
        <Link href="/">
          <Image src={logo} alt="logo" width={247} height={41} />
        </Link>

        <nav className="flex items-center space-x-8">
          <NavbarTest />
        </nav>
      </section>
    </>
  );
};

export default Navbar;
