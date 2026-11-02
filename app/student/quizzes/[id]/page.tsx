import React from "react";
import { notFound, redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { QuizRunner } from "./quiz-runner";

interface QuizPageProps {
  params: {
    id: string;
  };
}

export default async function QuizPage({ params }: QuizPageProps) {
  const user = await getCurrentUser();
  if (!user) redirect("/login");

  const quiz = await prisma.quiz.findUnique({
    where: { id: params.id },
    include: {
      course: true,
      questions: true,
      attempts: {
        where: { studentId: user.id },
        orderBy: { submittedAt: "desc" },
      },
    },
  });

  if (!quiz) notFound();

  return <QuizRunner quiz={quiz} user={user} attempts={quiz.attempts} />;
}
