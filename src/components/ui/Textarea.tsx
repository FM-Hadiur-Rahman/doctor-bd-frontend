import { TextareaHTMLAttributes } from "react";
import { cn } from "@/src/lib/utils";

type Props = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export default function Textarea({ label, className, ...props }: Props) {
  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
        </span>
      )}

      <textarea
        className={cn(
          "min-h-32 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition placeholder:text-slate-400 focus:border-[#087CC8] focus:ring-4 focus:ring-blue-100",
          className,
        )}
        {...props}
      />
    </label>
  );
}
