"use client";

import { useNotifications } from "@/src/hooks/useNotifications";
import NotificationList from "@/src/components/notifications/NotificationList";
import LoadingSpinner from "@/src/components/ui/LoadingSpinner";
import EmptyState from "@/src/components/ui/EmptyState";
import ProtectedRoute from "@/src/components/auth/ProtectedRoute";

export default function NotificationsPage() {
  const { notifications, loading, reload } = useNotifications();

  return (
    <ProtectedRoute>
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-black text-slate-950">Notifications</h1>

          <div className="mt-8">
            {loading ? (
              <LoadingSpinner />
            ) : notifications.length === 0 ? (
              <EmptyState title="No notifications yet" />
            ) : (
              <NotificationList
                notifications={notifications}
                onReload={reload}
              />
            )}
          </div>
        </div>
      </main>
    </ProtectedRoute>
  );
}
