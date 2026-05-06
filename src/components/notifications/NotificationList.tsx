"use client";

import { notificationService } from "@/src/services/notificationService";
import { Notification } from "@/src/types/notification";

export default function NotificationList({
  notifications,
  onReload,
}: {
  notifications: Notification[];
  onReload: () => void;
}) {
  const markRead = async (id: string) => {
    await notificationService.markAsRead(id);
    onReload();
  };

  return (
    <div className="space-y-3">
      {notifications.map((item) => (
        <div
          key={item._id}
          className={`rounded-3xl p-5 ring-1 ring-slate-100 ${
            item.isRead ? "bg-white" : "bg-blue-50"
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-black text-slate-950">{item.title}</h3>
              <p className="mt-1 text-sm text-slate-600">{item.message}</p>
            </div>

            {!item.isRead && (
              <button
                onClick={() => markRead(item._id)}
                className="text-sm font-bold text-[#087CC8]"
              >
                Mark read
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
