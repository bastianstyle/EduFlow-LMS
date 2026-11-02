"use client";

import React, { useState } from "react";
import { Button } from "@/ui/button";
import { UploadCloud, CheckCircle, ExternalLink } from "lucide-react";
import { submitAssignmentAction } from "@/actions/learning";

interface DrawerProps {
  assignmentId: string;
  submission?: any;
}

export function AssignmentSubmissionDrawer({ assignmentId, submission }: DrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(submission?.content || "");
  const [attachmentUrl, setAttachmentUrl] = useState(submission?.attachmentUrl || "");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const res = await submitAssignmentAction(assignmentId, {
      content,
      attachmentUrl,
    });

    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        setIsOpen(false);
        window.location.reload();
      }, 1000);
    }
    setSubmitting(false);
  };

  return (
    <>
      <Button
        size="sm"
        onClick={() => setIsOpen(true)}
        className="rounded-xl bg-primary-600 text-white font-semibold text-xs"
      >
        {submission ? "View / Edit Submission" : "Submit Assignment"}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="w-full max-w-lg rounded-3xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h3 className="text-base font-bold text-slate-900">
                {submission ? "Your Submission" : "Submit Your Deliverable"}
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
                <CheckCircle className="mx-auto h-10 w-10 text-emerald-600" />
                <h4 className="text-sm font-bold">Submission Received!</h4>
                <p className="text-xs">Your instructor will review and grade your work shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Solution & Design Notes
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 p-3 text-xs outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-100"
                    placeholder="Describe your design choices, key decisions, or repository walkthrough..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Attachment or Live Project Link (Figma, GitHub, URL)
                  </label>
                  <input
                    type="url"
                    value={attachmentUrl}
                    onChange={(e) => setAttachmentUrl(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-100"
                    placeholder="https://figma.com/@project or https://github.com/..."
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
                    disabled={submitting}
                    className="rounded-xl bg-primary-600 text-white font-semibold text-xs"
                  >
                    {submitting ? "Uploading..." : "Confirm & Submit"}
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
