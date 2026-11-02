import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  BookOpen,
  Users,
  FileCheck,
  Star,
  PlusCircle,
  Clock,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";

export default async function InstructorDashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  // Fetch courses owned by this instructor
  const courses = await prisma.course.findMany({
    where: { instructorId: user.id },
    include: {
      category: true,
      enrollments: true,
      reviews: true,
      sections: {
        include: { lessons: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Calculate stats
  const totalStudents = courses.reduce((sum, c) => sum + c.enrollments.length, 0);
  const totalCourses = courses.length;

  // Pending submissions
  const courseIds = courses.map((c) => c.id);
  const pendingSubmissions = await prisma.submission.findMany({
    where: {
      assignment: { courseId: { in: courseIds } },
      status: "SUBMITTED",
    },
    include: {
      assignment: { include: { course: true } },
      student: true,
    },
    orderBy: { submittedAt: "desc" },
    take: 5,
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Top Welcome & Quick Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl bg-white p-6 border border-slate-100 shadow-soft">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Instructor Studio &bull; {user.name}
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Manage your courses, author video lectures, and evaluate student project submissions.
          </p>
        </div>
        <Link href="/instructor/courses/new">
          <Button className="rounded-xl bg-primary-600 font-semibold text-white shadow-md hover:bg-primary-700">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Course
          </Button>
        </Link>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Students</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-primary-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{totalStudents}</div>
          <p className="text-[11px] text-slate-400">Enrolled across all courses</p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Active Courses</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <BookOpen className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{totalCourses}</div>
          <p className="text-[11px] text-slate-400">Curriculums published</p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Pending Grading</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
              <FileCheck className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{pendingSubmissions.length}</div>
          <p className="text-[11px] text-slate-400">Submissions awaiting review</p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Instructor Rating</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Star className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">4.9 / 5.0</div>
          <p className="text-[11px] text-slate-400">Based on student feedback</p>
        </div>
      </div>

      {/* Courses List */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-900">Your Authored Courses</h2>
          <Link href="/instructor/courses" className="text-xs font-semibold text-primary-600 hover:underline">
            View All ({courses.length})
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {courses.map((course) => {
            const lessonCount = course.sections.reduce(
              (acc, s) => acc + s.lessons.length,
              0
            );

            return (
              <div
                key={course.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      course.thumbnail ||
                      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
                    }
                    alt={course.title}
                    className="h-16 w-24 rounded-xl object-cover border"
                  />
                  <div>
                    <div className="flex items-center gap-2 mb-1">
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
                      <span className="text-xs text-slate-400">{course.category.name}</span>
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">{course.title}</h3>
                    <p className="text-xs text-slate-500">
                      {course.sections.length} sections &bull; {lessonCount} lessons &bull; {course.enrollments.length} enrolled students
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/student/learn/${course.slug}`} target="_blank">
                    <Button size="sm" variant="outline" className="rounded-xl text-xs">
                      Preview Course
                    </Button>
                  </Link>
                  <Link href={`/instructor/courses/${course.id}`}>
                    <Button size="sm" className="rounded-xl bg-primary-600 text-white text-xs font-semibold">
                      Manage Curriculum
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pending Submissions Table */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h2 className="text-lg font-bold text-slate-900">Recent Student Submissions</h2>
          <Link href="/instructor/submissions" className="text-xs font-semibold text-primary-600 hover:underline">
            Go to Grading Suite
          </Link>
        </div>

        {pendingSubmissions.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">
            No submissions pending evaluation. You are all caught up!
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {pendingSubmissions.map((sub) => (
              <div
                key={sub.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-3.5"
              >
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {sub.student.name} &bull; <span className="font-medium text-slate-500">{sub.assignment.title}</span>
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Course: {sub.assignment.course.title} &bull; Submitted: {new Date(sub.submittedAt).toLocaleDateString()}
                  </p>
                </div>

                <Link href="/instructor/submissions">
                  <Button size="sm" className="rounded-xl bg-primary-600 text-white font-semibold text-xs">
                    Review & Grade
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
