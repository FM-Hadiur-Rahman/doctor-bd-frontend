import { ShieldCheck } from "lucide-react";

export default function TrustSection() {
  return (
    <section className="px-6 py-16">
      <div className="mx-auto max-w-7xl rounded-[2rem] bg-[#EAF6FD] p-10 md:p-14">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div className="flex h-28 w-28 items-center justify-center rounded-[2rem] bg-white text-[#087CC8] shadow-sm">
            <ShieldCheck className="h-14 w-14" />
          </div>

          <div>
            <h2 className="text-3xl font-black text-slate-950">
              Built for trust in Bangladesh healthcare.
            </h2>
            <p className="mt-4 max-w-2xl leading-8 text-slate-600">
              DoctorBD is designed around verified doctor profiles, BMDC
              numbers, real chamber locations, patient appointment history, and
              secure access control for patients, doctors, and admins.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
