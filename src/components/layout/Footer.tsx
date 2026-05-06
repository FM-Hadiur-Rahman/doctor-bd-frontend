import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <h3 className="text-2xl font-extrabold text-slate-950">DoctorBD</h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-500">
            A modern appointment platform for Bangladesh. Search doctors, view
            availability, and book appointments easily.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-slate-900">Platform</h4>
          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <Link href="/doctors" className="block hover:text-[#087CC8]">
              Find Doctors
            </Link>
            <Link href="/login" className="block hover:text-[#087CC8]">
              Login
            </Link>
            <Link href="/register" className="block hover:text-[#087CC8]">
              Register
            </Link>
          </div>
        </div>

        <div>
          <h4 className="font-bold text-slate-900">Contact</h4>
          <div className="mt-4 space-y-3 text-sm text-slate-500">
            <p>Dhaka, Bangladesh</p>
            <p>support@doctorbd.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
