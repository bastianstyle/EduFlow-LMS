import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "outline" | "ghost" | "danger" | "link";
  size?: "default" | "sm" | "lg" | "icon";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 disabled:opacity-50 disabled:pointer-events-none rounded-xl active:scale-[0.98]",
          variant === "default" && "bg-primary-600 text-white hover:bg-primary-700 shadow-sm",
          variant === "primary" && "bg-primary text-white hover:bg-primary-700 shadow-sm",
          variant === "secondary" && "bg-slate-100 text-slate-800 hover:bg-slate-200",
          variant === "outline" && "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 shadow-sm",
          variant === "ghost" && "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
          variant === "danger" && "bg-red-600 text-white hover:bg-red-700 shadow-sm",
          variant === "link" && "text-primary-600 underline-offset-4 hover:underline p-0 h-auto",
          size === "default" && "h-10 px-4 py-2 text-sm",
          size === "sm" && "h-8 px-3 text-xs",
          size === "lg" && "h-12 px-6 text-base",
          size === "icon" && "h-10 w-10 p-0",
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
