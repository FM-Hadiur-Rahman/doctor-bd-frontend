import api from "./api";

export const diagnosticCenterService = {
  getAll: () => {
    return api.get("/diagnostic-centers");
  },

  getMe: () => {
    return api.get("/diagnostic-centers/me");
  },

  createMe: (payload: {
    centerName: string;
    phone: string;
    email?: string;
    address: string;
    division?: string;
    district?: string;
    services?: string[];
  }) => {
    return api.post("/diagnostic-centers/me", payload);
  },

  updateMe: (payload: {
    centerName?: string;
    phone?: string;
    email?: string;
    address?: string;
    division?: string;
    district?: string;
    services?: string[];
  }) => {
    return api.patch("/diagnostic-centers/me", payload);
  },

  verify: (centerId: string) => {
    return api.patch(`/diagnostic-centers/${centerId}/verify`);
  },
};
