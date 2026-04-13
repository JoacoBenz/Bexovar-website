import * as React from "react";
import { cn } from "@/lib/cn";

export function Card({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-white p-6 shadow-sm transition-shadow hover:shadow-lg",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
