"use client";

import api from "@/src/services/api";
import { User, UserRole } from "@/src/types/auth";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (emailOrPhone: string, password: string) => Promise<User>;
  register: (payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: UserRole;
  }) => Promise<User>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadMe = async () => {
    try {
      const token = localStorage.getItem("doctorbd_token");

      if (!token) return;

      const res = await api.get("/auth/me");
      setUser(res.data.data);
    } catch {
      localStorage.removeItem("doctorbd_token");
      localStorage.removeItem("doctorbd_user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMe();
  }, []);

  const login = async (emailOrPhone: string, password: string) => {
    const res = await api.post("/auth/login", { emailOrPhone, password });
    const data = res.data.data as User;

    localStorage.setItem("doctorbd_token", data.token || "");
    localStorage.setItem("doctorbd_user", JSON.stringify(data));

    setUser(data);
    return data;
  };

  const register = async (payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: UserRole;
  }) => {
    const res = await api.post("/auth/register", payload);
    const data = res.data.data as User;

    localStorage.setItem("doctorbd_token", data.token || "");
    localStorage.setItem("doctorbd_user", JSON.stringify(data));

    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("doctorbd_token");
    localStorage.removeItem("doctorbd_user");
    setUser(null);
    window.location.href = "/";
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
