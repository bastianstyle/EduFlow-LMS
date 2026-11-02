export type Role = "ADMIN" | "INSTRUCTOR" | "STUDENT";

export type CourseStatus = "DRAFT" | "PENDING" | "PUBLISHED" | "ARCHIVED";

export type DifficultyLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export type LessonType = "VIDEO" | "DOCUMENT" | "TEXT";

export type EnrollmentStatus = "ACTIVE" | "COMPLETED" | "DROPPED";

export type SubmissionStatus = "SUBMITTED" | "GRADED" | "LATE";

export interface SessionUser {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatar?: string | null;
  headline?: string | null;
  streakDays?: number;
  learningHours?: number;
  xpPoints?: number;
}
