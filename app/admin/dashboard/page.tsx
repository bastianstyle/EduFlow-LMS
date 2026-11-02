import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import {
  Users,
  ShieldCheck,
  BookOpen,
  Award,
  AlertCircle,
  Activity,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";

export default async function AdminDashboardPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  // Counts
  const totalUsers = await prisma.user.count();
  const totalInstructors = await prisma.user.count({ where: { role: "INSTRUCTOR" } });
  const totalStudents = await prisma.user.count({ where: { role: "STUDENT" } });
  const totalCourses = await prisma.course.count();
  const publishedCourses = await prisma.course.count({ where: { status: "PUBLISHED" } });
  const pendingCourses = await prisma.course.count({ where: { status: "PENDING" } });
  const totalCertificates = await prisma.certificate.count();
  const totalEnrollments = await prisma.enrollment.count();

  // Pending moderation queue
  const moderationQueue = await prisma.course.findMany({
    where: { status: "PENDING" },
    include: {
      instructor: true,
      category: true,
      sections: { include: { lessons: true } },
    },
    take: 5,
  });

  // Recent activity logs
  const activityLogs = await prisma.activityLog.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl bg-white p-6 border border-slate-100 shadow-soft">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Platform Governance & Administration
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Global metrics, course quality moderation, user access control, and audit logs.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/admin/courses">
            <Button size="sm" className="rounded-xl bg-primary-600 text-white font-semibold text-xs shadow-sm hover:bg-primary-700">
              Review Course Queue ({pendingCourses})
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Primary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Accounts</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{totalUsers}</div>
          <p className="text-[11px] text-slate-400">
            {totalInstructors} Instructors &bull; {totalStudents} Students
          </p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Published Courses</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <BookOpen className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{publishedCourses} / {totalCourses}</div>
          <p className="text-[11px] text-slate-400">{pendingCourses} awaiting approval</p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Total Enrollments</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-primary-600">
              <Activity className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{totalEnrollments}</div>
          <p className="text-[11px] text-slate-400">Active student course registrations</p>
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-semibold">Certificates Issued</span>
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-50 text-amber-500">
              <Award className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900">{totalCertificates}</div>
          <p className="text-[11px] text-slate-400">100% curriculum completion verified</p>
        </div>
      </div>

      {/* Course Moderation Queue */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary-600" />
            <h2 className="text-lg font-bold text-slate-900">
              Pending Course Approvals ({pendingCourses})
            </h2>
          </div>
          <Link href="/admin/courses" className="text-xs font-semibold text-primary-600 hover:underline">
            Manage All
          </Link>
        </div>

        {moderationQueue.length === 0 ? (
          <p className="text-xs text-slate-400 py-4 text-center">
            No courses in the pending moderation queue. Platform is up to date!
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {moderationQueue.map((c) => (
              <div key={c.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="warning">Awaiting Approval</Badge>
                    <span className="text-xs text-slate-400">{c.category.name}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{c.title}</h3>
                  <p className="text-xs text-slate-500">
                    Instructor: {c.instructor.name} &bull; {c.sections.length} Sections
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={`/admin/courses`}>
                    <Button size="sm" className="rounded-xl bg-primary-600 text-white font-semibold text-xs">
                      Inspect & Approve
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Activity Logs */}
      <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-purple-600" />
            <h2 className="text-lg font-bold text-slate-900">System Activity Logs</h2>
          </div>
          <Link href="/admin/activity" className="text-xs font-semibold text-primary-600 hover:underline">
            Full Audit Log
          </Link>
        </div>

        <div className="divide-y divide-slate-100">
          {activityLogs.map((log) => (
            <div key={log.id} className="flex items-center justify-between py-3 text-xs">
              <div>
                <span className="font-bold text-slate-800">{log.action}: </span>
                <span className="text-slate-600">{log.details}</span>
                {log.user && <span className="text-slate-400"> &bull; by {log.user.name}</span>}
              </div>
              <span className="text-[11px] text-slate-400">
                {new Date(log.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
