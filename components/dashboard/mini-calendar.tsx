"use client";

import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

export function MiniCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 5, 9)); // June 9, 2026 matching screenshot

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // First day of current month
  const firstDay = new Date(year, month, 1).getDay();
  // Total days in month
  const totalDays = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  // Build calendar matrix
  const days = [];
  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }
  for (let d = 1; d <= totalDays; d++) {
    days.push(d);
  }

  const selectedDay = 9;

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-soft">
      {/* Calendar Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-primary-600" />
          <span className="text-sm font-bold text-slate-800">
            {monthNames[month]} {selectedDay < 10 ? `0${selectedDay}` : selectedDay}, {year}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={prevMonth}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextMonth}
            className="flex h-7 w-7 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 transition"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Weekdays */}
      <div className="mt-3 grid grid-cols-7 gap-1 text-center">
        {daysOfWeek.map((day) => (
          <div key={day} className="text-[10px] font-semibold text-slate-400">
            {day}
          </div>
        ))}
      </div>

      {/* Days Matrix */}
      <div className="mt-2 grid grid-cols-7 gap-1 text-center">
        {days.map((day, idx) => {
          if (!day) {
            return <div key={`empty-${idx}`} className="h-7 w-7" />;
          }

          const isSelected = day === selectedDay && month === 5 && year === 2026;
          const isToday = day === 9;

          return (
            <button
              key={`day-${day}`}
              className={`mx-auto flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition ${
                isSelected
                  ? "bg-primary-600 text-white shadow-sm"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>
    </div>
  );
}
