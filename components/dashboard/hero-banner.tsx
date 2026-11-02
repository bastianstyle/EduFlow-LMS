"use client";

import React from "react";
import Link from "next/link";
import { Flame, Clock, Award, ArrowRight } from "lucide-react";
import { Button } from "@/ui/button";

interface HeroBannerProps {
  userName: string;
  streakDays?: number;
  learningHours?: number;
  xpPoints?: number;
  continueCourseSlug?: string;
}

export function HeroBanner({
  userName,
  streakDays = 32,
  learningHours = 126,
  xpPoints = 3600,
  continueCourseSlug = "ui-ux-design-masterclass",
}: HeroBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-900 p-8 text-white shadow-card">
      {/* Background ambient gradient glow */}
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-48 h-80 w-80 rounded-full bg-purple-600/20 blur-3xl" />

      <div className="relative z-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        {/* Left Welcome Text */}
        <div className="max-w-xl space-y-3">
          <h1 className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            Welcome back, {userName.split(" ")[0]} 👋
          </h1>
          <p className="text-sm text-slate-300 md:text-base leading-relaxed">
            You&apos;ve completed <span className="font-semibold text-white">85%</span> of your weekly goal. Keep going to hit 20 learning hours!
          </p>

          <div className="pt-2">
            <Link href={`/student/learn/${continueCourseSlug}`}>
              <Button className="h-11 rounded-xl bg-primary-600 px-6 font-semibold text-white shadow-md hover:bg-primary-700">
                Continue Learning
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Right Gamification Rings (matching screenshot) */}
        <div className="flex items-center gap-4 sm:gap-6 self-start lg:self-center">
          {/* Streak Ring */}
          <div className="flex flex-col items-center">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-blue-500/30 bg-slate-800/80 shadow-inner">
              <div className="text-center">
                <span className="text-xl font-extrabold text-white">{streakDays}</span>
              </div>
            </div>
            <span className="mt-2 text-xs font-medium text-slate-300">Current streak</span>
          </div>

          {/* Learning Hours Ring (Purple) */}
          <div className="flex flex-col items-center">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-purple-500 bg-slate-800/80 shadow-inner">
              <div className="text-center">
                <span className="text-xl font-extrabold text-white">{Math.round(learningHours)}</span>
              </div>
            </div>
            <span className="mt-2 text-xs font-medium text-purple-200">Learning hours</span>
          </div>

          {/* XP Points Ring (Teal) */}
          <div className="flex flex-col items-center">
            <div className="relative flex h-20 w-20 items-center justify-center rounded-full border-4 border-cyan-400 bg-slate-800/80 shadow-inner">
              <div className="text-center">
                <span className="text-xl font-extrabold text-white">
                  {xpPoints >= 1000 ? `${(xpPoints / 1000).toFixed(1)}K` : xpPoints}
                </span>
              </div>
            </div>
            <span className="mt-2 text-xs font-medium text-cyan-200">XP points</span>
          </div>
        </div>
      </div>
    </div>
  );
}
