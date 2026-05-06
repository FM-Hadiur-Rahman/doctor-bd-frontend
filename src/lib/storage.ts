export const storage = {
  getToken: () => {
    if (typeof window === "undefined") return null;
    return localStorage.getItem("doctorbd_token");
  },

  setToken: (token: string) => {
    localStorage.setItem("doctorbd_token", token);
  },

  removeToken: () => {
    localStorage.removeItem("doctorbd_token");
  },

  getUser: () => {
    if (typeof window === "undefined") return null;

    const user = localStorage.getItem("doctorbd_user");
    return user ? JSON.parse(user) : null;
  },

  setUser: (user: unknown) => {
    localStorage.setItem("doctorbd_user", JSON.stringify(user));
  },

  clear: () => {
    localStorage.removeItem("doctorbd_token");
    localStorage.removeItem("doctorbd_user");
  },
};
