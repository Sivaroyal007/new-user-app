"use client";

import Image from "next/image";
import navicon from "@/assets/icons/navCollapse.png";
import navlogo from "@/assets/icons/navlogoicon.png";
import { ChevronDown, X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/NavSheet";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const SHEET_SIDES = ["right"] as const;

type SheetSide = (typeof SHEET_SIDES)[number];

export function SideNavbar({ navLinks }: any) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  const handleDropdown = (index: number) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2">
        <Sheet open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <SheetTrigger asChild>
            <Image
              src={navicon}
              alt="nav icon"
              className="cursor-pointer py-[24px]"
            />
          </SheetTrigger>
          <SheetContent className="bg-white">
            <SheetClose className="absolute right-4 top-4 w-full rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none disabled:pointer-events-none data-[state=open]:bg-secondary">
              <div className="flex w-full justify-between py-[18px] pl-[30px]">
                <X className="h-6 w-6" />
                <Image src={navlogo} alt="logo" />
              </div>
              <span className="sr-only">Close</span>
            </SheetClose>
            <SheetHeader className="mt-[60px] pt-[20px]">
              {navLinks.map((nav: any, index: any) => (
                <div key={index}>
                  <SheetDescription>
                    <div
                      onClick={() => {
                        if (!nav.subNavs) {
                          setIsDialogOpen(false);
                          router.push(nav.link);
                        } else {
                          handleDropdown(index);
                        }
                      }}
                      className={` ${
                        pathname === nav.link
                          ? "bg-gray-100"
                          : "text-label-gray"
                      } flex w-full justify-between items-center rounded-[8px] py-[12px] pl-[21px] pr-[10px] cursor-pointer`}
                    >
                      <span className="text-[16px] font-[600]">
                        {nav.label}
                      </span>
                      {nav.subNavs && (
                        <ChevronDown
                          className={`w-[20px] ${
                            openDropdown === index ? "rotate-180" : ""
                          } transition-transform`}
                        />
                      )}
                    </div>
                  </SheetDescription>
                  {nav.subNavs && openDropdown === index && (
                    <div className="ml-6">
                      {nav.subNavs.map((subNav: any, subIndex: any) => (
                        <SheetDescription key={subIndex}>
                          <Link
                            onClick={() => setIsDialogOpen(false)}
                            className={` ${
                              pathname === subNav.link
                                ? "bg-gray-100"
                                : "text-label-gray"
                            } flex w-full rounded-[8px] py-[12px] pl-[21px]`}
                            href={subNav.link}
                          >
                            <span className="text-[16px] font-[600] text-start">
                              {subNav.label}
                            </span>
                          </Link>
                        </SheetDescription>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
}
