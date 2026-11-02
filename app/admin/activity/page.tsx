import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { Activity, Clock } from "lucide-react";

export default async function AdminActivityPage() {
  const user = await getCurrentUser();

  const logs = await prisma.activityLog.findMany({
    include: { user: true },
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Platform Activity Audit Log</h1>
        <p className="text-xs text-slate-500 mt-1">
          Immutable event log of security, compliance, grading, and authentication activities.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-100 bg-white shadow-soft overflow-hidden">
        <div className="divide-y divide-slate-100">
          {logs.map((log) => (
            <div key={log.id} className="p-4 flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">{log.action}</span>
                  {log.user && (
                    <span className="text-slate-400">
                      &bull; {log.user.name} ({log.user.email})
                    </span>
                  )}
                </div>
                <p className="text-slate-600">{log.details}</p>
              </div>
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {new Date(log.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
