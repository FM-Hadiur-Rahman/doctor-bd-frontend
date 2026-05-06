export type UserRole = "patient" | "doctor" | "diagnostic_center" | "admin";

export type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  token?: string;
};
