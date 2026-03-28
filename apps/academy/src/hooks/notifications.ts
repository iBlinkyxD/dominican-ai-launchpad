import { useState, useEffect, useRef } from "react";
import { getNotifications } from "@/api/notifications";

const POLL_INTERVAL_MS = 60_000;

export const useNotificationCount = () => {
  const [unreadCount, setUnreadCount] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const fetchCount = () => {
    getNotifications()
      .then((data) => setUnreadCount(data.filter((n) => !n.is_read).length))
      .catch(() => {});
  };

  const startPolling = () => {
    if (intervalRef.current) return;
    fetchCount();
    intervalRef.current = setInterval(fetchCount, POLL_INTERVAL_MS);
  };

  const stopPolling = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startPolling();

    const handleVisibility = () => {
      if (document.visibilityState === "visible") {
        startPolling();
      } else {
        stopPolling();
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);
    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, []);

  const clearCount = () => setUnreadCount(0);

  return { unreadCount, clearCount };
};
