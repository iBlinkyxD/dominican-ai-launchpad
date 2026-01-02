import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-normal ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: [
          "bg-primary text-primary-foreground",
          "shadow-[0_4px_16px_-4px_hsl(var(--primary)/0.4),inset_0_1px_0_hsl(0_0%_100%/0.2)]",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:pointer-events-none",
          "hover:-translate-y-0.5 hover:shadow-[0_6px_20px_-4px_hsl(var(--primary)/0.5),inset_0_1px_0_hsl(0_0%_100%/0.25)]",
          "active:translate-y-0 active:shadow-[0_2px_8px_-2px_hsl(var(--primary)/0.4)]",
        ].join(" "),
        destructive: [
          "bg-destructive text-destructive-foreground",
          "shadow-[0_4px_16px_-4px_hsl(var(--destructive)/0.4),inset_0_1px_0_hsl(0_0%_100%/0.2)]",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent before:pointer-events-none",
          "hover:-translate-y-0.5 hover:shadow-[0_6px_20px_-4px_hsl(var(--destructive)/0.5)]",
        ].join(" "),
        outline: [
          "border border-input bg-background/80 backdrop-blur-sm",
          "shadow-[0_2px_8px_-2px_hsl(var(--foreground)/0.06),inset_0_1px_0_hsl(0_0%_100%/0.1)]",
          "hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5",
          "hover:shadow-[0_4px_12px_-2px_hsl(var(--foreground)/0.1)]",
        ].join(" "),
        secondary: [
          "bg-secondary text-secondary-foreground",
          "shadow-[0_4px_16px_-4px_hsl(var(--secondary)/0.3),inset_0_1px_0_hsl(0_0%_100%/0.15)]",
          "before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/15 before:via-transparent before:to-transparent before:pointer-events-none",
          "hover:-translate-y-0.5 hover:shadow-[0_6px_20px_-4px_hsl(var(--secondary)/0.4)]",
        ].join(" "),
        ghost: "hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
