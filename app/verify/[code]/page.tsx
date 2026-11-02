import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Award, CheckCircle, ShieldCheck, Printer, ArrowLeft, BookOpen } from "lucide-react";
import { Button } from "@/ui/button";
import { CertificatePrintButton } from "./print-button";

interface VerifyPageProps {
  params: {
    code: string;
  };
}

export default async function CertificateVerifyPage({ params }: VerifyPageProps) {
  const certificate = await prisma.certificate.findUnique({
    where: { certificateCode: params.code },
    include: {
      student: true,
      course: {
        include: { instructor: true },
      },
    },
  });

  if (!certificate) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-4 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-rose-50 text-rose-600 mb-4">
          <Award className="h-8 w-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Certificate Not Found</h1>
        <p className="mt-1 text-xs text-slate-500 max-w-sm">
          No active certificate was found for code &quot;{params.code}&quot;. Please verify the code and try again.
        </p>
        <Link href="/verify" className="mt-6">
          <Button variant="outline" className="rounded-xl">
            Search Another Code
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100/70 py-10 px-4 print:bg-white print:p-0">
      {/* Top Header */}
      <div className="mx-auto max-w-4xl mb-6 flex items-center justify-between print:hidden">
        <Link href="/student/certificates" className="text-xs font-semibold text-slate-500 hover:text-primary-600 flex items-center gap-1.5">
          <ArrowLeft className="h-4 w-4" />
          Back to Certificates
        </Link>
        <CertificatePrintButton />
      </div>

      {/* Official Certificate Card */}
      <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border-8 border-double border-slate-300 bg-white p-10 md:p-16 shadow-2xl relative print:shadow-none print:border-4 print:p-8">
        {/* Subtle Watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.03]">
          <BookOpen className="h-96 w-96 text-slate-900" />
        </div>

        {/* Certificate Content */}
        <div className="relative z-10 text-center space-y-8">
          {/* Logo & Seal */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-6">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-600 text-white">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">EduFlow</span>
            </div>

            <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-bold text-emerald-800">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              Verified Authentic
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-2 pt-4">
            <h2 className="text-xs font-extrabold tracking-[0.25em] text-primary-600 uppercase">
              EduFlow Academic Accreditation
            </h2>
            <h1 className="text-3xl md:text-5xl font-serif font-black tracking-tight text-slate-900">
              Certificate of Completion
            </h1>
            <p className="text-xs text-slate-400 italic">
              This certificate is proudly awarded to
            </p>
          </div>

          {/* Recipient */}
          <div className="py-2">
            <span className="inline-block border-b-2 border-slate-900 pb-2 text-2xl md:text-4xl font-serif font-bold text-slate-900 px-8">
              {certificate.student.name}
            </span>
          </div>

          {/* Achievement Description */}
          <p className="max-w-xl mx-auto text-xs md:text-sm text-slate-600 leading-relaxed">
            for successfully completing all curriculum requirements, hands-on assignments, and examinations for the comprehensive professional masterclass:
          </p>

          <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-4 max-w-lg mx-auto">
            <h3 className="text-lg md:text-xl font-bold text-slate-900">
              {certificate.course.title}
            </h3>
          </div>

          {/* Signatures & Seal */}
          <div className="grid grid-cols-3 gap-6 pt-10 items-end border-t border-slate-200 mt-8">
            <div className="text-center space-y-1">
              <div className="font-serif italic text-lg text-slate-800 border-b border-slate-300 pb-1">
                {certificate.course.instructor.name}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Course Instructor
              </span>
            </div>

            {/* Gold Seal Emblem */}
            <div className="flex flex-col items-center justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100 border-4 border-amber-300 text-amber-700 shadow-md">
                <Award className="h-10 w-10" />
              </div>
              <span className="mt-1 text-[9px] font-bold uppercase tracking-widest text-amber-700">
                Official Seal
              </span>
            </div>

            <div className="text-center space-y-1">
              <div className="font-serif italic text-lg text-slate-800 border-b border-slate-300 pb-1">
                Eleanor Vance
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Academic Director
              </span>
            </div>
          </div>

          {/* Certificate Metadata Footer */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 border-t border-slate-100 gap-2">
            <span>Certificate ID: <strong className="font-mono text-slate-700">{certificate.certificateCode}</strong></span>
            <span>Issued: {new Date(certificate.issuedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</span>
            <span>Verify at: eduflow.com/verify</span>
          </div>
        </div>
      </div>
    </div>
  );
}
