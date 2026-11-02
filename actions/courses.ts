"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser, requireRole } from "@/lib/auth";
import { CourseSchema, SectionSchema, LessonSchema } from "@/schemas";
import { revalidatePath } from "next/cache";

export async function createCourseAction(data: any) {
  try {
    const user = await requireRole(["INSTRUCTOR", "ADMIN"]);
    const parsed = CourseSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message };
    }

    const slug = parsed.data.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "") + "-" + Math.random().toString(36).substring(2, 7);

    const course = await prisma.course.create({
      data: {
        title: parsed.data.title,
        slug,
        subtitle: parsed.data.subtitle,
        description: parsed.data.description,
        categoryId: parsed.data.categoryId,
        level: parsed.data.level,
        price: parsed.data.price,
        durationMinutes: parsed.data.durationMinutes,
        thumbnail: parsed.data.thumbnail || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800",
        learningObjectives: parsed.data.learningObjectives,
        requirements: parsed.data.requirements,
        status: user.role === "ADMIN" ? "PUBLISHED" : "PENDING",
        instructorId: user.id,
      },
    });

    // Create a default first section
    await prisma.courseSection.create({
      data: {
        title: "Section 1: Course Overview & Introduction",
        order: 1,
        courseId: course.id,
      },
    });

    revalidatePath("/instructor/courses");
    revalidatePath("/admin/courses");
    return { success: true, courseId: course.id };
  } catch (err: any) {
    return { success: false, error: err.message || "Failed to create course" };
  }
}

export async function updateCourseAction(courseId: string, data: any) {
  try {
    const user = await requireRole(["INSTRUCTOR", "ADMIN"]);
    const existing = await prisma.course.findUnique({ where: { id: courseId } });
    if (!existing) return { success: false, error: "Course not found" };

    if (user.role !== "ADMIN" && existing.instructorId !== user.id) {
      return { success: false, error: "Unauthorized to edit this course" };
    }

    const parsed = CourseSchema.partial().safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message };
    }

    await prisma.course.update({
      where: { id: courseId },
      data: {
        ...parsed.data,
        updatedAt: new Date(),
      },
    });

    revalidatePath(`/instructor/courses/${courseId}`);
    revalidatePath("/instructor/courses");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteCourseAction(courseId: string) {
  try {
    const user = await requireRole(["INSTRUCTOR", "ADMIN"]);
    const existing = await prisma.course.findUnique({ where: { id: courseId } });
    if (!existing) return { success: false, error: "Course not found" };

    if (user.role !== "ADMIN" && existing.instructorId !== user.id) {
      return { success: false, error: "Unauthorized" };
    }

    await prisma.course.delete({ where: { id: courseId } });
    revalidatePath("/instructor/courses");
    revalidatePath("/admin/courses");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function approveCourseAction(courseId: string, status: "PUBLISHED" | "ARCHIVED" | "DRAFT") {
  try {
    const admin = await requireRole(["ADMIN"]);
    const course = await prisma.course.update({
      where: { id: courseId },
      data: { status },
      include: { instructor: true },
    });

    // Notify instructor
    await prisma.notification.create({
      data: {
        userId: course.instructorId,
        title: `Course ${status === "PUBLISHED" ? "Approved! 🎉" : "Status Changed"}`,
        message: `Your course "${course.title}" is now marked as ${status}.`,
        type: status === "PUBLISHED" ? "SUCCESS" : "INFO",
        link: `/instructor/courses/${course.id}`,
      },
    });

    revalidatePath("/admin/courses");
    revalidatePath("/instructor/courses");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function createSectionAction(courseId: string, title: string) {
  try {
    const user = await requireRole(["INSTRUCTOR", "ADMIN"]);
    const count = await prisma.courseSection.count({ where: { courseId } });
    const section = await prisma.courseSection.create({
      data: {
        courseId,
        title,
        order: count + 1,
      },
    });
    revalidatePath(`/instructor/courses/${courseId}`);
    return { success: true, section };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function createLessonAction(sectionId: string, courseId: string, data: any) {
  try {
    const user = await requireRole(["INSTRUCTOR", "ADMIN"]);
    const count = await prisma.lesson.count({ where: { sectionId } });
    const lesson = await prisma.lesson.create({
      data: {
        sectionId,
        title: data.title,
        durationMinutes: Number(data.durationMinutes) || 10,
        type: data.type || "VIDEO",
        videoUrl: data.videoUrl || null,
        documentUrl: data.documentUrl || null,
        content: data.content || null,
        isFreePreview: Boolean(data.isFreePreview),
        order: count + 1,
      },
    });
    revalidatePath(`/instructor/courses/${courseId}`);
    return { success: true, lesson };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function enrollCourseAction(courseId: string) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: "Please log in to enroll" };

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: { instructor: true },
    });
    if (!course) return { success: false, error: "Course not found" };

    const existing = await prisma.enrollment.findUnique({
      where: {
        studentId_courseId: {
          studentId: user.id,
          courseId,
        },
      },
    });

    if (existing) {
      return { success: true, alreadyEnrolled: true, redirectTo: `/student/learn/${course.slug}` };
    }

    await prisma.enrollment.create({
      data: {
        studentId: user.id,
        courseId,
        status: "ACTIVE",
      },
    });

    // Notify instructor
    await prisma.notification.create({
      data: {
        userId: course.instructorId,
        title: "New Student Enrolled!",
        message: `${user.name} has enrolled in "${course.title}".`,
        type: "INFO",
        link: `/instructor/courses/${course.id}`,
      },
    });

    // Notify student
    await prisma.notification.create({
      data: {
        userId: user.id,
        title: "Enrollment Confirmed 🚀",
        message: `Welcome to "${course.title}". You can start learning now!`,
        type: "SUCCESS",
        link: `/student/learn/${course.slug}`,
      },
    });

    revalidatePath("/student/dashboard");
    revalidatePath("/student/courses");
    return { success: true, redirectTo: `/student/learn/${course.slug}` };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
