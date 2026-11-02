"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { approveCourseAction, deleteCourseAction } from "@/actions/courses";
import { Check, Archive, Trash2, ExternalLink } from "lucide-react";

interface ModerationProps {
  courses: any[];
}

export function CourseModerationTable({ courses }: ModerationProps) {
  const [filter, setFilter] = useState("ALL");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filtered = courses.filter((c) => {
    if (filter === "ALL") return true;
    return c.status === filter;
  });

  const handleStatus = async (courseId: string, status: "PUBLISHED" | "ARCHIVED" | "DRAFT") => {
    setLoadingId(courseId);
    await approveCourseAction(courseId, status);
    setLoadingId(null);
    window.location.reload();
  };

  const handleDelete = async (courseId: string) => {
    if (!confirm("Are you sure you want to permanently delete this course?")) return;
    setLoadingId(courseId);
    await deleteCourseAction(courseId);
    setLoadingId(null);
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {["ALL", "PENDING", "PUBLISHED", "DRAFT", "ARCHIVED"].map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`rounded-xl px-4 py-2 text-xs font-semibold transition ${
              filter === st
                ? "bg-primary-600 text-white shadow-sm"
                : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {st} ({st === "ALL" ? courses.length : courses.filter((c) => c.status === st).length})
          </button>
        ))}
      </div>

      {/* Table Card */}
      <div className="rounded-3xl border border-slate-100 bg-white shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="p-4">Course</th>
                <th className="p-4">Instructor</th>
                <th className="p-4">Category</th>
                <th className="p-4">Enrollments</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((course) => (
                <tr key={course.id} className="hover:bg-slate-50/70 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          course.thumbnail ||
                          "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
                        }
                        alt={course.title}
                        className="h-10 w-14 rounded-lg object-cover border"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900">{course.title}</h4>
                        <span className="text-[10px] text-slate-400">
                          {course.sections.length} sections &bull; {course.level}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-slate-700">
                    {course.instructor.name}
                  </td>
                  <td className="p-4">
                    <Badge variant="blue">{course.category.name}</Badge>
                  </td>
                  <td className="p-4 font-bold text-slate-700">
                    {course.enrollments.length}
                  </td>
                  <td className="p-4">
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
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Link href={`/student/learn/${course.slug}`} target="_blank">
                        <Button size="sm" variant="outline" className="h-7 text-[11px] rounded-lg">
                          <ExternalLink className="h-3 w-3" />
                        </Button>
                      </Link>

                      {course.status !== "PUBLISHED" && (
                        <Button
                          size="sm"
                          disabled={loadingId === course.id}
                          onClick={() => handleStatus(course.id, "PUBLISHED")}
                          className="h-7 text-[11px] rounded-lg bg-emerald-600 text-white hover:bg-emerald-700"
                        >
                          <Check className="mr-1 h-3 w-3" />
                          Approve
                        </Button>
                      )}

                      {course.status === "PUBLISHED" && (
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={loadingId === course.id}
                          onClick={() => handleStatus(course.id, "ARCHIVED")}
                          className="h-7 text-[11px] rounded-lg text-slate-600"
                        >
                          <Archive className="mr-1 h-3 w-3" />
                          Archive
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="ghost"
                        disabled={loadingId === course.id}
                        onClick={() => handleDelete(course.id)}
                        className="h-7 text-[11px] rounded-lg text-rose-600 hover:bg-rose-50"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
