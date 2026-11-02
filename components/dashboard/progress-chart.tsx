"use client";

import React, { useState } from "react";
import { ChevronDown, PieChart as PieIcon } from "lucide-react";

interface CategoryDistribution {
  name: string;
  percentage: number;
  color: string;
}

export function ProgressChart() {
  const [timeframe, setTimeframe] = useState<"Weekly" | "Monthly">("Weekly");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const weeklyData: CategoryDistribution[] = [
    { name: "Communication", percentage: 60, color: "#1D4ED8" }, // Blue
    { name: "UI Design", percentage: 24, color: "#8B5CF6" },      // Purple
    { name: "Coding", percentage: 16, color: "#06B6D4" },         // Teal
  ];

  const monthlyData: CategoryDistribution[] = [
    { name: "Communication", percentage: 45, color: "#1D4ED8" },
    { name: "UI Design", percentage: 35, color: "#8B5CF6" },
    { name: "Coding", percentage: 20, color: "#06B6D4" },
  ];

  const activeData = timeframe === "Weekly" ? weeklyData : monthlyData;

  // Calculate donut SVG stroke dashes
  // Circumference = 2 * PI * r = 2 * 3.14159 * 40 = 251.3
  const circumference = 251.3;

  let cumulativePercent = 0;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
      {/* Header with Dropdown */}
      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <PieIcon className="h-4 w-4 text-primary-600" />
          <h3 className="text-sm font-bold text-slate-800">Learning Progress</h3>
        </div>

        {/* Timeframe Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition"
          >
            <span>{timeframe}</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-1 w-28 rounded-xl border border-slate-100 bg-white p-1 shadow-lg z-20">
              <button
                onClick={() => {
                  setTimeframe("Weekly");
                  setDropdownOpen(false);
                }}
                className={`w-full rounded-lg px-2.5 py-1 text-left text-xs font-semibold transition ${
                  timeframe === "Weekly" ? "bg-primary-50 text-primary-700" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                Weekly
              </button>
              <button
                onClick={() => {
                  setTimeframe("Monthly");
                  setDropdownOpen(false);
                }}
                className={`w-full rounded-lg px-2.5 py-1 text-left text-xs font-semibold transition ${
                  timeframe === "Monthly" ? "bg-primary-50 text-primary-700" : "text-slate-600 hover:bg-slate-50"
                }`}
              >
                Monthly
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Donut Chart & Legend */}
      <div className="mt-4 flex flex-col items-center">
        {/* SVG Donut */}
        <div className="relative flex h-36 w-36 items-center justify-center">
          <svg className="h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
            {/* Background ring */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#F1F5F9"
              strokeWidth="14"
              fill="transparent"
            />
            {/* Slices */}
            {activeData.map((item) => {
              const strokeLength = (item.percentage / 100) * circumference;
              const strokeOffset = circumference - (cumulativePercent / 100) * circumference;
              cumulativePercent += item.percentage;

              return (
                <circle
                  key={item.name}
                  cx="50"
                  cy="50"
                  r="40"
                  stroke={item.color}
                  strokeWidth="14"
                  strokeDasharray={`${strokeLength} ${circumference - strokeLength}`}
                  strokeDashoffset={strokeOffset}
                  fill="transparent"
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>

          {/* Center Text */}
          <div className="absolute text-center">
            <span className="text-xl font-extrabold text-slate-800">100%</span>
            <span className="block text-[10px] font-medium text-slate-400">Total Goals</span>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-4 w-full space-y-2">
          {activeData.map((item) => (
            <div key={item.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-medium text-slate-600">{item.name}</span>
              </div>
              <span className="font-bold text-slate-800">{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
