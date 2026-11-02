"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/ui/button";
import { createCourseAction } from "@/actions/courses";
import { AlertCircle, ArrowRight } from "lucide-react";

interface CreateFormProps {
  categories: any[];
}

export function CreateCourseForm({ categories }: CreateFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0]?.id || "");
  const [level, setLevel] = useState("BEGINNER");
  const [price, setPrice] = useState("49.99");
  const [durationMinutes, setDurationMinutes] = useState("180");
  const [thumbnail, setThumbnail] = useState(
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800"
  );
  const [description, setDescription] = useState("");
  const [learningObjectives, setLearningObjectives] = useState("");
  const [requirements, setRequirements] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await createCourseAction({
      title,
      subtitle,
      categoryId,
      level,
      price: parseFloat(price) || 0,
      durationMinutes: parseInt(durationMinutes) || 60,
      thumbnail,
      description,
      learningObjectives,
      requirements,
    });

    if (res.success && res.courseId) {
      router.push(`/instructor/courses/${res.courseId}`);
    } else {
      setError(res.error || "Failed to create course");
      setLoading(false);
    }
  };

  return (
    <div className="rounded-3xl border border-slate-100 bg-white p-6 sm:p-8 shadow-card">
      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-semibold text-rose-700">
          <AlertCircle className="h-4 w-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Course Title *
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Full-Stack Next.js 15 & Clean Architecture"
            className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-100"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Subtitle / Short Summary
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="e.g. Master Server Components, Prisma relational modeling, and enterprise deployment."
            className="w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-100"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Category *
            </label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-3 text-xs bg-white outline-none focus:border-primary-500"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Difficulty Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-3 text-xs bg-white outline-none focus:border-primary-500"
            >
              <option value="BEGINNER">Beginner</option>
              <option value="INTERMEDIATE">Intermediate</option>
              <option value="ADVANCED">Advanced</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Price (USD)
            </label>
            <input
              type="number"
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-primary-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Thumbnail Image URL
          </label>
          <input
            type="url"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Full Course Description *
          </label>
          <textarea
            rows={5}
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Comprehensive overview of syllabus, prerequisites, and key competencies..."
            className="w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1.5">
            Learning Objectives (one per line)
          </label>
          <textarea
            rows={3}
            value={learningObjectives}
            onChange={(e) => setLearningObjectives(e.target.value)}
            placeholder="Architect scalable production web apps&#10;Model database relationships with Prisma&#10;Deploy on cloud infrastructure"
            className="w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-primary-500"
          />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            className="rounded-xl"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={loading}
            className="rounded-xl bg-primary-600 font-semibold text-white hover:bg-primary-700 px-6"
          >
            {loading ? "Creating..." : "Save Course & Add Lessons"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
}
