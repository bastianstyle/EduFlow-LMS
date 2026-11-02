"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Star,
  Clock,
  BookOpen,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { enrollCourseAction } from "@/actions/courses";

interface CatalogProps {
  courses: any[];
  categories: any[];
  currentUserId?: string;
}

export function CourseCatalog({ courses, categories, currentUserId }: CatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [selectedLevel, setSelectedLevel] = useState("ALL");
  const [enrollingId, setEnrollingId] = useState<string | null>(null);

  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchSearch =
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCat =
        selectedCategory === "ALL" || c.categoryId === selectedCategory;
      const matchLevel =
        selectedLevel === "ALL" || c.level === selectedLevel;
      return matchSearch && matchCat && matchLevel;
    });
  }, [courses, searchTerm, selectedCategory, selectedLevel]);

  const handleEnroll = async (courseId: string) => {
    setEnrollingId(courseId);
    const res = await enrollCourseAction(courseId);
    if (res.success && res.redirectTo) {
      window.location.href = res.redirectTo;
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Explore Course Catalog</h1>
          <p className="text-sm text-slate-500">
            Browse high-impact masterclasses taught by world-class industry leads.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by title, topic, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-xs outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-100"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setSelectedCategory("ALL")}
          className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
            selectedCategory === "ALL"
              ? "bg-primary-600 text-white shadow-sm"
              : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
          }`}
        >
          All Categories
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
              selectedCategory === cat.id
                ? "bg-primary-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.map((course) => {
          const totalLessons = course.sections.reduce(
            (acc: number, s: any) => acc + s.lessons.length,
            0
          );
          const isEnrolled = course.enrollments && course.enrollments.length > 0;
          const avgRating = course.reviews.length
            ? (
                course.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) /
                course.reviews.length
              ).toFixed(1)
            : "5.0";

          return (
            <div
              key={course.id}
              className="flex flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-soft transition hover:shadow-card hover:-translate-y-1"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-100">
                <img
                  src={
                    course.thumbnail ||
                    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
                  }
                  alt={course.title}
                  className="h-full w-full object-cover transition duration-300 hover:scale-105"
                />
                <div className="absolute left-3 top-3">
                  <Badge variant="blue" className="bg-white/95 text-primary-700 backdrop-blur-md">
                    {course.category.name}
                  </Badge>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span className="flex items-center gap-1 font-semibold text-amber-500">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                    {avgRating} ({course.reviews.length})
                  </span>
                  <span>&bull;</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    {totalLessons} lessons
                  </span>
                  <span>&bull;</span>
                  <span className="capitalize">{course.level.toLowerCase()}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 line-clamp-1 hover:text-primary-600 transition">
                  {course.title}
                </h3>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                  {course.subtitle || course.description}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-between border-t border-slate-100">
                  <div className="flex items-center gap-2">
                    <img
                      src={
                        course.instructor.avatar ||
                        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250"
                      }
                      alt={course.instructor.name}
                      className="h-7 w-7 rounded-full object-cover border"
                    />
                    <span className="text-xs font-semibold text-slate-700">
                      {course.instructor.name}
                    </span>
                  </div>

                  {isEnrolled ? (
                    <Link href={`/student/learn/${course.slug}`}>
                      <Button size="sm" variant="outline" className="h-8 text-xs font-semibold rounded-xl text-primary-600 border-primary-200 hover:bg-primary-50">
                        Resume Lesson
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      size="sm"
                      onClick={() => handleEnroll(course.id)}
                      disabled={enrollingId === course.id}
                      className="h-8 text-xs font-semibold rounded-xl bg-primary-600 text-white hover:bg-primary-700"
                    >
                      {enrollingId === course.id ? "Enrolling..." : "Enroll Now"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
