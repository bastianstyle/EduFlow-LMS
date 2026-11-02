import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { Radio, Video, Calendar, Users, Clock } from "lucide-react";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";

export default async function LiveClassesPage() {
  const user = await getCurrentUser();

  const sessions = [
    {
      id: "1",
      title: "Advanced Prototyping & Figma Variables",
      instructor: "Sarah Jenkins",
      instructorTitle: "Principal Designer at Stripe",
      status: "LIVE",
      attendees: 142,
      time: "Happening Now",
      description: "Interactive session building production design tokens, responsive cards, and dynamic prototyping.",
    },
    {
      id: "2",
      title: "Redux State Mgmt & Architecture Deep Dive",
      instructor: "David Chan",
      instructorTitle: "Staff Software Architect",
      status: "UPCOMING",
      attendees: 88,
      time: "Today at 02:30 PM",
      description: "Hands-on walkthrough of RTK Query cache synchronization and enterprise React state design.",
    },
    {
      id: "3",
      title: "Content Strategy 101 & UX Copywriting",
      instructor: "Emily Watson",
      instructorTitle: "Director of Content",
      status: "SCHEDULED",
      attendees: 64,
      time: "Tomorrow at 10:00 AM",
      description: "Writing clear UI microcopy, empty state communication, and error prevention UX frameworks.",
    },
  ];

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Live Interactive Classes</h1>
        <p className="text-sm text-slate-500">
          Join real-time workshops, ask questions directly to instructors, and review session recordings.
        </p>
      </div>

      <div className="space-y-4">
        {sessions.map((session) => (
          <div
            key={session.id}
            className="flex flex-col md:flex-row md:items-center justify-between gap-6 rounded-3xl border border-slate-100 bg-white p-6 shadow-soft transition hover:shadow-card"
          >
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                {session.status === "LIVE" ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 text-xs font-bold text-rose-600 border border-rose-200 animate-pulse">
                    <span className="h-2 w-2 rounded-full bg-rose-600" />
                    BROADCASTING LIVE
                  </span>
                ) : (
                  <Badge variant="blue">{session.time}</Badge>
                )}
                <span className="text-xs text-slate-400 flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" /> {session.attendees} registered
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900">{session.title}</h3>
              <p className="text-xs text-slate-500">{session.description}</p>
              <p className="text-xs font-semibold text-slate-700">
                Instructor: {session.instructor} &bull; <span className="font-normal text-slate-400">{session.instructorTitle}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              {session.status === "LIVE" ? (
                <Button className="h-10 rounded-xl bg-primary-600 px-6 font-semibold text-white shadow-md hover:bg-primary-700">
                  <Video className="mr-2 h-4 w-4" />
                  Join Room Now
                </Button>
              ) : (
                <Button variant="outline" className="h-10 rounded-xl border-slate-200 px-4 text-xs font-semibold">
                  <Clock className="mr-2 h-4 w-4" />
                  Add to Calendar
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
