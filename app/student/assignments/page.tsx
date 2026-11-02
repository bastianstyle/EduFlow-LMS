import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FileText, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { Badge } from "@/ui/badge";
import { AssignmentSubmissionDrawer } from "./assignment-drawer";

export default async function StudentAssignmentsPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  // Fetch student enrolled courses
  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: user.id },
    select: { courseId: true },
  });
  const courseIds = enrollments.map((e) => e.courseId);

  // Fetch all assignments for enrolled courses
  const assignments = await prisma.assignment.findMany({
    where: { courseId: { in: courseIds } },
    include: {
      course: true,
      submissions: {
        where: { studentId: user.id },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Assignments & Projects</h1>
        <p className="text-sm text-slate-500">
          Review project guidelines, submit your deliverables, and receive instructor feedback.
        </p>
      </div>

      <div className="space-y-4">
        {assignments.length === 0 ? (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
            <FileText className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-base font-semibold text-slate-800">No assignments posted yet</h3>
            <p className="text-xs text-slate-400 mt-1">Your enrolled courses do not have open deliverables right now.</p>
          </div>
        ) : (
          assignments.map((assign) => {
            const submission = assign.submissions[0];
            const isGraded = submission?.status === "GRADED";
            const isSubmitted = !!submission;

            return (
              <div
                key={assign.id}
                className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft transition hover:shadow-card space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="blue">{assign.course.title}</Badge>
                      {assign.dueDate && (
                        <span className="text-[11px] font-medium text-slate-400">
                          Due: {new Date(assign.dueDate).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900">{assign.title}</h3>
                  </div>

                  <div>
                    {isGraded ? (
                      <div className="flex items-center gap-2">
                        <Badge variant="success" className="text-xs font-bold px-3 py-1">
                          Score: {submission.score} / {assign.maxScore}
                        </Badge>
                      </div>
                    ) : isSubmitted ? (
                      <Badge variant="warning" className="text-xs font-bold px-3 py-1">
                        Pending Evaluation
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-xs font-bold px-3 py-1">
                        Not Submitted
                      </Badge>
                    )}
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                  {assign.description}
                </p>

                {/* Graded Feedback Card */}
                {isGraded && (
                  <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-4 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      <h4 className="text-xs font-bold text-emerald-900">
                        Instructor Feedback:
                      </h4>
                    </div>
                    <p className="text-xs text-emerald-800 leading-relaxed">
                      &quot;{submission.feedback}&quot;
                    </p>
                  </div>
                )}

                {/* Submission Drawer / Modal */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-400">
                    Max Score: {assign.maxScore} points
                  </span>
                  <AssignmentSubmissionDrawer
                    assignmentId={assign.id}
                    submission={submission}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
