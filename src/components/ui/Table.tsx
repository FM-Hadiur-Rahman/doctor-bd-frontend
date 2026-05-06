import { ReactNode } from "react";

export default function Table({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-x-auto rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
      <table className="w-full text-left text-sm">{children}</table>
    </div>
  );
}
