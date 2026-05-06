import api from "./api";

export const reviewService = {
  create: (payload: {
    appointmentId: string;
    rating: number;
    comment?: string;
  }) => {
    return api.post("/reviews", payload);
  },

  getDoctorReviews: (doctorId: string) => {
    return api.get(`/reviews/doctor/${doctorId}`);
  },

  hideReview: (id: string) => {
    return api.patch(`/reviews/${id}/hide`);
  },
};
