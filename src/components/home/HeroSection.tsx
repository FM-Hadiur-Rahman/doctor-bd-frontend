import Link from "next/link";
import {
  ArrowRight,
  CalendarCheck,
  MapPin,
  Search,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-[#087CC8]">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-95"
        style={{ backgroundImage: "url('/images/doctor-hero-bg1.jpg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#003B73]/95 via-[#087CC8]/90 to-[#087CC8]/75" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(255,255,255,0.22),transparent_30%),radial-gradient(circle_at_88%_28%,rgba(255,255,255,0.16),transparent_28%)]" />

      <div className="absolute -right-24 top-16 h-[420px] w-[420px] rounded-full bg-white/10 blur-sm" />
      <div className="absolute bottom-[-160px] left-[-120px] h-[360px] w-[360px] rounded-full bg-[#00B4D8]/30 blur-sm" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-[1.05fr_0.95fr] lg:py-28">
        <div>
          <p className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-bold text-white shadow-sm ring-1 ring-white/20 backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Bangladesh’s modern doctor appointment platform
          </p>

          <h1 className="max-w-3xl text-5xl font-black leading-tight tracking-tight text-white md:text-7xl">
            Find the right doctor,{" "}
            <span className="text-cyan-300">faster.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-blue-50">
            Search verified specialists, view chamber locations, check real
            available slots, and book appointments without calling clinics.
          </p>

          <div className="mt-10 rounded-[2rem] bg-white/95 p-3 shadow-2xl shadow-slate-950/25 backdrop-blur">
            <div className="grid gap-3 md:grid-cols-[1fr_1fr_auto]">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4 ring-1 ring-slate-100">
                <Search className="h-5 w-5 text-slate-500" />
                <span className="text-sm font-medium text-slate-400">
                  Doctor, specialty, clinic
                </span>
              </div>

              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4 ring-1 ring-slate-100">
                <MapPin className="h-5 w-5 text-slate-500" />
                <span className="text-sm font-medium text-slate-400">
                  Dhaka, Chittagong, Sylhet
                </span>
              </div>

              <Link
                href="/doctors"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-8 py-4 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
              >
                Search
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
            {[
              ["BMDC verified", ShieldCheck],
              ["Real slots", CalendarCheck],
              ["Map enabled", MapPin],
            ].map(([label, Icon]) => (
              <div
                key={String(label)}
                className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 text-sm font-bold text-white ring-1 ring-white/15 backdrop-blur"
              >
                <Icon className="h-5 w-5" />
                {label as string}
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-[40%_60%_55%_45%] bg-yellow-300/90" />
          <div className="absolute -bottom-8 left-2 h-36 w-36 rounded-[55%_45%_50%_50%] bg-[#00D4FF]/60" />

          <div className="relative rounded-[2.4rem] bg-white/10 p-4 backdrop-blur-md ring-1 ring-white/20">
            <div className="rounded-[2rem] bg-white/95 p-6 shadow-2xl backdrop-blur">
              <div className="flex items-center gap-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-100">
                  <Stethoscope className="h-8 w-8 text-[#087CC8]" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-950">
                    Verified Doctors
                  </h3>
                  <p className="text-sm text-slate-500">
                    BMDC checked profiles
                  </p>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {[
                  ["Cardiologist", "Available today", "৳800"],
                  ["Child Specialist", "Tomorrow", "৳600"],
                  ["Dermatologist", "Online / Chamber", "৳700"],
                ].map((item) => (
                  <div
                    key={item[0]}
                    className="flex items-center justify-between rounded-3xl border border-slate-100 bg-slate-50/90 p-4 transition hover:bg-blue-50"
                  >
                    <div>
                      <p className="font-black text-slate-950">{item[0]}</p>
                      <p className="text-sm text-slate-500">{item[1]}</p>
                    </div>
                    <p className="font-black text-[#087CC8]">{item[2]}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-3xl bg-[#EAF6FD] p-5">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-[#087CC8]">
                      Appointments today
                    </p>
                    <p className="text-3xl font-black text-slate-950">1,240+</p>
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#087CC8] text-white">
                    <CalendarCheck className="h-7 w-7" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -left-14 top-2 hidden rounded-2xl bg-white/95 p-4 shadow-xl backdrop-blur lg:block">
            <p className="text-xs font-bold uppercase text-slate-400">Nearby</p>
            <p className="mt-1 text-sm font-black text-slate-950">
              24 doctors in Dhaka
            </p>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-white [clip-path:polygon(0_45%,100%_0,100%_100%,0_100%)]" />
    </section>
  );
}
