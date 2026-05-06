export default function Tabs({
  tabs,
  active,
  onChange,
}: {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 rounded-2xl bg-slate-100 p-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
            active === tab
              ? "bg-white text-[#087CC8] shadow-sm"
              : "text-slate-600"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
