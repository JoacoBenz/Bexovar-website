import * as React from "react";
import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("container mx-auto px-4 md:px-8", className)} {...rest}>
      {children}
    </div>
  );
}
