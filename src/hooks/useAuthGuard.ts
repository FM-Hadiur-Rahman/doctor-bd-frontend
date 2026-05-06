"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/contexts/AuthContext";

export function useAuthGuard(roles?: string[]) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push("/login");
      return;
    }

    if (roles && !roles.includes(user.role)) {
      router.push("/");
    }
  }, [user, loading, roles, router]);

  return { user, loading };
}
