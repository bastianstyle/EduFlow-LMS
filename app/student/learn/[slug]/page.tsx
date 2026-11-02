import React from "react";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { CoursePlayer } from "./course-player";

interface LearnPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    lesson?: string;
  };
}

export default async function LearnPage({ params, searchParams }: LearnPageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
    include: {
      instructor: true,
      category: true,
      quizzes: {
        include: { questions: true },
      },
      assignments: true,
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

  // Check enrollment
  const enrollment = await prisma.enrollment.findUnique({
    where: {
      studentId_courseId: {
        studentId: user.id,
        courseId: course.id,
      },
    },
  });

  // Fetch all completed lessons for this student
  const allLessonIds = course.sections.flatMap((s) => s.lessons.map((l) => l.id));
  const progressRecords = await prisma.lessonProgress.findMany({
    where: {
      studentId: user.id,
      lessonId: { in: allLessonIds },
      isCompleted: true,
    },
  });
  const completedLessonIdSet = new Set(progressRecords.map((p) => p.lessonId));

  // Determine active lesson
  let activeLessonId = searchParams.lesson;
  let activeLesson = course.sections
    .flatMap((s) => s.lessons)
    .find((l) => l.id === activeLessonId);

  // If no lesson specified or not found, pick first uncompleted or first overall
  if (!activeLesson) {
    const firstUncompleted = course.sections
      .flatMap((s) => s.lessons)
      .find((l) => !completedLessonIdSet.has(l.id));

    activeLesson =
      firstUncompleted || course.sections[0]?.lessons[0] || null;
  }

  // Check if certificate exists
  const certificate = await prisma.certificate.findUnique({
    where: {
      studentId_courseId: {
        studentId: user.id,
        courseId: course.id,
      },
    },
  });

  return (
    <CoursePlayer
      course={course}
      initialActiveLesson={activeLesson}
      completedLessonIds={Array.from(completedLessonIdSet)}
      isEnrolled={!!enrollment}
      hasCertificate={!!certificate}
      certificateCode={certificate?.certificateCode}
      userId={user.id}
    />
  );
}
