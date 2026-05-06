import { SelectHTMLAttributes } from "react";
import { cn } from "@/src/lib/utils";

type Props = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: string[];
};

export default function Select({ label, options, className, ...props }: Props) {
  return (
    <label className="block">
      {label && (
        <span className="mb-2 block text-sm font-semibold text-slate-700">
          {label}
        </span>
      )}

      <select
        className={cn(
          "w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#087CC8] focus:ring-4 focus:ring-blue-100",
          className,
        )}
        {...props}
      >
        <option value="">Select</option>
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </label>
  );
}
