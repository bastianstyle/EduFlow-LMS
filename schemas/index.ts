import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const RegisterSchema = z.object({
  name: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["STUDENT", "INSTRUCTOR"]).default("STUDENT"),
});

export const CourseSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  subtitle: z.string().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  categoryId: z.string().min(1, "Please select a category"),
  level: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).default("BEGINNER"),
  price: z.coerce.number().min(0, "Price must be positive").default(0),
  durationMinutes: z.coerce.number().min(0).default(60),
  thumbnail: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  learningObjectives: z.string().optional(),
  requirements: z.string().optional(),
  status: z.enum(["DRAFT", "PENDING", "PUBLISHED", "ARCHIVED"]).default("DRAFT"),
});

export const SectionSchema = z.object({
  title: z.string().min(2, "Section title is required"),
  order: z.coerce.number().default(0),
});

export const LessonSchema = z.object({
  title: z.string().min(2, "Lesson title is required"),
  durationMinutes: z.coerce.number().min(1, "Duration must be at least 1 minute"),
  type: z.enum(["VIDEO", "DOCUMENT", "TEXT"]).default("VIDEO"),
  videoUrl: z.string().optional().or(z.literal("")),
  documentUrl: z.string().optional().or(z.literal("")),
  content: z.string().optional().or(z.literal("")),
  isFreePreview: z.boolean().default(false),
  order: z.coerce.number().default(0),
});

export const QuizSchema = z.object({
  title: z.string().min(3, "Quiz title is required"),
  description: z.string().optional(),
  timeLimitMinutes: z.coerce.number().min(1).default(15),
  passingScore: z.coerce.number().min(1).max(100).default(70),
});

export const QuestionSchema = z.object({
  text: z.string().min(3, "Question text is required"),
  type: z.enum(["MULTIPLE_CHOICE", "TRUE_FALSE"]).default("MULTIPLE_CHOICE"),
  optionsJson: z.string().min(2, "Options are required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
  explanation: z.string().optional(),
  points: z.coerce.number().min(1).default(10),
});

export const AssignmentSchema = z.object({
  title: z.string().min(3, "Assignment title is required"),
  description: z.string().min(10, "Description is required"),
  dueDate: z.string().optional(),
  maxScore: z.coerce.number().min(1).default(100),
});

export const SubmissionSchema = z.object({
  content: z.string().min(10, "Please submit your solution or explanation"),
  attachmentUrl: z.string().optional().or(z.literal("")),
});

export const GradeSubmissionSchema = z.object({
  score: z.coerce.number().min(0).max(100),
  feedback: z.string().min(2, "Feedback is required"),
});

export const ReviewSchema = z.object({
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(3, "Review comment must be at least 3 characters"),
});
