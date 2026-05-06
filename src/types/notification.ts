export type Notification = {
  _id: string;
  title: string;
  message: string;
  type: "appointment" | "prescription" | "payment" | "system";
  isRead: boolean;
  createdAt: string;
};
