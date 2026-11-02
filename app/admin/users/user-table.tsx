"use client";

import React, { useState } from "react";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Search, ShieldCheck, Users, GraduationCap } from "lucide-react";
import { updateUserRoleAction } from "@/actions/users";

interface UserTableProps {
  users: any[];
}

export function UserManagementTable({ users }: UserTableProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const filtered = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchRole = roleFilter === "ALL" || u.role === roleFilter;
    return matchSearch && matchRole;
  });

  const handleRoleChange = async (userId: string, newRole: "ADMIN" | "INSTRUCTOR" | "STUDENT") => {
    setUpdatingId(userId);
    await updateUserRoleAction(userId, newRole);
    setUpdatingId(null);
    window.location.reload();
  };

  return (
    <div className="space-y-6">
      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Role Filters */}
        <div className="flex items-center gap-2">
          {["ALL", "ADMIN", "INSTRUCTOR", "STUDENT"].map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              className={`rounded-xl px-3.5 py-1.5 text-xs font-semibold transition ${
                roleFilter === r
                  ? "bg-primary-600 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-3 text-xs outline-none focus:border-primary-500"
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="rounded-3xl border border-slate-100 bg-white shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100">
              <tr>
                <th className="p-4">User</th>
                <th className="p-4">Current Role</th>
                <th className="p-4">Activity / Stats</th>
                <th className="p-4">Joined Date</th>
                <th className="p-4 text-right">Assign Role</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={
                          u.avatar ||
                          `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.name.replace(" ", "")}`
                        }
                        alt={u.name}
                        className="h-9 w-9 rounded-full object-cover border"
                      />
                      <div>
                        <h4 className="font-bold text-slate-900">{u.name}</h4>
                        <span className="text-slate-400 text-[11px]">{u.email}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <Badge
                      variant={
                        u.role === "ADMIN"
                          ? "default"
                          : u.role === "INSTRUCTOR"
                          ? "blue"
                          : "secondary"
                      }
                    >
                      {u.role}
                    </Badge>
                  </td>
                  <td className="p-4 text-slate-600">
                    {u.role === "STUDENT" ? (
                      <span>
                        {u.streakDays}d streak &bull; {Math.round(u.learningHours)}h study &bull; {u.xpPoints} XP
                      </span>
                    ) : (
                      <span>{u.coursesCreated?.length || 0} Courses authored</span>
                    )}
                  </td>
                  <td className="p-4 text-slate-400">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      {u.role !== "STUDENT" && (
                        <button
                          disabled={updatingId === u.id}
                          onClick={() => handleRoleChange(u.id, "STUDENT")}
                          className="rounded-lg border border-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-600 hover:bg-slate-100"
                        >
                          Make Student
                        </button>
                      )}
                      {u.role !== "INSTRUCTOR" && (
                        <button
                          disabled={updatingId === u.id}
                          onClick={() => handleRoleChange(u.id, "INSTRUCTOR")}
                          className="rounded-lg border border-blue-200 bg-blue-50 px-2 py-1 text-[10px] font-semibold text-primary-700 hover:bg-blue-100"
                        >
                          Make Instructor
                        </button>
                      )}
                      {u.role !== "ADMIN" && (
                        <button
                          disabled={updatingId === u.id}
                          onClick={() => handleRoleChange(u.id, "ADMIN")}
                          className="rounded-lg border border-purple-200 bg-purple-50 px-2 py-1 text-[10px] font-semibold text-purple-700 hover:bg-purple-100"
                        >
                          Make Admin
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
