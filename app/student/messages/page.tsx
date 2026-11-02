import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { MessageSquare, Send, User, CheckCircle2 } from "lucide-react";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";

export default async function StudentMessagesPage() {
  const user = await getCurrentUser();

  const mockConversations = [
    {
      id: "1",
      sender: "Dr. Sarah Jenkins",
      role: "Course Instructor",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250",
      lastMessage: "Great job on your Module 2 UI Wireframing assignment! Check the feedback drawer.",
      time: "10:30 AM",
      unread: true,
    },
    {
      id: "2",
      sender: "Prof. Michael Chang",
      role: "Lead Python Faculty",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=250",
      lastMessage: "The Live AMA for Machine Learning begins this Friday at 16:00 UTC.",
      time: "Yesterday",
      unread: false,
    },
    {
      id: "3",
      sender: "EduFlow Academic Advisor",
      role: "Student Support",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=250",
      lastMessage: "Your digital certificate of completion has been cryptographically verified.",
      time: "2 days ago",
      unread: false,
    },
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Student Mentorship & Messages</h1>
        <p className="text-xs text-slate-500 mt-1">
          Direct communication channels with your course instructors, academic advisors, and peers.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 rounded-3xl border border-slate-100 bg-white shadow-soft overflow-hidden min-h-[550px]">
        {/* Left Contact List */}
        <div className="border-r border-slate-100 p-4 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 px-2">
            Active Threads
          </h3>
          <div className="space-y-1">
            {mockConversations.map((c, idx) => (
              <div
                key={c.id}
                className={`p-3 rounded-2xl cursor-pointer transition flex items-start gap-3 ${
                  idx === 0
                    ? "bg-primary-50 border border-primary-100"
                    : "hover:bg-slate-50 border border-transparent"
                }`}
              >
                <img
                  src={c.avatar}
                  alt={c.sender}
                  className="h-10 w-10 rounded-full object-cover border"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-slate-900 truncate">{c.sender}</h4>
                    <span className="text-[10px] text-slate-400">{c.time}</span>
                  </div>
                  <span className="text-[10px] text-primary-600 font-semibold">{c.role}</span>
                  <p className="text-xs text-slate-500 truncate mt-1">{c.lastMessage}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Active Chat Box */}
        <div className="lg:col-span-2 flex flex-col justify-between p-6 bg-slate-50/50">
          {/* Chat Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250"
                alt="Sarah Jenkins"
                className="h-10 w-10 rounded-full object-cover"
              />
              <div>
                <h3 className="text-sm font-bold text-slate-900">Dr. Sarah Jenkins</h3>
                <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  Online &bull; Design Systems & Figma Instructor
                </span>
              </div>
            </div>
            <Badge variant="blue">Faculty Mentor</Badge>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 py-6 space-y-4 overflow-y-auto">
            <div className="flex gap-3 max-w-md">
              <div className="rounded-2xl bg-white border border-slate-200 p-4 text-xs text-slate-700 shadow-sm space-y-1">
                <span className="font-bold text-slate-900 block">Dr. Sarah Jenkins</span>
                <p>Hello Alex! How are you finding the Design Tokens module?</p>
                <span className="text-[10px] text-slate-400 block text-right">10:15 AM</span>
              </div>
            </div>

            <div className="flex gap-3 max-w-md ml-auto justify-end">
              <div className="rounded-2xl bg-primary-600 text-white p-4 text-xs shadow-sm space-y-1">
                <p>Hi Sarah! The spacing scale and responsive layout tokens made total sense. Just completed the quiz!</p>
                <span className="text-[10px] text-blue-200 block text-right">10:22 AM &bull; Read</span>
              </div>
            </div>

            <div className="flex gap-3 max-w-md">
              <div className="rounded-2xl bg-white border border-slate-200 p-4 text-xs text-slate-700 shadow-sm space-y-1">
                <span className="font-bold text-slate-900 block">Dr. Sarah Jenkins</span>
                <p>Great job on your Module 2 UI Wireframing assignment! Check the feedback drawer for remarks on font scaling.</p>
                <span className="text-[10px] text-slate-400 block text-right">10:30 AM</span>
              </div>
            </div>
          </div>

          {/* Input Box */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your question or message for Dr. Sarah Jenkins..."
                className="flex-1 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-xs outline-none focus:border-primary-500 shadow-sm"
              />
              <Button size="sm" className="rounded-2xl bg-primary-600 text-white font-semibold text-xs px-5 shadow-sm">
                <Send className="h-3.5 w-3.5 mr-1.5" />
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
