const steps = [
  [
    "Search",
    "Find doctors by specialty, district, chamber, or nearby location.",
  ],
  ["Choose slot", "Select a real available date and time."],
  ["Book", "Confirm appointment and receive notification."],
];

export default function HowItWorks() {
  return (
    <section className="bg-white px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-black text-slate-950">How it works</h2>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={step[0]} className="rounded-3xl bg-slate-50 p-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#087CC8] text-xl font-black text-white">
                {index + 1}
              </div>
              <h3 className="mt-6 text-xl font-black">{step[0]}</h3>
              <p className="mt-3 text-slate-600">{step[1]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
