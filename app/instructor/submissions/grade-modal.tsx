"use client";

import React, { useState } from "react";
import { Button } from "@/ui/button";
import { gradeSubmissionAction } from "@/actions/learning";
import { CheckCircle2 } from "lucide-react";

interface GradeModalProps {
  submission: any;
}

export function GradeSubmissionModal({ submission }: GradeModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [score, setScore] = useState(submission.score?.toString() || "95");
  const [feedback, setFeedback] = useState(submission.feedback || "");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await gradeSubmissionAction(submission.id, {
      score: parseFloat(score) || 0,
      feedback,
    });

    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        window.location.reload();
      }, 800);
    }
    setLoading(false);
  };

  return (
    <>
      <Button
        size="sm"
        onClick={() => setIsOpen(true)}
        className="rounded-xl bg-primary-600 text-white font-semibold text-xs"
      >
        {submission.status === "GRADED" ? "Edit Grade / Feedback" : "Grade Submission"}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900">
                Grade: {submission.student.name}
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                ✕ Close
              </button>
            </div>

            {success ? (
              <div className="rounded-2xl bg-emerald-50 p-6 text-center text-emerald-800 space-y-2">
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-600" />
                <h4 className="text-sm font-bold">Grade Saved Successfully!</h4>
                <p className="text-xs">Student has been notified with your feedback.</p>
              </div>
            ) : (
              <form onSubmit={handleGrade} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Score (out of {submission.assignment.maxScore}) *
                  </label>
                  <input
                    type="number"
                    min="0"
                    max={submission.assignment.maxScore}
                    required
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Constructive Feedback & Mentorship Notes *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide specific notes on what was done well and areas for refinement..."
                    className="w-full rounded-xl border border-slate-200 p-2.5 text-xs outline-none focus:border-primary-500"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t">
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="rounded-xl text-xs"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    size="sm"
                    disabled={loading}
                    className="rounded-xl bg-primary-600 text-white font-semibold text-xs"
                  >
                    {loading ? "Saving..." : "Submit Grade"}
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
