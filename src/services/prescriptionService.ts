import api from "./api";

export const prescriptionService = {
  create: (payload: {
    appointmentId: string;
    diagnosis: string;
    medicines: {
      name: string;
      dosage: string;
      duration: string;
      instructions?: string;
    }[];
    advice?: string;
    followUpDate?: string;
  }) => {
    return api.post("/prescriptions", payload);
  },

  getMy: () => {
    return api.get("/prescriptions/my");
  },

  getById: (id: string) => {
    return api.get(`/prescriptions/${id}`);
  },
};
