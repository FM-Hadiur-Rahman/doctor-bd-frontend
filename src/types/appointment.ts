import { Doctor } from "./doctor";

export type AppointmentStatus =
  | "pending"
  | "confirmed"
  | "cancelled"
  | "completed";

export type Appointment = {
  _id: string;
  patient: {
    _id: string;
    name: string;
    email: string;
    phone: string;
  };
  doctor: Doctor;
  date: string;
  time: string;
  serialNumber: number;
  status: AppointmentStatus;
  paymentStatus: "unpaid" | "paid" | "refunded";
  notes?: string;
  createdAt: string;
};
