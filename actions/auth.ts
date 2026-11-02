"use server";

import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken, setSessionCookie, removeSessionCookie } from "@/lib/auth";
import { LoginSchema, RegisterSchema } from "@/schemas";
import { Role } from "@/types";
import { revalidatePath } from "next/cache";

export async function loginAction(formData: FormData | { email: string; password: string }) {
  try {
    const rawData = formData instanceof FormData
      ? { email: formData.get("email") as string, password: formData.get("password") as string }
      : formData;

    const parsed = LoginSchema.safeParse(rawData);
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message || "Invalid input" };
    }

    const user = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    if (!user) {
      return { success: false, error: "Invalid email or password" };
    }

    const isMatch = await bcrypt.compare(parsed.data.password, user.password);
    if (!isMatch) {
      return { success: false, error: "Invalid email or password" };
    }

    const token = await signToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as Role,
    });

    await setSessionCookie(token);

    // Activity log
    await prisma.activityLog.create({
      data: {
        userId: user.id,
        action: "USER_LOGIN",
        details: `User logged in as ${user.role}`,
      },
    });

    return {
      success: true,
      role: user.role,
      redirectTo:
        user.role === "ADMIN"
          ? "/admin/dashboard"
          : user.role === "INSTRUCTOR"
          ? "/instructor/dashboard"
          : "/student/dashboard",
    };
  } catch (error: any) {
    return { success: false, error: error.message || "Failed to log in" };
  }
}

export async function registerAction(formData: FormData | any) {
  try {
    const rawData = formData instanceof FormData
      ? {
          name: formData.get("name") as string,
          email: formData.get("email") as string,
          password: formData.get("password") as string,
          role: (formData.get("role") as string) || "STUDENT",
        }
      : formData;

    const parsed = RegisterSchema.safeParse(rawData);
    if (!parsed.success) {
      return { success: false, error: parsed.error.errors[0]?.message || "Invalid data" };
    }

    const existing = await prisma.user.findUnique({
      where: { email: parsed.data.email },
    });

    if (existing) {
      return { success: false, error: "An account with this email already exists" };
    }

    const hashedPassword = await bcrypt.hash(parsed.data.password, 10);
    const user = await prisma.user.create({
      data: {
        name: parsed.data.name,
        email: parsed.data.email,
        password: hashedPassword,
        role: parsed.data.role,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${parsed.data.name.replace(" ", "")}`,
      },
    });

    const token = await signToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as Role,
    });

    await setSessionCookie(token);

    return {
      success: true,
      role: user.role,
      redirectTo: user.role === "INSTRUCTOR" ? "/instructor/dashboard" : "/student/dashboard",
    };
  } catch (error: any) {
    return { success: false, error: error.message || "Registration failed" };
  }
}

export async function logoutAction() {
  await removeSessionCookie();
  return { success: true, redirectTo: "/login" };
}

export async function quickDemoLoginAction(role: "ADMIN" | "INSTRUCTOR" | "STUDENT") {
  let targetEmail = "alex@eduflow.com"; // Student featured in screenshot
  if (role === "ADMIN") targetEmail = "admin@eduflow.com";
  if (role === "INSTRUCTOR") targetEmail = "sarah.jenkins@eduflow.com";

  const user = await prisma.user.findUnique({
    where: { email: targetEmail },
  });

  if (!user) {
    return { success: false, error: `Demo account for ${role} not found. Please seed the database.` };
  }

  const token = await signToken({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as Role,
  });

  await setSessionCookie(token);

  const redirectTo =
    user.role === "ADMIN"
      ? "/admin/dashboard"
      : user.role === "INSTRUCTOR"
      ? "/instructor/dashboard"
      : "/student/dashboard";

  return { success: true, redirectTo };
}
