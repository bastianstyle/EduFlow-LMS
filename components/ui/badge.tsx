import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "success" | "warning" | "danger" | "outline" | "blue";
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variant === "default" && "bg-primary-50 text-primary-700 border border-primary-200",
        variant === "blue" && "bg-blue-50 text-blue-700 border border-blue-200",
        variant === "secondary" && "bg-slate-100 text-slate-800",
        variant === "success" && "bg-emerald-50 text-emerald-700 border border-emerald-200",
        variant === "warning" && "bg-amber-50 text-amber-700 border border-amber-200",
        variant === "danger" && "bg-rose-50 text-rose-700 border border-rose-200",
        variant === "outline" && "border border-slate-300 text-slate-700",
        className
      )}
      {...props}
    />
  );
}
