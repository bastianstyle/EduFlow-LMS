"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Radio,
  FileText,
  Award,
  TrendingUp,
  MessageSquare,
  Calendar,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  Users,
  ShieldCheck,
  FolderTree,
  Activity,
  PlusCircle,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { logoutAction } from "@/actions/auth";
import { Role } from "@/types";

interface SidebarProps {
  role?: Role;
  userName?: string;
}

export function Sidebar({ role = "STUDENT", userName }: SidebarProps) {
  const pathname = usePathname();

  const handleLogout = async () => {
    const res = await logoutAction();
    if (res.success) {
      window.location.href = "/login";
    }
  };

  // Student Links (matching screenshot)
  const studentNav = [
    { label: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { label: "My Courses", href: "/student/courses", icon: BookOpen },
    { label: "Live Classes", href: "/student/live-classes", icon: Radio },
    { label: "Assignments", href: "/student/assignments", icon: FileText },
    { label: "Certificates", href: "/student/certificates", icon: Award },
    { label: "Progress", href: "/student/progress", icon: TrendingUp },
    { label: "Messages", href: "/student/messages", icon: MessageSquare },
    { label: "Calendar", href: "/student/calendar", icon: Calendar },
  ];

  // Instructor Links
  const instructorNav = [
    { label: "Dashboard", href: "/instructor/dashboard", icon: LayoutDashboard },
    { label: "My Courses", href: "/instructor/courses", icon: BookOpen },
    { label: "Create Course", href: "/instructor/courses/new", icon: PlusCircle },
    { label: "Submissions & Grading", href: "/instructor/submissions", icon: FileText },
    { label: "Question Bank", href: "/instructor/quizzes", icon: GraduationCap },
    { label: "Course Analytics", href: "/instructor/analytics", icon: TrendingUp },
  ];

  // Admin Links
  const adminNav = [
    { label: "Admin Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "User Management", href: "/admin/users", icon: Users },
    { label: "Course Moderation", href: "/admin/courses", icon: ShieldCheck },
    { label: "Categories", href: "/admin/categories", icon: FolderTree },
    { label: "Platform Analytics", href: "/admin/analytics", icon: TrendingUp },
    { label: "Activity Logs", href: "/admin/activity", icon: Activity },
  ];

  const currentNav =
    role === "ADMIN" ? adminNav : role === "INSTRUCTOR" ? instructorNav : studentNav;

  return (
    <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-primary-600 text-white shadow-xl transition-transform duration-300">
      {/* Brand Header */}
      <div className="flex h-20 items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-md transition group-hover:scale-105">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">
            EduFlow
          </span>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 space-y-1.5 overflow-y-auto px-4 py-2 scrollbar-none">
        <div className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-blue-200/70">
          {role} Workspace
        </div>
        {currentNav.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/student/dashboard" &&
              item.href !== "/instructor/dashboard" &&
              item.href !== "/admin/dashboard" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white/20 text-white shadow-inner font-semibold"
                  : "text-blue-100/85 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive ? "text-white" : "text-blue-200")} />
              <span>{item.label}</span>
            </Link>
          );
        })}

        {/* Upsell Card (matching screenshot) */}
        {role === "STUDENT" && (
          <div className="my-6 rounded-2xl bg-white p-4 text-slate-900 shadow-md">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Unlock Premium Access
              </h4>
            </div>
            <p className="text-xs text-slate-500 mb-3 leading-relaxed">
              Upgrade to Enterprise & enjoy exclusive live workshops and mentors!
            </p>
            <Link
              href="/pricing"
              className="inline-flex w-full items-center justify-center rounded-xl bg-primary-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-primary-700"
            >
              Upgrade Pro
            </Link>
          </div>
        )}
      </nav>

      {/* Footer Navigation */}
      <div className="border-t border-blue-500/40 p-4 space-y-1">
        <Link
          href="/settings"
          className="flex items-center gap-3.5 rounded-xl px-4 py-2.5 text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white transition"
        >
          <Settings className="h-4 w-4 text-blue-200" />
          <span>Settings</span>
        </Link>
        <Link
          href="/help"
          className="flex items-center gap-3.5 rounded-xl px-4 py-2.5 text-sm font-medium text-blue-100 hover:bg-white/10 hover:text-white transition"
        >
          <HelpCircle className="h-4 w-4 text-blue-200" />
          <span>Help Center</span>
        </Link>
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3.5 rounded-xl px-4 py-2.5 text-sm font-medium text-rose-200 hover:bg-rose-500/20 hover:text-white transition text-left"
        >
          <LogOut className="h-4 w-4 text-rose-300" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
