"use client";

import * as React from "react";
import Link from "next/link";

import { cn } from "@/lib/utils";
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string }[] = [
  {
    title: "AI Tools",
    href: "/ai-tools",
  },
  {
    title: "US Govt. Financial Support",
    href: "/us-govt-financial-support",
  },
  {
    title: "Self-Care Tools",
    href: "/self-care-tools",
  },
  {
    title: "Career Fairs",
    href: "/career-fairs",
  },
];

export function NavbarTest() {
  return (
    <NavigationMenu>
      <NavigationMenuList className="flex gap-[32px]">
        <NavigationMenuItem className="text-[16px] font-[600] text-[#434343]">
          <Link href="/who-we-are" legacyBehavior passHref>
            <NavigationMenuLink className="text-[16px] font-[600] text-[#434343]">
              About Us
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/job-insights" legacyBehavior passHref>
            <NavigationMenuLink className="text-[16px] font-[600] text-[#434343]">
              Job Insights
            </NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger className="px-0 text-[16px] font-[600] text-[#434343]">
            Job App Tools
          </NavigationMenuTrigger>
          <NavigationMenuContent className="">
            <ul className="grid w-[400px] gap-3 p-4 md:w-[400px]">
              {components.map((component) => (
                <Link
                  className="block select-none space-y-1 rounded-md p-2 leading-none no-underline transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                  key={component.title}
                  href={component.href}
                >
                  {component.title}
                </Link>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem className="blueButton text-white">
          <Link
            href={`${process.env.NEXT_PUBLIC_HR_LOGIN_URL}/login`}
            target="_blank"
          >
            Sign in as employer
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-2 leading-none no-underline transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div>{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
