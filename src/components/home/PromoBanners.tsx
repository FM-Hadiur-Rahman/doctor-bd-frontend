import Link from "next/link";
import {
  ArrowRight,
  BriefcaseMedical,
  LockKeyhole,
  Smartphone,
  UsersRound,
} from "lucide-react";

export default function PromoBanners() {
  return (
    <section className="mx-auto max-w-7xl space-y-12 px-6 py-16">
      <div className="grid items-center gap-10 rounded-[2rem] bg-[#EAF6FD] p-8 md:grid-cols-[0.8fr_1.2fr] md:p-12">
        <div className="relative mx-auto h-64 w-full max-w-sm">
          <div className="absolute left-8 top-8 h-44 w-44 rounded-[45%_55%_50%_50%] bg-[#087CC8]" />
          <div className="absolute right-6 top-20 h-40 w-48 rounded-[55%_45%_60%_40%] bg-[#002B5B]" />
          <div className="absolute left-16 top-12 flex h-48 w-48 items-center justify-center overflow-hidden rounded-[45%_55%_50%_50%] bg-white shadow-xl">
            <LockKeyhole className="h-20 w-20 text-[#087CC8]" />
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-black text-slate-950 md:text-4xl">
            Your health. Your data. Always protected.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            DoctorBD is designed with secure patient access, verified doctor
            profiles, protected appointment history, and private prescription
            records.
          </p>
          <Link
            href="/register"
            className="mt-7 inline-flex items-center gap-2 rounded-2xl bg-[#087CC8] px-6 py-3 font-bold text-white"
          >
            Start securely <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="grid items-center gap-10 rounded-[2rem] bg-[#EAF6FD] p-8 md:grid-cols-[1.1fr_0.9fr] md:p-12">
        <div>
          <h2 className="text-3xl font-black text-slate-950 md:text-4xl">
            Doctor appointments from anywhere in Bangladesh.
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Search doctors, book real-time slots, receive notifications, and
            manage appointments from web today — mobile app later.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">
              App Store Soon
            </span>
            <span className="rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white">
              Google Play Soon
            </span>
          </div>
        </div>

        <div className="relative mx-auto h-72 w-full max-w-md">
          <div className="absolute right-6 top-6 h-40 w-40 rounded-[45%_55%_50%_50%] bg-yellow-300" />
          <div className="absolute bottom-0 right-10 h-40 w-64 rounded-[60%_40%_30%_70%] bg-[#087CC8]" />
          <div className="absolute left-8 top-4 flex h-60 w-36 rotate-[-8deg] items-center justify-center rounded-[2rem] bg-slate-950 p-3 shadow-2xl">
            <div className="flex h-full w-full items-center justify-center rounded-[1.5rem] bg-[#087CC8] text-center text-lg font-black text-white">
              DoctorBD
            </div>
          </div>
          <Smartphone className="absolute right-24 top-20 h-20 w-20 text-white" />
        </div>
      </div>

      <div className="grid items-center gap-10 rounded-[2rem] bg-[#002B5B] p-8 text-white md:grid-cols-[0.9fr_1.1fr] md:p-12">
        <div className="relative mx-auto h-64 w-full max-w-sm">
          <div className="absolute left-6 top-4 h-48 w-48 rounded-[55%_45%_60%_40%] bg-[#087CC8]" />
          <div className="absolute left-16 top-16 flex h-44 w-56 items-center justify-center overflow-hidden rounded-[50%_50%_40%_60%] bg-white/10 shadow-xl">
            <BriefcaseMedical className="h-24 w-24 text-white" />
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-black md:text-4xl">
            Are you a doctor or clinic owner?
          </h2>
          <p className="mt-4 font-semibold text-blue-100">
            Grow your practice with digital appointment management.
          </p>

          <div className="mt-6 space-y-3 text-blue-50">
            {[
              "Manage patient bookings and serials",
              "Create real availability slots",
              "Get discovered by patients nearby",
              "Use BMDC verified trust profile",
            ].map((item) => (
              <p key={item} className="flex items-center gap-3">
                <ArrowRight className="h-5 w-5 text-yellow-300" />
                {item}
              </p>
            ))}
          </div>

          <Link
            href="/register"
            className="mt-8 inline-flex rounded-2xl bg-[#087CC8] px-6 py-3 font-bold text-white"
          >
            Join as Doctor
          </Link>
        </div>
      </div>

      <div className="grid items-center gap-10 rounded-[2rem] bg-[#EAF6FD] p-8 md:grid-cols-[1fr_1fr] md:p-12">
        <div className="relative h-60">
          <div className="absolute left-0 top-0 h-40 w-40 rounded-full bg-yellow-300" />
          <div className="absolute left-24 top-16 flex h-40 w-40 items-center justify-center rounded-[45%_55%_50%_50%] bg-white shadow-xl">
            <UsersRound className="h-20 w-20 text-[#087CC8]" />
          </div>
        </div>

        <div className="text-center md:text-left">
          <h2 className="text-3xl font-black text-slate-950">
            Building Bangladesh’s digital healthcare access.
          </h2>
          <p className="mt-4 text-slate-600">
            A product built for patients, doctors, clinics, and future
            healthcare teams.
          </p>
          <Link
            href="/doctors"
            className="mt-6 inline-flex rounded-2xl bg-[#087CC8] px-6 py-3 font-bold text-white"
          >
            Explore Doctors
          </Link>
        </div>
      </div>
    </section>
  );
}
