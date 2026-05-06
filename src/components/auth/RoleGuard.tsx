"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/src/contexts/AuthContext";
import LoadingSpinner from "@/src/components/ui/LoadingSpinner";

export default function RoleGuard({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles: string[];
}) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.push("/login");
    if (!loading && user && !allowedRoles.includes(user.role)) {
      router.push("/");
    }
  }, [loading, user, router, allowedRoles]);

  if (loading) return <LoadingSpinner />;
  if (!user || !allowedRoles.includes(user.role)) return null;

  return children;
}
