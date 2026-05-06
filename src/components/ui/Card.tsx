import { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

export default function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-slate-100 bg-white p-6 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}
