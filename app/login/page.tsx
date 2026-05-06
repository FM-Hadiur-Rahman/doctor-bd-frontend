"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail } from "lucide-react";
import { useAuth } from "@/src/contexts/AuthContext";
import Button from "@/src/components/ui/Button";
import Input from "@/src/components/ui/Input";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setSaving(true);
      setError("");

      const user = await login(emailOrPhone, password);

      if (user.role === "admin") {
        router.push("/admin");
      } else if (user.role === "doctor") {
        router.push("/doctor-dashboard");
      } else if (user.role === "diagnostic_center") {
        router.push("/diagnostic-dashboard");
      } else {
        router.push("/dashboard");
      }
    } catch (err: any) {
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-16">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[2rem] bg-white shadow-xl ring-1 ring-slate-100 md:grid-cols-2">
        <div className="hidden bg-[#087CC8] p-10 text-white md:block">
          <p className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold">
            Welcome back
          </p>

          <h1 className="mt-8 text-4xl font-black leading-tight">
            Manage your appointments with confidence.
          </h1>

          <p className="mt-4 leading-7 text-blue-50">
            Login as patient, doctor, diagnostic center, or admin to continue
            using DoctorBD.
          </p>
        </div>

        <form onSubmit={handleLogin} className="p-8 md:p-10">
          <h2 className="text-3xl font-black text-slate-950">Login</h2>
          <p className="mt-2 text-slate-500">Use your email or phone number.</p>

          {error && (
            <div className="mt-6 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">
              {error}
            </div>
          )}

          <div className="mt-8 space-y-5">
            <div className="relative">
              <Mail className="absolute left-4 top-[42px] h-5 w-5 text-slate-400" />
              <Input
                label="Email or phone"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="pl-12"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-[42px] h-5 w-5 text-slate-400" />
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12"
                required
              />
            </div>

            <Button className="w-full" type="submit" disabled={saving}>
              {saving ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>
      </div>
    </main>
  );
}
