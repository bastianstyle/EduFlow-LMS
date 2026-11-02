"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Award, Search, ShieldCheck, BookOpen, ArrowRight } from "lucide-react";
import { Button } from "@/ui/button";

export default function VerifySearchPage() {
  const router = useRouter();
  const [code, setCode] = useState("EDU-2026-ALX994");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.trim()) {
      router.push(`/verify/${code.trim().toUpperCase()}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="border-b border-slate-200 bg-white py-4 px-6">
        <div className="mx-auto max-w-7xl flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white">
              <BookOpen className="h-5 w-5" />
            </div>
            <span className="text-xl font-bold text-slate-900">EduFlow</span>
          </Link>
          <Link href="/login">
            <Button size="sm" variant="outline" className="rounded-xl text-xs font-semibold">
              Sign In
            </Button>
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-xl px-4 py-20 text-center space-y-8">
        <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-3xl bg-primary-50 text-primary-600 border border-primary-200">
          <ShieldCheck className="h-8 w-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold text-slate-900">
            Verify an EduFlow Certificate
          </h1>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Enter the unique credential code found on the certificate to verify its authenticity, course details, and graduation record.
          </p>
        </div>

        <form onSubmit={handleSearch} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-card space-y-4">
          <div className="text-left">
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Certificate Credential Code
            </label>
            <input
              type="text"
              required
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="e.g. EDU-2026-ALX994"
              className="w-full rounded-xl border border-slate-200 p-3 text-sm font-mono uppercase outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-100"
            />
          </div>

          <Button type="submit" className="w-full rounded-xl bg-primary-600 text-white font-semibold">
            Verify Certificate Record
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>

        <p className="text-[11px] text-slate-400">
          Try sample code: <button onClick={() => setCode("EDU-2026-ALX994")} className="font-mono text-primary-600 font-bold underline">EDU-2026-ALX994</button>
        </p>
      </main>
    </div>
  );
}
