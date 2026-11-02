import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CreateCourseForm } from "./create-form";

export default async function NewCoursePage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Author New Course</h1>
        <p className="text-xs text-slate-500 mt-1">
          Provide initial course metadata. You can structure modules and upload lesson videos in the next step.
        </p>
      </div>

      <CreateCourseForm categories={categories} />
    </div>
  );
}
