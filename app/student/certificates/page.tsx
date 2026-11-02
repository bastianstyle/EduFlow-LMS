import React from "react";
import Link from "next/link";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Award, ExternalLink, Calendar, CheckCircle } from "lucide-react";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";

export default async function StudentCertificatesPage() {
  const user = await getCurrentUser();
  if (!user) return null;

  const certificates = await prisma.certificate.findMany({
    where: { studentId: user.id },
    include: {
      course: {
        include: { instructor: true },
      },
    },
    orderBy: { issuedAt: "desc" },
  });

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Your Credentials & Certificates</h1>
        <p className="text-sm text-slate-500">
          Official digital certificates awarded upon 100% course curriculum completion.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certificates.map((cert) => (
          <div
            key={cert.id}
            className="flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-6 shadow-soft transition hover:shadow-card space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200">
                  <Award className="h-6 w-6" />
                </div>
                <Badge variant="success">Verified Authentic</Badge>
              </div>

              <div>
                <span className="text-[11px] font-mono font-bold tracking-wider text-slate-400 uppercase">
                  ID: {cert.certificateCode}
                </span>
                <h3 className="mt-1 text-lg font-bold text-slate-900">{cert.course.title}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Instructor: {cert.course.instructor.name}
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-slate-400">
                <Calendar className="h-3.5 w-3.5" />
                <span>Issued on {new Date(cert.issuedAt).toLocaleDateString()}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1">
                <CheckCircle className="h-3.5 w-3.5" /> Complete
              </span>
              <Link href={`/verify/${cert.certificateCode}`} target="_blank">
                <Button size="sm" className="rounded-xl bg-primary-600 text-white font-semibold text-xs">
                  View Certificate
                  <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                </Button>
              </Link>
            </div>
          </div>
        ))}

        {certificates.length === 0 && (
          <div className="col-span-full rounded-3xl border border-slate-200 bg-white p-12 text-center">
            <Award className="mx-auto h-12 w-12 text-slate-300" />
            <h3 className="mt-4 text-base font-semibold text-slate-800">No certificates earned yet</h3>
            <p className="text-xs text-slate-400 mt-1">
              Complete all lessons in an enrolled course to automatically receive an official accredited certificate.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
