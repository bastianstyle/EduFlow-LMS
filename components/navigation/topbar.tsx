"use client";

import React, { useState } from "react";
import { Search, Bell, Moon, Sun, CheckCircle2, ChevronDown, UserCheck } from "lucide-react";
import { Avatar } from "@/ui/avatar";
import { quickDemoLoginAction, logoutAction } from "@/actions/auth";
import { SessionUser, Role } from "@/types";
import Link from "next/link";

interface TopbarProps {
  user: SessionUser;
  unreadCount?: number;
}

export function Topbar({ user, unreadCount = 0 }: TopbarProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [switching, setSwitching] = useState(false);

  const handleQuickSwitch = async (role: Role) => {
    setSwitching(true);
    const res = await quickDemoLoginAction(role);
    if (res.success && res.redirectTo) {
      window.location.href = res.redirectTo;
    } else {
      setSwitching(false);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-slate-100 bg-white/90 px-8 backdrop-blur-md">
      {/* Search Input (matching screenshot) */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search courses, lessons, topics..."
          className="w-full rounded-full border border-slate-200 bg-slate-50/70 py-2.5 pl-11 pr-4 text-sm text-slate-800 placeholder-slate-400 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-100"
        />
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Quick Demo Switcher Pill */}
        <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-slate-100 p-1 border border-slate-200 text-xs">
          <span className="px-2 text-slate-500 font-medium">Demo Role:</span>
          <button
            onClick={() => handleQuickSwitch("ADMIN")}
            disabled={switching}
            className={`rounded-full px-2.5 py-1 font-semibold transition ${
              user.role === "ADMIN"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Admin
          </button>
          <button
            onClick={() => handleQuickSwitch("INSTRUCTOR")}
            disabled={switching}
            className={`rounded-full px-2.5 py-1 font-semibold transition ${
              user.role === "INSTRUCTOR"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Instructor
          </button>
          <button
            onClick={() => handleQuickSwitch("STUDENT")}
            disabled={switching}
            className={`rounded-full px-2.5 py-1 font-semibold transition ${
              user.role === "STUDENT"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            Student
          </button>
        </div>

        {/* Notification Bell */}
        <Link
          href={`/${user.role.toLowerCase()}/notifications`}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition"
          title="Notifications"
        >
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white">
              {unreadCount}
            </span>
          )}
        </Link>

        {/* User Avatar & Menu */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 rounded-full p-1 transition hover:ring-2 hover:ring-slate-100"
          >
            <Avatar
              src={user.avatar}
              fallback={getInitials(user.name)}
              size="md"
              className="border-2 border-primary-500"
            />
            <div className="hidden text-left md:block">
              <div className="text-sm font-semibold text-slate-800 leading-tight">
                {user.name}
              </div>
              <div className="text-xs font-medium text-slate-400 capitalize">
                {user.role.toLowerCase()}
              </div>
            </div>
            <ChevronDown className="hidden md:block h-4 w-4 text-slate-400" />
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl z-50">
              <div className="px-3 py-2 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-800">{user.name}</p>
                <p className="text-xs text-slate-400 truncate">{user.email}</p>
              </div>
              <div className="py-1">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                  onClick={() => setDropdownOpen(false)}
                >
                  <UserCheck className="h-4 w-4 text-slate-400" />
                  Your Profile
                </Link>
                <button
                  onClick={async () => {
                    await logoutAction();
                    window.location.href = "/login";
                  }}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 text-left"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
