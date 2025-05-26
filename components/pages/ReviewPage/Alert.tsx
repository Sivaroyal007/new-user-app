"use client";

import SucessMessage from "@/components/common/LottieComponents/SuccessMessage";
import { Button } from "@/components/ui/button";
import { forwardRef, useEffect, useState } from "react";
import close from '@/assets/svg/mi_close.svg'
import Image from "next/image";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export const AlertDialogDemo = forwardRef<HTMLButtonElement>((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   if (isOpen) {
  //     const timer = setTimeout(() => {
  //       setIsOpen(false);
  //     }, 4000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [isOpen]);
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen} >
      <SheetTrigger asChild>
        <Button
          variant="outline"
          ref={ref}
          {...props}
          onClick={() => setIsOpen(true)}
          className="hidden"
        >
          Show Dialog
        </Button>
      </SheetTrigger>
      <SheetContent
       side="center"
      // onInteractOutside={(e) => {
      //   e.preventDefault();
      // }}
      className="px-[40px] py-[25px] rounded-[12px] w-[300px] md:w-[500px]">
          <div 
            onClick={() => setIsOpen(false)}
            className="absolute right-6 top-6 cursor-pointer">
          <Image src={close} alt="close"/>
        </div>
           
          <div className="w-full flex items-center justify-center">
            <div className="w-[50px] h-[50px] md:W-[78px] md:h-[78px]">
            <SucessMessage />
            </div>
          </div>
         
            <h1 className="my-[10px] text-center text-[20px] md:text-[24px] font-[700] text-black leading-[24px] md:leading-[36px]">
              Rating Submitted Successfully!
            </h1>
            <p className="text-[12px] md:text-[16px] font-[500] text-[#434343] text-center">
              Your rating of the company&apos;s hiring process has been sent for
              verification. Our team will review it shortly and make it live on
              the platform.{" "}
            </p>
          
       
       
      </SheetContent>
    </Sheet>
  );
});

AlertDialogDemo.displayName = "AlertDialogDemo";
