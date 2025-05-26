import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type HeroWrapper = {
  className?: string;
  children: ReactNode;
};

export default function HeroWrapper({ children, className }: HeroWrapper) {
  return (
    <div
      className={cn(
        "layout-background h-full w-full border-b-[1px] border-b-[#9CABC7]",
        className,
      )}
    >
      {children}
    </div>
  );
}
