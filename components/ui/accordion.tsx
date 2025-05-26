"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      "rounded-[14px] border-2 shadow-[0px_8px_35px_0px_rgba(0,0,0,0.04)] [&[data-state=open]]:border-primary",
      className,
    )}
    {...props}
  />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Trigger
    ref={ref}
    className={cn("block w-full p-4 md:p-10", className)}
    {...props}
  >
    <>{children}</>
  </AccordionPrimitive.Trigger>
));
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionHeading = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Header>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header
    ref={ref}
    className={cn(
      "mb-4 flex flex-1 justify-between text-left text-lg font-[500] leading-7 text-[#170F49] transition-all md:mb-0 md:items-center md:text-2xl md:leading-none [&[data-state=open]>svg]:rotate-90 [&[data-state=open]>svg]:bg-primary [&[data-state=open]>svg]:stroke-white",
      className,
    )}
    {...props}
  >
    {children}
    <ChevronRightIcon
      strokeWidth="1.25"
      className="flex size-[50px] shrink-0 items-center justify-center rounded-full p-1 text-primary shadow-md transition-all duration-200"
    />
  </AccordionPrimitive.Header>
));
AccordionHeading.displayName = AccordionPrimitive.Header.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-left data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("md:pr-[90px]", className)}>{children}</div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionHeading,
  AccordionContent,
};
