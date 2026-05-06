import api from "./api";

export const doctorService = {
  getDoctors: (params?: { search?: string; district?: string }) => {
    return api.get("/doctors", { params });
  },

  getDoctorById: (id: string) => {
    return api.get(`/doctors/${id}`);
  },

  getNearbyDoctors: (params: {
    lng: number;
    lat: number;
    distance?: number;
  }) => {
    return api.get("/doctors/nearby/search", { params });
  },

  createProfile: (payload: any) => {
    return api.post("/doctors/profile", payload);
  },

  getMyProfile: () => {
    return api.get("/doctors/profile/me");
  },

  updateProfile: (payload: any) => {
    return api.patch("/doctors/profile", payload);
  },
};
