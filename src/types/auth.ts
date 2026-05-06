export type UserRole = "patient" | "doctor" | "admin";

export type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  token?: string;
};
