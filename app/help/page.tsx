import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { HelpCircle, BookOpen, ShieldCheck, ArrowLeft, Mail } from "lucide-react";

export default async function HelpCenterPage() {
  const user = await getCurrentUser();
  const returnUrl =
    user?.role === "ADMIN"
      ? "/admin/dashboard"
      : user?.role === "INSTRUCTOR"
      ? "/instructor/dashboard"
      : "/student/dashboard";

  const faqs = [
    {
      q: "How are digital certificates generated and verified?",
      a: "When a student completes 100% of course lessons, the system automatically issues a cryptographic certificate record. Anyone can verify its validity at /verify/[code].",
    },
    {
      q: "How can I switch between Admin, Instructor, and Student roles?",
      a: "Use the instant 'Demo Role' dropdown button located on the top right navigation bar to toggle between roles without logging out.",
    },
    {
      q: "How does quiz automatic scoring work?",
      a: "Quizzes evaluate submissions against verified answer keys in real time. Passing 75% unlocks progressive milestone achievements.",
    },
    {
      q: "Can instructors edit curriculum after publishing?",
      a: "Yes! Instructors can navigate to 'My Courses', select a course, and add sections or lessons anytime through the Curriculum Studio.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-6 lg:p-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <Link
            href={returnUrl}
            className="text-xs font-semibold text-slate-500 hover:text-primary-600 flex items-center gap-1.5 mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-slate-900">EduFlow Help Center & Knowledge Base</h1>
          <p className="text-xs text-slate-500 mt-1">
            Frequently asked questions, platform tutorials, and user guides.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-2"
            >
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-primary-600" />
                {f.q}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed pl-6">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-primary-600">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">Need direct engineering support?</h4>
              <p className="text-xs text-slate-400">Contact support@eduflow.com for assistance.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
