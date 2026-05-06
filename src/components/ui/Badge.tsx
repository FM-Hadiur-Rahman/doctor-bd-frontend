import { cn } from "@/src/lib/utils";

type BadgeProps = {
  children: React.ReactNode;
  className?: string;
};

export default function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-[#087CC8]",
        className,
      )}
    >
      {children}
    </span>
  );
}
