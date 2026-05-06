"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, UserRound, Mail, Lock, BadgeCheck } from "lucide-react";
import { useAuth } from "@/src/contexts/AuthContext";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "patient",
  });

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const user = await register(form);

      if (user.role === "doctor") router.push("/doctor-dashboard");
      else router.push("/dashboard");
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-xl ring-1 ring-slate-100 md:p-10">
        <div className="mb-8">
          <p className="mb-3 inline-flex rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-[#087CC8]">
            Create your DoctorBD account
          </p>
          <h1 className="text-4xl font-black text-slate-950">
            Register as patient or doctor
          </h1>
          <p className="mt-3 text-slate-500">
            Doctors need to create a profile after registration and wait for
            admin verification.
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
            <div className="grid gap-3 md:grid-cols-2">
              {[
                ["patient", "Patient"],
                ["doctor", "Doctor"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => update("role", value)}
                  className={`flex items-center gap-3 rounded-2xl border p-4 text-left font-bold transition ${
                    form.role === value
                      ? "border-[#087CC8] bg-blue-50 text-[#087CC8]"
                      : "border-slate-200 bg-white text-slate-700"
                  }`}
                >
                  <BadgeCheck className="h-5 w-5" />
                  {label}
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
