export default function EmptyState({
  title,
  text,
}: {
  title: string;
  text?: string;
}) {
  return (
    <div className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-100">
      <h3 className="text-xl font-black text-slate-950">{title}</h3>
      {text && <p className="mt-2 text-slate-500">{text}</p>}
    </div>
  );
}
