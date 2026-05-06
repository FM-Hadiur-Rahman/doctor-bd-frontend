import Link from "next/link";
import { MapPin, ShieldCheck, Star, Stethoscope } from "lucide-react";
import Badge from "@/src/components/ui/Badge";
import Button from "@/src/components/ui/Button";
import { formatCurrency } from "@/src/lib/utils";

export type Doctor = {
  _id: string;
  specialization: string;
  chamberName: string;
  district: string;
  address: string;
  consultationFee: number;
  isVerified: boolean;
  mapAddress?: string;
  user?: {
    name: string;
    email: string;
    phone: string;
  };
};

export default function DoctorCard({ doctor }: { doctor: Doctor }) {
  return (
    <div className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <div className="flex gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-3xl bg-blue-50 text-[#087CC8]">
          <Stethoscope className="h-8 w-8" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="truncate text-xl font-black text-slate-950">
              {doctor.user?.name || "Doctor"}
            </h3>
            {doctor.isVerified && (
              <Badge className="bg-emerald-50 text-emerald-700">
                <ShieldCheck className="mr-1 h-3 w-3" />
                Verified
              </Badge>
            )}
          </div>

          <p className="mt-1 font-semibold text-[#087CC8]">
            {doctor.specialization}
          </p>

          <div className="mt-3 flex items-start gap-2 text-sm text-slate-500">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
            <span>
              {doctor.chamberName}, {doctor.district}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm">
            <div className="flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 font-bold text-amber-700">
              <Star className="h-4 w-4 fill-current" />
              4.8
            </div>
            <span className="text-slate-500">120 reviews</span>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Consultation
          </p>
          <p className="text-lg font-black text-slate-950">
            {formatCurrency(doctor.consultationFee)}
          </p>
        </div>

        <Link href={`/doctors/${doctor._id}`}>
          <Button variant="dark">View & Book</Button>
        </Link>
      </div>
    </div>
  );
}
