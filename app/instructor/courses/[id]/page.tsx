import React from "react";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CurriculumBuilder } from "./curriculum-builder";

interface ManageCourseProps {
  params: {
    id: string;
  };
}

export default async function ManageCoursePage({ params }: ManageCourseProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const course = await prisma.course.findUnique({
    where: { id: params.id },
    include: {
      category: true,
      sections: {
        orderBy: { order: "asc" },
        include: {
          lessons: {
            orderBy: { order: "asc" },
          },
        },
      },
    },
  });

  if (!course) notFound();

  if (user.role !== "ADMIN" && course.instructorId !== user.id) {
    redirect("/instructor/courses");
  }

  return <CurriculumBuilder course={course} />;
}
