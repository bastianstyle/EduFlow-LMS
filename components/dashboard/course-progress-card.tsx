"use client";

import React from "react";
import Link from "next/link";
import { Badge } from "@/ui/badge";
import { Progress } from "@/ui/progress";
import { Button } from "@/ui/button";
import { PlayCircle } from "lucide-react";

interface CourseProgressCardProps {
  title: string;
  slug: string;
  category: string;
  thumbnail: string;
  completedLessons: number;
  totalLessons: number;
}

export function CourseProgressCard({
  title,
  slug,
  category,
  thumbnail,
  completedLessons,
  totalLessons,
}: CourseProgressCardProps) {
  const percentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-soft transition hover:shadow-md">
      {/* Thumbnail */}
      <div className="relative h-28 w-full sm:w-40 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />
        <div className="absolute left-2.5 top-2.5">
          <Badge variant="blue" className="bg-white/95 text-primary-700 shadow-sm backdrop-blur-sm">
            {category}
          </Badge>
        </div>
      </div>

      {/* Course Details */}
      <div className="flex flex-1 flex-col justify-between w-full space-y-3">
        <div>
          <h3 className="text-base font-bold text-slate-800 line-clamp-1 hover:text-primary-600 transition">
            <Link href={`/student/learn/${slug}`}>{title}</Link>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            {completedLessons}/{totalLessons} Lessons &bull; {percentage}% Complete
          </p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
          <Progress value={percentage} className="h-2" />
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-1">
          <Link href={`/student/learn/${slug}`}>
            <Button variant="outline" size="sm" className="rounded-xl border-slate-200 text-slate-700 hover:border-primary-500 hover:text-primary-600 font-semibold gap-1.5">
              <PlayCircle className="h-4 w-4 text-primary-600" />
              Resume Lesson
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
