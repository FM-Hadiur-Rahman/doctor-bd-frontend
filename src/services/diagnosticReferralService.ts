import api from "./api";

export const diagnosticReferralService = {
  create: (payload: {
    appointmentId: string;
    diagnosticCenterId: string;
    tests: string[];
    note?: string;
  }) => {
    return api.post("/diagnostic-referrals", payload);
  },

  getDoctorReferrals: () => {
    return api.get("/diagnostic-referrals/doctor/my");
  },

  getCenterReferrals: () => {
    return api.get("/diagnostic-referrals/center/my");
  },

  updateStatus: (
    referralId: string,
    payload: {
      status: "accepted" | "completed" | "cancelled";
    },
  ) => {
    return api.patch(`/diagnostic-referrals/${referralId}/status`, payload);
  },

  uploadReport: (
    referralId: string,
    payload: {
      document: File;
    },
  ) => {
    const formData = new FormData();
    formData.append("document", payload.document);

    return api.post(`/diagnostic-referrals/${referralId}/report`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
