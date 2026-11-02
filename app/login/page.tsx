"use client";

import React, { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { BookOpen, ArrowRight, ShieldCheck, Users, GraduationCap, AlertCircle } from "lucide-react";
import { Button } from "@/ui/button";
import { loginAction } from "@/actions/auth";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialRole = searchParams.get("role");

  const [email, setEmail] = useState("alex@eduflow.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (initialRole === "ADMIN") {
      setEmail("admin@eduflow.com");
      setPassword("password123");
    } else if (initialRole === "INSTRUCTOR") {
      setEmail("sarah.jenkins@eduflow.com");
      setPassword("password123");
    } else if (initialRole === "STUDENT") {
      setEmail("alex@eduflow.com");
      setPassword("password123");
    }
  }, [initialRole]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await loginAction({ email, password });
    if (res.success && res.redirectTo) {
      router.push(res.redirectTo);
      router.refresh();
    } else {
      setError(res.error || "Login failed");
      setLoading(false);
    }
  };

  const setDemoCredentials = (roleEmail: string) => {
    setEmail(roleEmail);
    setPassword("password123");
    setError(null);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F1F5F9] px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        {/* Brand */}
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-600 text-white shadow-md transition group-hover:scale-105">
              <BookOpen className="h-6 w-6" />
            </div>
            <span className="text-2xl font-black tracking-tight text-slate-900">
              EduFlow
            </span>
          </Link>
          <h2 className="mt-4 text-xl font-bold tracking-tight text-slate-900">
            Sign in to your account
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Enter your credentials or choose a pre-loaded demo account below.
          </p>
        </div>

        {/* Demo Account Quick Buttons */}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-soft">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            One-Click Demo Accounts
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => setDemoCredentials("alex@eduflow.com")}
              className={`flex flex-col items-center justify-center rounded-xl p-2.5 text-xs font-semibold border transition ${
                email === "alex@eduflow.com"
                  ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <GraduationCap className="h-4 w-4 mb-1 text-emerald-600" />
              Student (Alex)
            </button>

            <button
              type="button"
              onClick={() => setDemoCredentials("sarah.jenkins@eduflow.com")}
              className={`flex flex-col items-center justify-center rounded-xl p-2.5 text-xs font-semibold border transition ${
                email === "sarah.jenkins@eduflow.com"
                  ? "border-blue-500 bg-blue-50 text-blue-800"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <Users className="h-4 w-4 mb-1 text-primary-600" />
              Instructor (Sarah)
            </button>

            <button
              type="button"
              onClick={() => setDemoCredentials("admin@eduflow.com")}
              className={`flex flex-col items-center justify-center rounded-xl p-2.5 text-xs font-semibold border transition ${
                email === "admin@eduflow.com"
                  ? "border-purple-500 bg-purple-50 text-purple-800"
                  : "border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100"
              }`}
            >
              <ShieldCheck className="h-4 w-4 mb-1 text-purple-600" />
              Admin
            </button>
          </div>
        </div>

        {/* Main Form */}
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-card">
          {error && (
            <div className="mb-4 flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs font-medium text-rose-700">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-100"
                placeholder="name@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <span className="text-xs text-slate-400">Demo: password123</span>
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-primary-500 focus:bg-white focus:ring-2 focus:ring-primary-100"
                placeholder="••••••••"
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl bg-primary-600 font-semibold text-white shadow-sm hover:bg-primary-700"
            >
              {loading ? "Signing in..." : "Sign In to EduFlow"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don&apos;t have an account yet?{" "}
            <Link href="/register" className="font-semibold text-primary-600 hover:underline">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F1F5F9] flex items-center justify-center text-xs text-slate-400">Loading EduFlow...</div>}>
      <LoginForm />
    </Suspense>
  );
}
