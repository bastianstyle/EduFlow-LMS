import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { PlusCircle, BookOpen, Clock, Users, Edit, Trash2 } from "lucide-react";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";

export default async function InstructorCoursesPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const courses = await prisma.course.findMany({
    where: { instructorId: user.id },
    include: {
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Course Management</h1>
          <p className="text-xs text-slate-500 mt-1">
            Build and publish new courses, structure learning modules, and monitor registrations.
          </p>
        </div>
        <Link href="/instructor/courses/new">
          <Button className="rounded-xl bg-primary-600 text-white font-semibold shadow-sm hover:bg-primary-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Course
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => {
          const lessonCount = course.sections.reduce((sum, s) => sum + s.lessons.length, 0);

          return (
            <div
              key={course.id}
              className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft transition hover:shadow-card"
            >
              <div className="relative h-44 w-full bg-slate-100">
                <img
                  src={
                    course.thumbnail ||
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
                  }
                  alt={course.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute left-3 top-3">
                  <Badge
                    variant={
                      course.status === "PUBLISHED"
                        ? "success"
                        : course.status === "PENDING"
                        ? "warning"
                        : "secondary"
                    }
                  >
                    {course.status}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 space-y-3">
                <span className="text-xs font-semibold text-primary-600">{course.category.name}</span>
                <h3 className="text-base font-bold text-slate-900 line-clamp-1">{course.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {course.subtitle || course.description}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-3.5 w-3.5" />
                    {lessonCount} Lessons
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="h-3.5 w-3.5" />
                    {course.enrollments.length} Students
                  </span>
                </div>

                <div className="pt-2 flex items-center justify-between gap-2">
                  <Link href={`/instructor/courses/${course.id}`} className="flex-1">
                    <Button size="sm" className="w-full rounded-xl bg-primary-600 text-white text-xs font-semibold">
                      Edit Curriculum
                    </Button>
                  </Link>
                  <Link href={`/student/learn/${course.slug}`} target="_blank">
                    <Button size="sm" variant="outline" className="rounded-xl text-xs">
                      Preview
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
