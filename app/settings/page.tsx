import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { User, Bell, Shield, ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";

export default async function SettingsPage() {
  const user = await getCurrentUser();

  const returnUrl =
    user?.role === "ADMIN"
      ? "/admin/dashboard"
      : user?.role === "INSTRUCTOR"
      ? "/instructor/dashboard"
      : "/student/dashboard";

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-6 lg:p-12">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Link
              href={returnUrl}
              className="text-xs font-semibold text-slate-500 hover:text-primary-600 flex items-center gap-1.5 mb-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl font-bold text-slate-900">Account & Profile Settings</h1>
            <p className="text-xs text-slate-500 mt-1">
              Manage your personal credentials, communication preferences, and security settings.
            </p>
          </div>
          {user && <Badge variant="blue">{user.role} Account</Badge>}
        </div>

        <div className="rounded-3xl border border-slate-100 bg-white p-8 shadow-soft space-y-6">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
            <img
              src={
                user?.avatar ||
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=250"
              }
              alt={user?.name || "User"}
              className="h-16 w-16 rounded-full object-cover border-2 border-primary-100"
            />
            <div>
              <h3 className="text-lg font-bold text-slate-900">{user?.name}</h3>
              <p className="text-xs text-slate-400">{user?.email}</p>
              <span className="text-[11px] font-semibold text-emerald-600 mt-1 inline-flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Verified Active Status
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Full Legal Name
              </label>
              <input
                type="text"
                defaultValue={user?.name || ""}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs text-slate-800 outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                disabled
                defaultValue={user?.email || ""}
                className="w-full rounded-xl border border-slate-200 bg-slate-100 p-2.5 text-xs text-slate-500 cursor-not-allowed outline-none"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end">
            <Button size="sm" className="rounded-xl bg-primary-600 text-white font-semibold text-xs">
              Save Profile Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
