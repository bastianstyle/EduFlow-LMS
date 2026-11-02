import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { UserManagementTable } from "./user-table";

export default async function AdminUsersPage() {
  const user = await getCurrentUser();

  const users = await prisma.user.findMany({
    include: {
      enrollments: true,
      coursesCreated: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">User & Role Management</h1>
        <p className="text-xs text-slate-500 mt-1">
          Inspect registered learners, assign instructor privileges, or review administrative access.
        </p>
      </div>

      <UserManagementTable users={users} />
    </div>
  );
}
