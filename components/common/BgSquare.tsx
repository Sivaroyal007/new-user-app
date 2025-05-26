import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export default function BgSquare({ className }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "absolute -z-10 size-[69px] rounded-[11px] bg-[#DBF9F5]",
        className,
      )}
    />
  );
}
