import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import {
  BookOpen,
  CheckCircle,
  GraduationCap,
  Sparkles,
  Users,
  ShieldCheck,
  Video,
  Award,
  ArrowRight,
  Star,
  Clock,
} from "lucide-react";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";

export default async function LandingPage() {
  const user = await getCurrentUser();

  const featuredCourses = await prisma.course.findMany({
    where: { status: "PUBLISHED" },
    take: 6,
    include: {
      category: true,
      instructor: true,
      sections: {
        include: { lessons: true },
      },
      reviews: true,
    },
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white shadow-md transition group-hover:scale-105">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">
              EduFlow
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <Link href="#features" className="hover:text-primary-600 transition">Features</Link>
            <Link href="#courses" className="hover:text-primary-600 transition">Courses</Link>
            <Link href="#demo" className="hover:text-primary-600 transition">Demo Roles</Link>
            <Link href="/verify" className="hover:text-primary-600 transition">Verify Certificate</Link>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <Link
                href={
                  user.role === "ADMIN"
                    ? "/admin/dashboard"
                    : user.role === "INSTRUCTOR"
                    ? "/instructor/dashboard"
                    : "/student/dashboard"
                }
              >
                <Button className="rounded-xl bg-primary-600 text-white font-semibold shadow-sm hover:bg-primary-700">
                  Go to {user.role.toLowerCase()} Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost" className="font-semibold text-slate-700">
                    Sign In
                  </Button>
                </Link>
                <Link href="/register">
                  <Button className="rounded-xl bg-primary-600 text-white font-semibold shadow-sm hover:bg-primary-700">
                    Get Started Free
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-xs font-semibold text-primary-700">
              <Sparkles className="h-4 w-4" />
              <span>Next-Gen Enterprise Learning Management System</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl">
              Empower learning with{" "}
              <span className="text-primary-600">seamless education.</span>
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed">
              Connect administrators, instructors, and learners in a high-performance educational platform. Built for modern teams, universities, and self-paced career masterclasses.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link href="/login">
                <Button size="lg" className="rounded-xl bg-primary-600 px-8 text-base font-semibold text-white shadow-lg shadow-blue-500/25 hover:bg-primary-700">
                  Launch Demo Workspace
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="#demo">
                <Button size="lg" variant="outline" className="rounded-xl border-slate-300 text-slate-700 px-6 text-base font-semibold hover:bg-slate-50">
                  Test Demo Roles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Roles Quick Launch Grid */}
      <section id="demo" className="py-16 bg-white border-y border-slate-200/80">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-wider text-primary-600">
              One-Click Role Switcher
            </h2>
            <p className="mt-2 text-3xl font-extrabold text-slate-900">
              Explore EduFlow from any perspective
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Student Role Card */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm hover:shadow-md transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700 mb-4">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Student Experience</h3>
              <p className="mt-1 text-xs text-slate-500">Alex Hernandez (Featured in UI)</p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  Continue UI/UX Masterclass (16/20 lessons)
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  Live streak (32 days) & 3.6K XP gamification
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-500" />
                  Take timed quizzes & receive instant certificates
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/login?role=STUDENT">
                  <Button className="w-full rounded-xl bg-emerald-600 text-white hover:bg-emerald-700">
                    Login as Student
                  </Button>
                </Link>
              </div>
            </div>

            {/* Instructor Role Card */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm hover:shadow-md transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-100 text-primary-700 mb-4">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Instructor Studio</h3>
              <p className="mt-1 text-xs text-slate-500">Sarah Jenkins (Principal Designer)</p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-500" />
                  Build curriculum sections & video lessons
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-500" />
                  Grade assignments & provide written feedback
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-primary-500" />
                  Publish quizzes with multiple choice & explanations
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/login?role=INSTRUCTOR">
                  <Button className="w-full rounded-xl bg-primary-600 text-white hover:bg-primary-700">
                    Login as Instructor
                  </Button>
                </Link>
              </div>
            </div>

            {/* Admin Role Card */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50/50 p-6 shadow-sm hover:shadow-md transition">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-100 text-purple-700 mb-4">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Admin Control Center</h3>
              <p className="mt-1 text-xs text-slate-500">Eleanor Vance (Platform Admin)</p>
              <ul className="mt-4 space-y-2 text-xs text-slate-600">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  Approve, moderate, or reject submitted courses
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  Manage users, roles, categories, and permissions
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-purple-500" />
                  Audit activity logs & inspect platform metrics
                </li>
              </ul>
              <div className="mt-6">
                <Link href="/login?role=ADMIN">
                  <Button className="w-full rounded-xl bg-purple-600 text-white hover:bg-purple-700">
                    Login as Admin
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Grid */}
      <section id="courses" className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-primary-600">
                Explore The Catalog
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-slate-900">
                Featured Masterclasses
              </p>
            </div>
            <Link
              href="/student/courses"
              className="mt-4 sm:mt-0 text-sm font-semibold text-primary-600 hover:text-primary-700 hover:underline flex items-center gap-1"
            >
              Browse all courses
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {featuredCourses.map((course) => {
              const totalLessons = course.sections.reduce(
                (sum, s) => sum + s.lessons.length,
                0
              );
              const avgRating = course.reviews.length
                ? (
                    course.reviews.reduce((acc, r) => acc + r.rating, 0) /
                    course.reviews.length
                  ).toFixed(1)
                : "5.0";

              return (
                <div
                  key={course.id}
                  className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-soft transition hover:shadow-card hover:-translate-y-1"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                    <img
                      src={
                        course.thumbnail ||
                        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
                      }
                      alt={course.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <div className="absolute left-3 top-3">
                      <Badge variant="blue" className="bg-white/95 text-primary-700 backdrop-blur-md">
                        {course.category.name}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                      <span className="flex items-center gap-1 font-semibold text-amber-500">
                        <Star className="h-3.5 w-3.5 fill-amber-400" />
                        {avgRating} ({course.reviews.length})
                      </span>
                      <span>&bull;</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {totalLessons} lessons
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition line-clamp-1">
                      {course.title}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {course.subtitle || course.description}
                    </p>

                    <div className="mt-auto pt-6 flex items-center justify-between border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            course.instructor.avatar ||
                            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250"
                          }
                          alt={course.instructor.name}
                          className="h-7 w-7 rounded-full object-cover"
                        />
                        <span className="text-xs font-semibold text-slate-700">
                          {course.instructor.name}
                        </span>
                      </div>

                      <span className="text-base font-extrabold text-primary-600">
                        {course.price === 0 ? "Free" : `$${course.price}`}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-primary-600" />
            <span className="font-bold text-slate-900">EduFlow LMS</span>
          </div>
          <p className="text-xs text-slate-500">
            &copy; 2026 EduFlow Inc. Built with Next.js App Router, Prisma ORM, and Tailwind CSS.
          </p>
        </div>
      </footer>
    </div>
  );
}
