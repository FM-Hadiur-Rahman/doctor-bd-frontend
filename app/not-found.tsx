import Link from "next/link";
import Button from "@/src/components/ui/Button";

export default function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-6">
      <div className="max-w-md rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-100">
        <h1 className="text-6xl font-black text-[#087CC8]">404</h1>
        <h2 className="mt-4 text-2xl font-black text-slate-950">
          Page not found
        </h2>
        <p className="mt-3 text-slate-500">
          The page you are looking for does not exist.
        </p>
        <Link href="/">
          <Button className="mt-6">Back Home</Button>
        </Link>
      </div>
    </main>
  );
}
