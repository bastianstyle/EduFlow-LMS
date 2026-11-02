"use client";

import React from "react";
import { Users, CheckCircle2, Hourglass, Flame } from "lucide-react";

interface StatsGridProps {
  enrolledCount?: number;
  completedCount?: number;
  learningHours?: number;
  streakDays?: number;
}

export function StatsGrid({
  enrolledCount = 24,
  completedCount = 6,
  learningHours = 45,
  streakDays = 32,
}: StatsGridProps) {
  const stats = [
    {
      label: "Enrolled",
      value: enrolledCount.toString().padStart(2, "0"),
      icon: Users,
      iconColor: "text-blue-600 bg-blue-50 border-blue-100",
    },
    {
      label: "Completed",
      value: completedCount.toString().padStart(2, "0"),
      icon: CheckCircle2,
      iconColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      label: "Learning Hours",
      value: `${Math.round(learningHours)} hrs`,
      icon: Hourglass,
      iconColor: "text-purple-600 bg-purple-50 border-purple-100",
    },
    {
      label: "Streak",
      value: `${streakDays} Days`,
      icon: Flame,
      iconColor: "text-amber-500 bg-amber-50 border-amber-100",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3.5">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-100 bg-white p-4 shadow-soft transition hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">{stat.label}</span>
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-xl border ${stat.iconColor}`}
              >
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-2 text-xl font-bold tracking-tight text-slate-900">
              {stat.value}
            </div>
          </div>
        );
      })}
    </div>
  );
}
