"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  PlusCircle,
  Video,
  FileText,
  BookOpen,
  ArrowLeft,
  Check,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { createSectionAction, createLessonAction, updateCourseAction } from "@/actions/courses";

interface CurriculumBuilderProps {
  course: any;
}

export function CurriculumBuilder({ course }: CurriculumBuilderProps) {
  const [newSectionTitle, setNewSectionTitle] = useState("");
  const [addingSection, setAddingSection] = useState(false);

  // Lesson modal state
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonDuration, setLessonDuration] = useState("15");
  const [lessonType, setLessonType] = useState("VIDEO");
  const [lessonVideo, setLessonVideo] = useState("https://www.youtube.com/embed/dQw4w9WgXcQ");
  const [lessonContent, setLessonContent] = useState("");
  const [submittingLesson, setSubmittingLesson] = useState(false);

  const [publishing, setPublishing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleAddSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSectionTitle.trim()) return;
    setAddingSection(true);
    const res = await createSectionAction(course.id, newSectionTitle.trim());
    if (res.success) {
      setNewSectionTitle("");
      window.location.reload();
    }
    setAddingSection(false);
  };

  const handleAddLesson = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeSectionId || !lessonTitle.trim()) return;
    setSubmittingLesson(true);

    const res = await createLessonAction(activeSectionId, course.id, {
      title: lessonTitle.trim(),
      durationMinutes: parseInt(lessonDuration) || 10,
      type: lessonType,
      videoUrl: lessonVideo,
      content: lessonContent,
    });

    if (res.success) {
      setActiveSectionId(null);
      setLessonTitle("");
      setLessonContent("");
      window.location.reload();
    }
    setSubmittingLesson(false);
  };

  const handleStatusChange = async (newStatus: "PENDING" | "PUBLISHED" | "DRAFT") => {
    setPublishing(true);
    const res = await updateCourseAction(course.id, { status: newStatus });
    if (res.success) {
      setStatusMessage(`Course status successfully updated to ${newStatus}!`);
      setTimeout(() => window.location.reload(), 800);
    }
    setPublishing(false);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl bg-white p-6 border border-slate-100 shadow-soft">
        <div className="space-y-1">
          <Link
            href="/instructor/courses"
            className="text-xs font-semibold text-slate-500 hover:text-primary-600 flex items-center gap-1 mb-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Courses
          </Link>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">{course.title}</h1>
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

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <Link href={`/student/learn/${course.slug}`} target="_blank">
            <Button size="sm" variant="outline" className="rounded-xl text-xs font-semibold">
              <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
              Preview Player
            </Button>
          </Link>

          {course.status !== "PUBLISHED" ? (
            <Button
              size="sm"
              disabled={publishing}
              onClick={() => handleStatusChange("PUBLISHED")}
              className="rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700"
            >
              Publish Course
            </Button>
          ) : (
            <Button
              size="sm"
              variant="outline"
              disabled={publishing}
              onClick={() => handleStatusChange("DRAFT")}
              className="rounded-xl text-xs text-slate-600"
            >
              Unpublish to Draft
            </Button>
          )}
        </div>
      </div>

      {statusMessage && (
        <div className="rounded-2xl bg-emerald-50 border border-emerald-200 p-4 text-xs font-bold text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          {statusMessage}
        </div>
      )}

      {/* Curriculum Sections */}
      <div className="space-y-6">
        {course.sections.map((section: any, sIdx: number) => (
          <div
            key={section.id}
            className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900">
                Section {sIdx + 1}: {section.title}
              </h3>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setActiveSectionId(section.id)}
                className="h-8 rounded-xl text-xs font-semibold text-primary-600 border-primary-200 hover:bg-primary-50"
              >
                <PlusCircle className="mr-1 h-3.5 w-3.5" />
                Add Lesson
              </Button>
            </div>

            {/* Lessons List */}
            <div className="divide-y divide-slate-100">
              {section.lessons.map((lesson: any, lIdx: number) => (
                <div
                  key={lesson.id}
                  className="flex items-center justify-between py-3 text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                      {lesson.type === "VIDEO" ? (
                        <Video className="h-4 w-4 text-blue-600" />
                      ) : (
                        <FileText className="h-4 w-4 text-slate-600" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-800">
                        {lIdx + 1}. {lesson.title}
                      </h4>
                      <span className="text-[10px] text-slate-400">
                        {lesson.durationMinutes} mins &bull; {lesson.type}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-semibold text-emerald-600">
                    Active
                  </span>
                </div>
              ))}

              {section.lessons.length === 0 && (
                <p className="text-xs text-slate-400 py-3 text-center">
                  No lessons in this section yet. Click &quot;Add Lesson&quot; to author one.
                </p>
              )}
            </div>
          </div>
        ))}

        {/* Add New Section Form */}
        <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-6 text-center space-y-3">
          <h3 className="text-sm font-bold text-slate-800">Add New Curriculum Section</h3>
          <form onSubmit={handleAddSection} className="flex gap-2 max-w-md mx-auto">
            <input
              type="text"
              required
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              placeholder="e.g. Module 3: State Architecture & Redux"
              className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-primary-500"
            />
            <Button
              type="submit"
              size="sm"
              disabled={addingSection}
              className="rounded-xl bg-primary-600 text-white font-semibold text-xs"
            >
              {addingSection ? "Adding..." : "Add Section"}
            </Button>
          </form>
        </div>
      </div>

      {/* Lesson Creation Modal */}
      {activeSectionId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900">Add New Lesson</h3>
              <button
                onClick={() => setActiveSectionId(null)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                ✕ Close
              </button>
            </div>

            <form onSubmit={handleAddLesson} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lesson Title *
                </label>
                <input
                  type="text"
                  required
                  value={lessonTitle}
                  onChange={(e) => setLessonTitle(e.target.value)}
                  placeholder="e.g. Setting Up Redux Toolkit Store"
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs outline-none focus:border-primary-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Lesson Type
                  </label>
                  <select
                    value={lessonType}
                    onChange={(e) => setLessonType(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs bg-white"
                  >
                    <option value="VIDEO">Video Lecture</option>
                    <option value="DOCUMENT">Document / PDF</option>
                    <option value="TEXT">Text Article / Code</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Duration (Minutes)
                  </label>
                  <input
                    type="number"
                    value={lessonDuration}
                    onChange={(e) => setLessonDuration(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs outline-none"
                  />
                </div>
              </div>

              {lessonType === "VIDEO" && (
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Video Embed URL (YouTube embed or MP4 stream)
                  </label>
                  <input
                    type="url"
                    value={lessonVideo}
                    onChange={(e) => setLessonVideo(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lecture Notes & Code Examples
                </label>
                <textarea
                  rows={4}
                  value={lessonContent}
                  onChange={(e) => setLessonContent(e.target.value)}
                  placeholder="Comprehensive lecture notes, key shortcuts, or code snippets..."
                  className="w-full rounded-xl border border-slate-200 p-2.5 text-xs outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveSectionId(null)}
                  className="rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  disabled={submittingLesson}
                  className="rounded-xl bg-primary-600 text-white font-semibold text-xs"
                >
                  {submittingLesson ? "Saving..." : "Save Lesson"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
