import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import React from "react";
import Image from "next/image";
import close from "@/assets/svg/mi_close.svg";
import Link from "next/link";

type InfoDrawerProps = {
  isOpen: boolean;
  handleOpenChange: (open: boolean) => void;
  selectedCard: any;
};
const PopupCard = ({
  isOpen,
  handleOpenChange,
  selectedCard,
}: InfoDrawerProps) => {
  const handleCloseDrawer = () => {
    handleOpenChange(false);
  };
//   console.log(selectedCard,"data")
  return (
    <Sheet open={isOpen} onOpenChange={handleCloseDrawer}>
      <SheetContent side="center" className="p-[26px] lg:max-w-[807px] rounded-[14px] ">
        <Image
          src={close}
          alt="close icon"
          className="absolute right-5 top-5 cursor-pointer"
          onClick={() => handleCloseDrawer()}
        />
        <SheetTitle className="text-[24px] font-[800] text-[#170F49]">
          {selectedCard?.Heading ?? ""}
        </SheetTitle>
        <div className="mt-[10px] flex flex-col gap-[16px] max-h-[300px] overflow-y-auto hide-scrollbar1 ">
         {selectedCard?.Fairs?.map((listItem:any,index:number) => (
             <div key={index} className="leading-[28px] flex gap-2">
             <span className="text-[16px] font-[700] text-[#0D3276]">{index+1}.{"  "}</span>  
             <div> 
             <Link href={listItem?.Link}  target="_blank"  rel="noopener noreferrer" className="text-[16px] font-[700] text-[#0D3276]">
               {listItem?.Name ?? ""} {" : "}{" "}
             </Link>
             <span className="text-[16px] font-[500] text-[#6F6C90]">
               {listItem?.Description ?? ""}
             </span>
             </div>
           </div>
         ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default PopupCard;
