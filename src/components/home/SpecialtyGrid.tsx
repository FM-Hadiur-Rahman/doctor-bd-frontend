import Link from "next/link";
import { specializations } from "@/src/constants/specializations";

export default function SpecialtyGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <h2 className="text-3xl font-black text-slate-950">
        Popular specialties
      </h2>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {specializations.map((item) => (
          <Link
            key={item}
            href={`/doctors?search=${encodeURIComponent(item)}`}
            className="rounded-3xl bg-white p-5 font-black text-slate-800 shadow-sm ring-1 ring-slate-100 transition hover:-translate-y-1 hover:text-[#087CC8] hover:shadow-xl"
          >
            {item}
          </Link>
        ))}
      </div>
    </section>
  );
}
