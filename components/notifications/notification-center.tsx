"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Bell, CheckCheck, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/ui/button";
import { markNotificationAsReadAction, markAllNotificationsAsReadAction } from "@/actions/notifications";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  link?: string | null;
  createdAt: Date | string;
}

interface NotificationCenterProps {
  notifications: NotificationItem[];
}

export function NotificationCenter({ notifications: initialNotifications }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState(initialNotifications);

  const handleMarkAll = async () => {
    await markAllNotificationsAsReadAction();
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const handleMarkOne = async (id: string) => {
    await markNotificationAsReadAction(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  return (
    <div className="space-y-4 max-w-3xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Notifications</h1>
          <p className="text-sm text-slate-500">Stay updated with course activities, grades, and platform alerts.</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleMarkAll}
          className="rounded-xl border-slate-200 text-slate-700"
        >
          <CheckCheck className="mr-1.5 h-4 w-4 text-primary-600" />
          Mark all as read
        </Button>
      </div>

      <div className="space-y-3">
        {notifications.length === 0 ? (
          <div className="rounded-2xl border border-slate-100 bg-white p-12 text-center">
            <Bell className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-base font-semibold text-slate-800">All caught up!</h3>
            <p className="mt-1 text-sm text-slate-400">You don&apos;t have any notifications right now.</p>
          </div>
        ) : (
          notifications.map((item) => (
            <div
              key={item.id}
              className={`flex items-start justify-between gap-4 rounded-2xl border p-4 transition ${
                item.isRead ? "border-slate-100 bg-white" : "border-primary-100 bg-blue-50/40 shadow-sm"
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-1 h-2.5 w-2.5 flex-shrink-0 rounded-full ${
                    item.isRead ? "bg-slate-300" : "bg-primary-600 ring-2 ring-primary-100"
                  }`}
                />
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-slate-800">{item.title}</h4>
                    <span className="text-[11px] text-slate-400">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">{item.message}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {item.link && (
                  <Link href={item.link}>
                    <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg">
                      View
                      <ExternalLink className="ml-1 h-3 w-3" />
                    </Button>
                  </Link>
                )}
                {!item.isRead && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleMarkOne(item.id)}
                    className="h-8 text-xs text-slate-500"
                  >
                    Dismiss
                  </Button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
