import { useEffect, useState } from "react";
import { Bell } from "lucide-react";
import { NavDropdown } from "./NavDropdown";
import {
  getNotifications,
  markAllNotificationsRead,
  Notification,
} from "@/api/notifications";

const TYPE_ICONS: Record<string, string> = {
  post_like: "❤️",
  comment: "💬",
  new_follower: "👤",
  course_update: "📚",
  badge_awarded: "🏅",
  event_reminder: "📅",
  space_invite: "🏠",
  message: "✉️",
  system: "🔔",
};

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDropdown = ({ isOpen, onClose }: Props) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    getNotifications()
      .then((data) => {
        const sliced = data.slice(0, 5);
        setNotifications(sliced);
        if (sliced.some((n) => !n.is_read)) {
          markAllNotificationsRead().then(() =>
            setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })))
          );
        }
      })
      .finally(() => setLoading(false));
  }, [isOpen]);

  return (
    <NavDropdown isOpen={isOpen} onClose={onClose}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100">
        <span className="text-sm font-bold text-gray-900">Notifications</span>
      </div>

      {/* Body */}
      <div className="divide-y divide-gray-50">
        {loading ? (
          <div className="py-8 text-center text-sm text-gray-400">Loading...</div>
        ) : notifications.length === 0 ? (
          <div className="py-8 text-center">
            <Bell className="w-8 h-8 text-gray-200 mx-auto mb-2" />
            <p className="text-sm text-gray-400">No notifications yet</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className="flex gap-3 px-4 py-3 bg-white hover:bg-gray-50 transition-colors"
            >
              <span className="text-xl shrink-0 mt-0.5">
                {TYPE_ICONS[n.type] ?? "🔔"}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-snug text-gray-700">{n.title}</p>
                {n.body && (
                  <p className="text-xs text-gray-500 mt-0.5 truncate">{n.body}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">{timeAgo(n.created_at)}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </NavDropdown>
  );
};
