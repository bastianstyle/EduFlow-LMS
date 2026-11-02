import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CourseModerationTable } from "./moderation-table";

export default async function AdminCoursesPage() {
  const user = await getCurrentUser();

  const courses = await prisma.course.findMany({
    include: {
      instructor: true,
      category: true,
      enrollments: true,
      sections: {
        include: { lessons: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Course Quality & Moderation</h1>
        <p className="text-xs text-slate-500 mt-1">
          Review submitted curriculums, approve pending releases, or archive outdated content.
        </p>
      </div>

      <CourseModerationTable courses={courses} />
    </div>
  );
}
