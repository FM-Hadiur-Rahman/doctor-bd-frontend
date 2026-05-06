import { CalendarDays, MapPin, ShieldCheck, Video } from "lucide-react";

const features = [
  {
    icon: CalendarDays,
    title: "Real-time slots",
    text: "Patients can see actual available appointment slots.",
  },
  {
    icon: MapPin,
    title: "Map-based search",
    text: "Find nearby doctors and chambers using Mapbox.",
  },
  {
    icon: ShieldCheck,
    title: "BMDC verification",
    text: "Admin can verify doctor profiles before public listing.",
  },
  {
    icon: Video,
    title: "Future telemedicine",
    text: "Prepared for video consultation and digital prescriptions.",
  },
];

export default function FeatureSection() {
  return (
    <section className="mx-auto grid max-w-7xl gap-6 px-6 py-16 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature) => {
        const Icon = feature.icon;

        return (
          <div
            key={feature.title}
            className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-slate-100"
          >
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
              <Icon className="h-6 w-6 text-[#087CC8]" />
            </div>
            <h3 className="text-xl font-black">{feature.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {feature.text}
            </p>
          </div>
        );
      })}
    </section>
  );
}
