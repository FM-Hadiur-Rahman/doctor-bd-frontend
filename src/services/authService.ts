import api from "./api";

export const authService = {
  login: (payload: { emailOrPhone: string; password: string }) => {
    return api.post("/auth/login", payload);
  },

  register: (payload: {
    name: string;
    email: string;
    phone: string;
    password: string;
    role: string;
  }) => {
    return api.post("/auth/register", payload);
  },

  me: () => {
    return api.get("/auth/me");
  },
};
