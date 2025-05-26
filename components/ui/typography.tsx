import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

export const typographyVariants = cva("", {
  variants: {
    variant: {
      h1: "text-[32px] leading-[38.4px]",
      h2: "text-[20px] font-[700] leading-[36px] text-brand-black md:text-[24px]",
      h4: "text-[20px]",
      p: "text-[14px] font-[700] leading-[24px] text-gray-normal md:text-[16px]",
    },
    color: {
      test: "text-red-500",
      //   primary: "text-white",
      //   secondary: "text-brand-purple1",
    },
  },
  defaultVariants: {
    variant: "p",
    // color: "primary",
  },
});

export type TypographyProps = VariantProps<typeof typographyVariants> &
  React.ComponentProps<"div"> & {
    children: React.ReactNode;
    className?: string;
    component?: JSX.ElementType;
  };

const Typography = ({
  children,
  className,
  color,
  variant,
  ...props
}: TypographyProps) => {
  const Comp = variant || "h1";
  return (
    <Comp
      className={cn(typographyVariants({ variant, color, className }))}
      {...props}
    >
      {children}
    </Comp>
  );
};

export default Typography;
