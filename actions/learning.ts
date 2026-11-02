"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireRole } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function toggleLessonProgressAction(lessonId: string, courseSlug?: string) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: "Unauthorized" };

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        section: {
          include: {
            course: {
              include: {
                sections: {
                  include: {
                    lessons: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!lesson) return { success: false, error: "Lesson not found" };

    const course = lesson.section.course;

    const existingProgress = await prisma.lessonProgress.findUnique({
      where: {
        studentId_lessonId: {
          studentId: user.id,
          lessonId,
        },
      },
    });

    const isNowCompleted = !existingProgress?.isCompleted;

    if (existingProgress) {
      await prisma.lessonProgress.update({
        where: { id: existingProgress.id },
        data: {
          isCompleted: isNowCompleted,
          completedAt: isNowCompleted ? new Date() : null,
        },
      });
    } else {
      await prisma.lessonProgress.create({
        data: {
          studentId: user.id,
          lessonId,
          isCompleted: true,
          completedAt: new Date(),
        },
      });
    }

    // Award XP and hours on completion
    if (isNowCompleted) {
      const hoursToAdd = (lesson.durationMinutes || 15) / 60;
      await prisma.user.update({
        where: { id: user.id },
        data: {
          xpPoints: { increment: 50 },
          learningHours: { increment: Number(hoursToAdd.toFixed(1)) },
        },
      });
    }

    // Check course completion
    const allCourseLessonIds = course.sections.flatMap((s) => s.lessons.map((l) => l.id));
    const completedCount = await prisma.lessonProgress.count({
      where: {
        studentId: user.id,
        lessonId: { in: allCourseLessonIds },
        isCompleted: true,
      },
    });

    const totalLessons = allCourseLessonIds.length;
    const isCourseFinished = totalLessons > 0 && completedCount === totalLessons;

    if (isCourseFinished) {
      // Mark enrollment completed
      await prisma.enrollment.updateMany({
        where: { studentId: user.id, courseId: course.id },
        data: { status: "COMPLETED", completedAt: new Date() },
      });

      // Check if certificate exists, otherwise issue
      const existingCert = await prisma.certificate.findUnique({
        where: {
          studentId_courseId: {
            studentId: user.id,
            courseId: course.id,
          },
        },
      });

      if (!existingCert) {
        const certCode = `EDU-2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        await prisma.certificate.create({
          data: {
            certificateCode: certCode,
            studentId: user.id,
            courseId: course.id,
          },
        });

        await prisma.notification.create({
          data: {
            userId: user.id,
            title: "Course Completed! 🎓 Certificate Issued",
            message: `Congratulations! You completed "${course.title}". Your certificate is ready.`,
            type: "SUCCESS",
            link: `/student/certificates`,
          },
        });
      }
    }

    if (courseSlug) {
      revalidatePath(`/student/learn/${courseSlug}`);
    }
    revalidatePath("/student/dashboard");

    return {
      success: true,
      isCompleted: isNowCompleted,
      totalCompleted: completedCount,
      totalLessons,
      isCourseFinished,
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function submitQuizAttemptAction(quizId: string, answers: Record<string, string>) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: "Unauthorized" };

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: { questions: true, course: true },
    });

    if (!quiz) return { success: false, error: "Quiz not found" };

    let totalPoints = 0;
    let earnedPoints = 0;
    let correctCount = 0;

    const answerRecords: Array<{ questionId: string; selectedAnswer: string; isCorrect: boolean }> = [];

    for (const q of quiz.questions) {
      totalPoints += q.points;
      const userAns = answers[q.id];
      const isCorrect = userAns !== undefined && userAns.trim() === q.correctAnswer.trim();
      if (isCorrect) {
        earnedPoints += q.points;
        correctCount += 1;
      }
      answerRecords.push({
        questionId: q.id,
        selectedAnswer: userAns || "No answer",
        isCorrect,
      });
    }

    const scorePercentage = totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
    const isPassed = scorePercentage >= quiz.passingScore;

    const attempt = await prisma.quizAttempt.create({
      data: {
        quizId,
        studentId: user.id,
        score: Math.round(scorePercentage),
        totalQuestions: quiz.questions.length,
        correctAnswers: correctCount,
        isPassed,
        answers: {
          create: answerRecords,
        },
      },
    });

    if (isPassed) {
      await prisma.user.update({
        where: { id: user.id },
        data: { xpPoints: { increment: 100 } },
      });
    }

    // Notify student
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: isPassed ? "Quiz Passed! 🎉" : "Quiz Result Available",
        message: `You scored ${Math.round(scorePercentage)}% in "${quiz.title}".`,
        type: isPassed ? "SUCCESS" : "INFO",
        link: `/student/quizzes/${quiz.id}`,
      },
    });

    revalidatePath("/student/dashboard");
    revalidatePath(`/student/quizzes/${quiz.id}`);

    return {
      success: true,
      attemptId: attempt.id,
      score: Math.round(scorePercentage),
      isPassed,
      correctCount,
      totalQuestions: quiz.questions.length,
    };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function submitAssignmentAction(assignmentId: string, data: { content: string; attachmentUrl?: string }) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: "Unauthorized" };

    const assignment = await prisma.assignment.findUnique({
      where: { id: assignmentId },
      include: { course: true },
    });

    if (!assignment) return { success: false, error: "Assignment not found" };

    const isLate = assignment.dueDate ? new Date() > new Date(assignment.dueDate) : false;

    const submission = await prisma.submission.create({
      data: {
        assignmentId,
        studentId: user.id,
        content: data.content,
        attachmentUrl: data.attachmentUrl || null,
        status: isLate ? "LATE" : "SUBMITTED",
      },
    });

    // Notify instructor
    await prisma.notification.create({
      data: {
        userId: assignment.course.instructorId,
        title: "New Assignment Submission",
        message: `${user.name} submitted work for "${assignment.title}".`,
        type: "INFO",
        link: `/instructor/submissions`,
      },
    });

    revalidatePath("/student/assignments");
    revalidatePath("/instructor/submissions");

    return { success: true, submissionId: submission.id };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function gradeSubmissionAction(submissionId: string, data: { score: number; feedback: string }) {
  try {
    const instructor = await requireRole(["INSTRUCTOR", "ADMIN"]);

    const submission = await prisma.submission.findUnique({
      where: { id: submissionId },
      include: { assignment: { include: { course: true } }, student: true },
    });

    if (!submission) return { success: false, error: "Submission not found" };

    await prisma.submission.update({
      where: { id: submissionId },
      data: {
        score: data.score,
        feedback: data.feedback,
        status: "GRADED",
        gradedAt: new Date(),
      },
    });

    // Notify student
    await prisma.notification.create({
      data: {
        userId: submission.studentId,
        title: "Assignment Graded! 📝",
        message: `Your submission for "${submission.assignment.title}" received ${data.score}/100.`,
        type: "SUCCESS",
        link: `/student/assignments`,
      },
    });

    revalidatePath("/instructor/submissions");
    revalidatePath("/student/assignments");

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
