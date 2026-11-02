import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { GraduationCap, HelpCircle, CheckCircle, Plus } from "lucide-react";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";

export default async function InstructorQuizzesPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const courses = await prisma.course.findMany({
    where: { instructorId: user.id },
    include: {
      quizzes: {
        include: {
          questions: true,
          attempts: true,
        },
      },
    },
  });

  const allQuizzes = courses.flatMap((c) =>
    c.quizzes.map((q) => ({ ...q, courseTitle: c.title }))
  );

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Question Bank & Quizzes</h1>
          <p className="text-xs text-slate-500 mt-1">
            Author interactive assessments, configure passing criteria, and inspect question difficulty.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {allQuizzes.map((quiz) => (
          <div
            key={quiz.id}
            className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-4"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant="blue">{quiz.courseTitle}</Badge>
                  <span className="text-xs text-slate-400">
                    Passing: {quiz.passingScore}% &bull; {quiz.timeLimitMinutes} min limit
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{quiz.title}</h3>
                <p className="text-xs text-slate-500 mt-0.5">{quiz.description}</p>
              </div>

              <div className="text-right">
                <span className="text-xs font-bold text-primary-600 block">
                  {quiz.attempts.length} Total Student Attempts
                </span>
                <span className="text-[11px] text-slate-400">
                  {quiz.questions.length} Questions Configured
                </span>
              </div>
            </div>

            {/* Questions List */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Authoring Question Preview
              </h4>
              <div className="space-y-2">
                {quiz.questions.map((q, qIdx) => {
                  let options: string[] = [];
                  try {
                    options = JSON.parse(q.optionsJson);
                  } catch {
                    options = [];
                  }

                  return (
                    <div
                      key={q.id}
                      className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">
                          Q{qIdx + 1}: {q.text}
                        </span>
                        <Badge variant="secondary">{q.points} Pts</Badge>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {options.map((opt, oIdx) => {
                          const isCorrect = String(oIdx) === q.correctAnswer;
                          return (
                            <div
                              key={oIdx}
                              className={`rounded-xl p-2 border font-medium ${
                                isCorrect
                                  ? "bg-emerald-50 border-emerald-300 text-emerald-800 font-bold"
                                  : "bg-white border-slate-200 text-slate-600"
                              }`}
                            >
                              {String.fromCharCode(65 + oIdx)}. {opt}
                              {isCorrect && " (Correct Key)"}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}

        {allQuizzes.length === 0 && (
          <div className="rounded-3xl border border-slate-200 bg-white p-12 text-center">
            <GraduationCap className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-base font-semibold text-slate-800">No quizzes configured</h3>
            <p className="text-xs text-slate-400 mt-1">
              Add curriculum quizzes through your course editor to test your learners.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
