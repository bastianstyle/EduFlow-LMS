import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FileCheck, CheckCircle2, Clock, ExternalLink } from "lucide-react";
import { Badge } from "@/ui/badge";
import { GradeSubmissionModal } from "./grade-modal";

export default async function InstructorSubmissionsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  // Find courses owned by this instructor
  const courses = await prisma.course.findMany({
    where: { instructorId: user.id },
    select: { id: true },
  });
  const courseIds = courses.map((c) => c.id);

  // Fetch submissions for assignments in these courses
  const submissions = await prisma.submission.findMany({
    where: {
      assignment: { courseId: { in: courseIds } },
    },
    include: {
      student: true,
      assignment: {
        include: { course: true },
      },
    },
    orderBy: { submittedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Student Submission & Grading Suite</h1>
        <p className="text-xs text-slate-500 mt-1">
          Evaluate submitted projects, provide constructive mentorship feedback, and post verified scores.
        </p>
      </div>

      <div className="space-y-4">
        {submissions.map((sub) => {
          const isGraded = sub.status === "GRADED";

          return (
            <div
              key={sub.id}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft transition hover:shadow-card space-y-4"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={
                      sub.student.avatar ||
                      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250"
                    }
                    alt={sub.student.name}
                    className="h-10 w-10 rounded-full object-cover border"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">
                      {sub.student.name} &bull; <span className="font-semibold text-primary-600">{sub.assignment.title}</span>
                    </h3>
                    <p className="text-xs text-slate-400">
                      {sub.assignment.course.title} &bull; Submitted on {new Date(sub.submittedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <div>
                  {isGraded ? (
                    <Badge variant="success" className="text-xs font-bold px-3 py-1">
                      Score: {sub.score} / {sub.assignment.maxScore}
                    </Badge>
                  ) : (
                    <Badge variant="warning" className="text-xs font-bold px-3 py-1">
                      Needs Grading
                    </Badge>
                  )}
                </div>
              </div>

              {/* Submission Solution */}
              <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  Student Submission Content
                </span>
                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line">
                  {sub.content}
                </p>
                {sub.attachmentUrl && (
                  <div className="pt-2">
                    <a
                      href={sub.attachmentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary-600 hover:underline"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      View Student Attachment / Link
                    </a>
                  </div>
                )}
              </div>

              {/* Feedback if Graded */}
              {isGraded && (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 block">
                    Recorded Feedback
                  </span>
                  <p className="text-xs text-emerald-900 leading-relaxed italic">
                    &quot;{sub.feedback}&quot;
                  </p>
                </div>
              )}

              <div className="flex justify-end pt-2 border-t border-slate-100">
                <GradeSubmissionModal submission={sub} />
              </div>
            </div>
          );
        })}

        {submissions.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
            <FileCheck className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-base font-semibold text-slate-800">No submissions yet</h3>
            <p className="text-xs text-slate-400 mt-1">
              Student submissions for your course assignments will appear here for grading.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
