"use server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function updateUserRoleAction(userId: string, newRole: "ADMIN" | "INSTRUCTOR" | "STUDENT") {
  try {
    await requireRole(["ADMIN"]);

    await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    await prisma.activityLog.create({
      data: {
        action: "ROLE_UPDATE",
        details: `User ${userId} role changed to ${newRole}`,
      },
    });

    revalidatePath("/admin/users");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
