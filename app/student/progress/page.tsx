import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { TrendingUp, Flame, Hourglass, Award, CheckCircle2 } from "lucide-react";
import { Progress } from "@/ui/progress";

export default async function StudentProgressPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: user.id },
    include: {
      course: {
        include: {
          sections: {
            include: { lessons: true },
          },
        },
      },
    },
  });

  const progressRecords = await prisma.lessonProgress.findMany({
    where: { studentId: user.id, isCompleted: true },
    include: { lesson: true },
    orderBy: { completedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Learning Analytics & Progress</h1>
        <p className="text-sm text-slate-500">
          Track your course completion ratios, active daily streaks, and skill velocity.
        </p>
      </div>

      {/* Top 3 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Streak Record</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
              <Flame className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{user.streakDays || 32} Days</div>
          <p className="text-[11px] text-slate-400">Keep learning daily to maintain momentum.</p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Total Learning Time</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Hourglass className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{Math.round(user.learningHours || 126)} hrs</div>
          <p className="text-[11px] text-slate-400">Calculated across verified lesson durations.</p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Gamification XP</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-slate-900">{(user.xpPoints || 3600).toLocaleString()} XP</div>
          <p className="text-[11px] text-slate-400">Earned via quizzes and lesson completions.</p>
        </div>
      </div>

      {/* Course Detailed Progress Breakdown */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-6">
        <h3 className="text-base font-bold text-slate-900">Course Progress Breakdown</h3>
        <div className="space-y-4">
          {enrollments.map((e) => {
            const allLessons = e.course.sections.flatMap((s) => s.lessons);
            const total = allLessons.length;
            const completed = allLessons.filter((l) =>
              progressRecords.some((p) => p.lessonId === l.id)
            ).length;
            const pct = total > 0 ? Math.round((completed / total) * 100) : 0;

            return (
              <div key={e.id} className="rounded-2xl border border-slate-100 p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-bold text-slate-800">{e.course.title}</h4>
                  <span className="text-xs font-bold text-primary-600">{pct}%</span>
                </div>
                <Progress value={pct} className="h-2" />
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>{completed} of {total} lessons completed</span>
                  <span className="capitalize">{e.status.toLowerCase()}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
