"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Phone,
  UserRound,
  Mail,
  Lock,
  BadgeCheck,
  Building2,
} from "lucide-react";
import { useAuth } from "@/src/contexts/AuthContext";
import { UserRole } from "@/src/types/auth";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";

type RegisterForm = {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: UserRole;
};

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "patient",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const update = (field: keyof RegisterForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === "role" ? (value as UserRole) : value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const user = await register(form);

      if (user.role === "doctor") {
        router.push("/doctor-dashboard");
      } else if (user.role === "diagnostic_center") {
        router.push("/diagnostic-dashboard");
      } else if (user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setSaving(false);
    }
  };

  const accountTypes: {
    value: UserRole;
    label: string;
    description: string;
    icon: React.ReactNode;
  }[] = [
    {
      value: "patient",
      label: "Patient",
      description: "Book appointments and manage medical reports.",
      icon: <UserRound className="h-5 w-5" />,
    },
    {
      value: "doctor",
      label: "Doctor",
      description: "Manage patients, appointments, and prescriptions.",
      icon: <BadgeCheck className="h-5 w-5" />,
    },
    {
      value: "diagnostic_center",
      label: "Diagnostic Center",
      description: "Receive referrals and upload patient test reports.",
      icon: <Building2 className="h-5 w-5" />,
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-100 md:p-10">
        <div className="mb-8">
          <p className="mb-3 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-[#087CC8]">
            Create your DoctorBD account
          </p>

          <h1 className="text-4xl font-black text-slate-950">
            Register your healthcare account
          </h1>

          <p className="mt-3 text-slate-500">
            Register as patient, doctor, or diagnostic center. Doctors and
            diagnostic centers may require admin verification.
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="grid gap-5">
          <div className="relative">
            <UserRound className="absolute left-4 top-[42px] h-5 w-5 text-slate-400" />
            <Input
              label="Full name"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              className="pl-12"
              required
            />
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="relative">
              <Mail className="absolute left-4 top-[42px] h-5 w-5 text-slate-400" />
              <Input
                label="Email"
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className="pl-12"
                required
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-[42px] h-5 w-5 text-slate-400" />
              <Input
                label="Phone"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                className="pl-12"
                required
              />
            </div>
          </div>

          <div className="relative">
            <Lock className="absolute left-4 top-[42px] h-5 w-5 text-slate-400" />
            <Input
              label="Password"
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              className="pl-12"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Account type
            </label>

            <div className="grid gap-3 md:grid-cols-3">
              {accountTypes.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => update("role", item.value)}
                  className={`rounded-2xl border p-4 text-left transition ${
                    form.role === item.value
                      ? "border-[#087CC8] bg-blue-50 text-[#087CC8]"
                      : "border-slate-200 bg-white text-slate-700 hover:border-blue-200"
                  }`}
                >
                  <div className="flex items-center gap-3 font-black">
                    {item.icon}
                    {item.label}
                  </div>

                  <p className="mt-2 text-xs font-semibold text-slate-500">
                    {item.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          <Button type="submit" disabled={saving}>
            {saving ? "Creating account..." : "Create account"}
          </Button>
        </form>
      </div>
    </main>
  );
}
