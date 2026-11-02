"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Circle,
  PlayCircle,
  FileText,
  ChevronLeft,
  ChevronRight,
  Award,
  BookOpen,
  GraduationCap,
  Download,
  Share2,
  FileQuestion,
  Sparkles,
} from "lucide-react";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { Progress } from "@/ui/progress";
import { toggleLessonProgressAction } from "@/actions/learning";
import { enrollCourseAction } from "@/actions/courses";

interface CoursePlayerProps {
  course: any;
  initialActiveLesson: any;
  completedLessonIds: string[];
  isEnrolled: boolean;
  hasCertificate: boolean;
  certificateCode?: string;
  userId: string;
}

export function CoursePlayer({
  course,
  initialActiveLesson,
  completedLessonIds: initialCompleted,
  isEnrolled,
  hasCertificate,
  certificateCode,
}: CoursePlayerProps) {
  const [activeLesson, setActiveLesson] = useState(initialActiveLesson);
  const [completedIds, setCompletedIds] = useState<string[]>(initialCompleted);
  const [loadingProgress, setLoadingProgress] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const [activeTab, setActiveTab] = useState<"notes" | "resources" | "quizzes">("notes");

  // Flatten all lessons in order
  const allLessons = course.sections.flatMap((s: any) => s.lessons);
  const currentIndex = allLessons.findIndex((l: any) => l.id === activeLesson?.id);
  const prevLesson = currentIndex > 0 ? allLessons[currentIndex - 1] : null;
  const nextLesson = currentIndex >= 0 && currentIndex < allLessons.length - 1 ? allLessons[currentIndex + 1] : null;

  const totalLessons = allLessons.length;
  const completedCount = completedIds.length;
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  const isLessonCompleted = activeLesson ? completedIds.includes(activeLesson.id) : false;

  const handleToggleComplete = async () => {
    if (!activeLesson) return;
    setLoadingProgress(true);

    const res = await toggleLessonProgressAction(activeLesson.id, course.slug);
    if (res.success) {
      if (res.isCompleted) {
        setCompletedIds((prev) => [...prev, activeLesson.id]);
      } else {
        setCompletedIds((prev) => prev.filter((id) => id !== activeLesson.id));
      }
    }
    setLoadingProgress(false);
  };

  const handleEnroll = async () => {
    setEnrolling(true);
    await enrollCourseAction(course.id);
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl bg-white p-5 border border-slate-100 shadow-soft">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Link
              href="/student/dashboard"
              className="text-xs font-semibold text-slate-500 hover:text-primary-600 transition"
            >
              Dashboard
            </Link>
            <span className="text-slate-300">/</span>
            <Badge variant="blue">{course.category.name}</Badge>
          </div>
          <h1 className="text-xl font-bold text-slate-900">{course.title}</h1>
        </div>

        {/* Course Progress Widget */}
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs font-bold text-slate-800">
              {progressPercent}% Completed
            </span>
            <p className="text-[11px] text-slate-400">
              {completedCount} of {totalLessons} lessons
            </p>
          </div>
          <div className="w-28">
            <Progress value={progressPercent} className="h-2.5" />
          </div>

          {(progressPercent === 100 || hasCertificate) && (
            <Link href={certificateCode ? `/verify/${certificateCode}` : "/student/certificates"}>
              <Button size="sm" className="bg-emerald-600 text-white hover:bg-emerald-700 font-semibold rounded-xl text-xs">
                <Award className="mr-1.5 h-4 w-4" />
                View Certificate
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Main Learning Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Player Area (2 cols) */}
        <div className="space-y-6 lg:col-span-2">
          {/* Video or Document Display Container */}
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-900 shadow-card">
            {activeLesson?.type === "VIDEO" && activeLesson.videoUrl ? (
              <div className="relative aspect-video w-full bg-black">
                <iframe
                  src={activeLesson.videoUrl}
                  title={activeLesson.title}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : activeLesson?.type === "DOCUMENT" && activeLesson.documentUrl ? (
              <div className="p-12 text-center text-white space-y-4">
                <FileText className="mx-auto h-16 w-16 text-blue-400" />
                <h3 className="text-lg font-bold">Document Resource</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  This lesson includes reference reading material, schematics, and guidelines.
                </p>
                <a
                  href={activeLesson.documentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-xs font-semibold text-white shadow-md hover:bg-primary-700"
                >
                  <Download className="h-4 w-4" />
                  Open Document PDF
                </a>
              </div>
            ) : (
              <div className="p-8 text-white space-y-4">
                <BookOpen className="h-10 w-10 text-cyan-400" />
                <h3 className="text-lg font-bold">{activeLesson?.title || "Lesson Overview"}</h3>
                <div className="prose prose-invert text-xs text-slate-300 leading-relaxed max-w-none">
                  {activeLesson?.content || "Read the lecture notes below."}
                </div>
              </div>
            )}

            {/* Lesson Controller Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-800 bg-slate-900/90 p-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!prevLesson}
                  onClick={() => prevLesson && setActiveLesson(prevLesson)}
                  className="h-9 rounded-xl border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  <ChevronLeft className="mr-1 h-4 w-4" />
                  Previous
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  disabled={!nextLesson}
                  onClick={() => nextLesson && setActiveLesson(nextLesson)}
                  className="h-9 rounded-xl border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
                >
                  Next
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>

              {/* Complete Toggle */}
              <div>
                {isEnrolled ? (
                  <Button
                    onClick={handleToggleComplete}
                    disabled={loadingProgress}
                    className={`h-9 rounded-xl font-semibold transition ${
                      isLessonCompleted
                        ? "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
                        : "bg-primary-600 text-white hover:bg-primary-700 shadow-sm"
                    }`}
                  >
                    <CheckCircle2 className="mr-1.5 h-4 w-4" />
                    {isLessonCompleted ? "Completed ✓" : "Mark as Completed"}
                  </Button>
                ) : (
                  <Button
                    onClick={handleEnroll}
                    disabled={enrolling}
                    className="h-9 rounded-xl bg-primary-600 text-white font-semibold"
                  >
                    {enrolling ? "Enrolling..." : "Enroll to Track Progress"}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Lesson Tabs: Notes, Resources, Quizzes */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-4">
            <div className="flex items-center gap-4 border-b border-slate-100 pb-3">
              <button
                onClick={() => setActiveTab("notes")}
                className={`pb-2 text-sm font-semibold transition border-b-2 ${
                  activeTab === "notes"
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                Lecture Notes & Summary
              </button>
              <button
                onClick={() => setActiveTab("resources")}
                className={`pb-2 text-sm font-semibold transition border-b-2 ${
                  activeTab === "resources"
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                Resources & Downloads
              </button>
              <button
                onClick={() => setActiveTab("quizzes")}
                className={`pb-2 text-sm font-semibold transition border-b-2 ${
                  activeTab === "quizzes"
                    ? "border-primary-600 text-primary-600"
                    : "border-transparent text-slate-500 hover:text-slate-800"
                }`}
              >
                Course Quizzes ({course.quizzes.length})
              </button>
            </div>

            {activeTab === "notes" && (
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-800">{activeLesson?.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                  {activeLesson?.content || "Take comprehensive notes and practice along with the exercises."}
                </p>
                <div className="mt-4 rounded-2xl bg-slate-50 p-4 border border-slate-100">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                    Learning Objectives
                  </h4>
                  <p className="text-xs text-slate-600 whitespace-pre-line">
                    {course.learningObjectives || "Understand the core concepts and real-world implementations."}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "resources" && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">Download supplementary files, code repositories, and cheat sheets.</p>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-primary-600" />
                    <div>
                      <h4 className="text-xs font-semibold text-slate-800">Course Syllabus & Cheat Sheet</h4>
                      <span className="text-[10px] text-slate-400">PDF Document &bull; 2.4 MB</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="h-8 text-xs rounded-lg">
                    <Download className="mr-1 h-3.5 w-3.5" />
                    Download
                  </Button>
                </div>
              </div>
            )}

            {activeTab === "quizzes" && (
              <div className="space-y-3">
                {course.quizzes.map((quiz: any) => (
                  <div
                    key={quiz.id}
                    className="flex items-center justify-between rounded-2xl border border-slate-200 p-4"
                  >
                    <div>
                      <h4 className="text-sm font-bold text-slate-800">{quiz.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {quiz.questions.length} Questions &bull; {quiz.timeLimitMinutes} Mins &bull; Passing score: {quiz.passingScore}%
                      </p>
                    </div>
                    <Link href={`/student/quizzes/${quiz.id}`}>
                      <Button size="sm" className="bg-primary-600 text-white rounded-xl text-xs font-semibold">
                        <FileQuestion className="mr-1.5 h-3.5 w-3.5" />
                        Take Quiz
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Curriculum Sidebar */}
        <div className="space-y-6">
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-soft space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-800">Course Curriculum</h3>
              <span className="text-xs font-medium text-slate-400">
                {course.sections.length} Sections
              </span>
            </div>

            {/* Sections & Lessons Tree */}
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
              {course.sections.map((section: any) => (
                <div key={section.id} className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {section.title}
                  </h4>
                  <div className="space-y-1">
                    {section.lessons.map((lesson: any) => {
                      const isSelected = lesson.id === activeLesson?.id;
                      const isDone = completedIds.includes(lesson.id);

                      return (
                        <button
                          key={lesson.id}
                          onClick={() => setActiveLesson(lesson)}
                          className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs font-medium transition ${
                            isSelected
                              ? "bg-primary-50 text-primary-700 font-semibold"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            {isDone ? (
                              <CheckCircle2 className="h-4 w-4 text-emerald-500 flex-shrink-0" />
                            ) : (
                              <Circle className="h-4 w-4 text-slate-300 flex-shrink-0" />
                            )}
                            <span className="truncate">{lesson.title}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 flex-shrink-0 ml-2">
                            {lesson.durationMinutes}m
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Instructor Bio Card */}
          <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-soft space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Course Instructor
            </h4>
            <div className="flex items-center gap-3">
              <img
                src={
                  course.instructor.avatar ||
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=250"
                }
                alt={course.instructor.name}
                className="h-10 w-10 rounded-full object-cover border"
              />
              <div>
                <h4 className="text-sm font-bold text-slate-800">{course.instructor.name}</h4>
                <p className="text-[11px] text-slate-500 line-clamp-1">{course.instructor.headline}</p>
              </div>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              {course.instructor.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
