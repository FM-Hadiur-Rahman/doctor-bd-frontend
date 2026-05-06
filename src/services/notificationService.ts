import api from "./api";

export const notificationService = {
  getMy: () => {
    return api.get("/notifications/my");
  },

  markAsRead: (id: string) => {
    return api.patch(`/notifications/${id}/read`);
  },
};
