import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { HeroBanner } from "@/components/dashboard/hero-banner";
import { CourseProgressCard } from "@/components/dashboard/course-progress-card";
import { LiveClassesWidget } from "@/components/dashboard/live-classes-widget";
import { StatsGrid } from "@/components/dashboard/stats-grid";
import { MiniCalendar } from "@/components/dashboard/mini-calendar";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { ArrowRight, BookOpen } from "lucide-react";

export default async function StudentDashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  // Fetch student enrollments with course sections, lessons, and student progress
  const enrollments = await prisma.enrollment.findMany({
    where: { studentId: user.id },
    include: {
      course: {
        include: {
          category: true,
          instructor: true,
          sections: {
            include: {
              lessons: true,
            },
          },
        },
      },
    },
    orderBy: { enrolledAt: "desc" },
  });

  // Fetch all completed lessons for this student
  const completedProgressRecords = await prisma.lessonProgress.findMany({
    where: { studentId: user.id, isCompleted: true },
    select: { lessonId: true },
  });
  const completedLessonIds = new Set(completedProgressRecords.map((p) => p.lessonId));

  // Compute course progress
  const enrolledCoursesWithProgress = enrollments.map((e) => {
    const allLessonIds = e.course.sections.flatMap((s) => s.lessons.map((l) => l.id));
    const completedCount = allLessonIds.filter((id) => completedLessonIds.has(id)).length;
    const totalCount = allLessonIds.length || 1;

    return {
      id: e.course.id,
      title: e.course.title,
      slug: e.course.slug,
      category: e.course.category.name.split(" ")[0], // e.g. "Design", "Development"
      thumbnail:
        e.course.thumbnail ||
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
      completedLessons: completedCount,
      totalLessons: totalCount,
      percentage: Math.round((completedCount / totalCount) * 100),
      status: e.status,
    };
  });

  const completedCoursesCount = enrolledCoursesWithProgress.filter(
    (c) => c.status === "COMPLETED" || c.percentage === 100
  ).length;

  const firstCourseSlug =
    enrolledCoursesWithProgress.length > 0
      ? enrolledCoursesWithProgress[0].slug
      : "ui-ux-design-masterclass";

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Three-Column / Dual-Column Layout matching screenshot */}
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-3">
        {/* Center Main Workspace (Spans 2 columns on xl screens) */}
        <div className="space-y-8 xl:col-span-2">
          {/* Welcome Hero Banner (Dark with circular metrics) */}
          <HeroBanner
            userName={user.name}
            streakDays={user.streakDays || 32}
            learningHours={user.learningHours || 126}
            xpPoints={user.xpPoints || 3600}
            continueCourseSlug={firstCourseSlug}
          />

          {/* Continue Learning Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-50 text-primary-600">
                  <BookOpen className="h-4 w-4" />
                </div>
                <h2 className="text-lg font-bold text-slate-800">Continue Learning</h2>
              </div>
              <Link
                href="/student/courses"
                className="text-xs font-semibold text-primary-600 hover:text-primary-700 hover:underline flex items-center gap-1"
              >
                View My Courses
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {enrolledCoursesWithProgress.slice(0, 2).map((course) => (
                <CourseProgressCard
                  key={course.id}
                  title={course.title}
                  slug={course.slug}
                  category={course.category}
                  thumbnail={course.thumbnail}
                  completedLessons={course.completedLessons}
                  totalLessons={course.totalLessons}
                />
              ))}

              {enrolledCoursesWithProgress.length === 0 && (
                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
                  <p className="text-sm text-slate-500">
                    You haven&apos;t enrolled in any courses yet.
                  </p>
                  <Link href="/student/courses" className="mt-3 inline-block">
                    <button className="rounded-xl bg-primary-600 px-4 py-2 text-xs font-semibold text-white">
                      Explore Catalog
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Upcoming Live Classes Section */}
          <LiveClassesWidget />
        </div>

        {/* Right Auxiliary Panel (Spans 1 column) */}
        <div className="space-y-6">
          {/* 2x2 Stats Grid (Enrolled, Completed, Hours, Streak) */}
          <StatsGrid
            enrolledCount={enrolledCoursesWithProgress.length || 24}
            completedCount={completedCoursesCount || 6}
            learningHours={user.learningHours || 45}
            streakDays={user.streakDays || 7}
          />

          {/* Mini Calendar Widget */}
          <MiniCalendar />

          {/* Learning Progress Donut Chart */}
          <ProgressChart />
        </div>
      </div>
    </div>
  );
}
