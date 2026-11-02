import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CourseCatalog } from "./course-catalog";

export default async function CoursesCatalogPage() {
  const user = await getCurrentUser();

  const courses = await prisma.course.findMany({
    where: { status: "PUBLISHED" },
    include: {
      category: true,
      instructor: true,
      sections: {
        include: { lessons: true },
      },
      reviews: true,
      enrollments: user ? { where: { studentId: user.id } } : false,
    },
    orderBy: { createdAt: "desc" },
  });

  const categories = await prisma.category.findMany({
    orderBy: { name: "asc" },
  });

  return (
    <CourseCatalog
      courses={courses}
      categories={categories}
      currentUserId={user?.id}
    />
  );
}
