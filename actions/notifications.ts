"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";

export async function markNotificationAsReadAction(id: string) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false };

    await prisma.notification.updateMany({
      where: { id, userId: user.id },
      data: { isRead: true },
    });

    revalidatePath("/student/notifications");
    revalidatePath("/instructor/notifications");
    revalidatePath("/admin/notifications");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function markAllNotificationsAsReadAction() {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false };

    await prisma.notification.updateMany({
      where: { userId: user.id, isRead: false },
      data: { isRead: true },
    });

    revalidatePath("/student/dashboard");
    revalidatePath("/instructor/dashboard");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}
