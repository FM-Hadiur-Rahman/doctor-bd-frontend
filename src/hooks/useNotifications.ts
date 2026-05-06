"use client";

import { useEffect, useState } from "react";
import { notificationService } from "@/src/services/notificationService";
import { Notification } from "@/src/types/notification";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  const unreadCount = notifications.filter((item) => !item.isRead).length;

  const loadNotifications = async () => {
    try {
      setLoading(true);
      const res = await notificationService.getMy();
      setNotifications(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotifications();
  }, []);

  return { notifications, unreadCount, loading, reload: loadNotifications };
}
