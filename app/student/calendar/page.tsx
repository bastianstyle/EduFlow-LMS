import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { Calendar as CalendarIcon, Clock, Video, FileText, CheckCircle2 } from "lucide-react";
import { Badge } from "@/ui/badge";

export default async function StudentCalendarPage() {
  const user = await getCurrentUser();

  const academicEvents = [
    {
      id: "1",
      date: "Today, 14:00 - 15:30 WIB",
      title: "Interactive Live Coding: Full-Stack React & Next.js",
      course: "Modern Web Development Bootcamp",
      type: "LIVE_CLASS",
      instructor: "Alex Rivera, M.Sc",
      status: "Upcoming",
    },
    {
      id: "2",
      date: "Tomorrow, 23:59 WIB",
      title: "Design System Architecture Wireframe Submission",
      course: "UI/UX Masterclass & Design Systems",
      type: "DEADLINE",
      instructor: "Dr. Sarah Jenkins",
      status: "Due Soon",
    },
    {
      id: "3",
      date: "Friday, 16:00 - 17:00 WIB",
      title: "PyTorch & Deep Learning Foundations AMA",
      course: "Applied Python for Artificial Intelligence",
      type: "LIVE_CLASS",
      instructor: "Prof. Michael Chang",
      status: "Scheduled",
    },
    {
      id: "4",
      date: "Next Monday, 10:00 WIB",
      title: "Mid-Term Assessment Quiz: Tailwind & Responsive Layouts",
      course: "Modern Web Development Bootcamp",
      type: "QUIZ",
      instructor: "Alex Rivera, M.Sc",
      status: "Upcoming",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Academic Schedule & Deadlines</h1>
        <p className="text-xs text-slate-500 mt-1">
          Synchronize your live sessions, workshop broadcasts, and project deadlines.
        </p>
      </div>

      <div className="space-y-4">
        {academicEvents.map((evt) => (
          <div
            key={evt.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl border border-slate-100 bg-white p-6 shadow-soft transition hover:shadow-card"
          >
            <div className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                  evt.type === "LIVE_CLASS"
                    ? "bg-rose-50 text-rose-600"
                    : evt.type === "DEADLINE"
                    ? "bg-amber-50 text-amber-600"
                    : "bg-blue-50 text-primary-600"
                }`}
              >
                {evt.type === "LIVE_CLASS" ? (
                  <Video className="h-6 w-6" />
                ) : (
                  <Clock className="h-6 w-6" />
                )}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={
                      evt.type === "LIVE_CLASS"
                        ? "danger"
                        : evt.type === "DEADLINE"
                        ? "warning"
                        : "blue"
                    }
                  >
                    {evt.type === "LIVE_CLASS" ? "Live Broadcast" : evt.type}
                  </Badge>
                  <span className="text-xs text-slate-400 font-medium">{evt.date}</span>
                </div>
                <h3 className="text-sm font-bold text-slate-900">{evt.title}</h3>
                <p className="text-xs text-slate-500">
                  {evt.course} &bull; Instructor: {evt.instructor}
                </p>
              </div>
            </div>

            <div className="sm:text-right">
              <span className="inline-block rounded-xl bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
                {evt.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
