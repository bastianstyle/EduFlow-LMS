"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Radio, BellRing, Check, Video } from "lucide-react";

interface LiveClass {
  id: string;
  title: string;
  instructor: string;
  timeTag: "LIVE" | "02:30PM" | "Tomorrow";
  isLive?: boolean;
}

export function LiveClassesWidget() {
  const [reminders, setReminders] = useState<Record<string, boolean>>({});

  const classes: LiveClass[] = [
    {
      id: "1",
      title: "Advanced Prototyping",
      instructor: "Sarah Jenkins",
      timeTag: "LIVE",
      isLive: true,
    },
    {
      id: "2",
      title: "Redux State Mgmt",
      instructor: "David Chan",
      timeTag: "02:30PM",
      isLive: false,
    },
    {
      id: "3",
      title: "Content Strategy 101",
      instructor: "Emily Watson",
      timeTag: "Tomorrow",
      isLive: false,
    },
  ];

  const toggleReminder = (id: string) => {
    setReminders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-primary-600">
            <Radio className="h-4 w-4" />
          </div>
          <h2 className="text-base font-bold text-slate-800">Upcoming Live Classes</h2>
        </div>
        <Link
          href="/student/live-classes"
          className="text-xs font-semibold text-primary-600 hover:text-primary-700 hover:underline"
        >
          View All
        </Link>
      </div>

      <div className="divide-y divide-slate-100">
        {classes.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5"
          >
            <div>
              <h4 className="text-sm font-semibold text-slate-800">{item.title}</h4>
              <p className="text-xs text-slate-400 mt-0.5">Instructor: {item.instructor}</p>
            </div>

            <div className="flex items-center gap-3">
              {item.isLive ? (
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2.5 py-0.5 text-xs font-bold text-rose-600 border border-rose-200 animate-pulse">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-600"></span>
                  LIVE
                </span>
              ) : (
                <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                  {item.timeTag}
                </span>
              )}

              {item.isLive ? (
                <Link href={`/student/live-classes/${item.id}`}>
                  <Button size="sm" className="bg-primary-600 text-white hover:bg-primary-700 h-8 text-xs font-semibold rounded-lg px-3">
                    <Video className="mr-1.5 h-3.5 w-3.5" />
                    Join Now
                  </Button>
                </Link>
              ) : (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => toggleReminder(item.id)}
                  className={`h-8 text-xs font-semibold rounded-lg px-3 ${
                    reminders[item.id] ? "bg-emerald-50 text-emerald-700 border-emerald-300" : ""
                  }`}
                >
                  {reminders[item.id] ? (
                    <>
                      <Check className="mr-1.5 h-3.5 w-3.5 text-emerald-600" />
                      Saved
                    </>
                  ) : (
                    <>
                      <BellRing className="mr-1.5 h-3.5 w-3.5 text-slate-400" />
                      Set Reminder
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
