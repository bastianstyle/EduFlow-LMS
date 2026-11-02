"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Award,
  ArrowRight,
  ArrowLeft,
  RefreshCw,
  FileQuestion,
} from "lucide-react";
import { Button } from "@/ui/button";
import { Badge } from "@/ui/badge";
import { submitQuizAttemptAction } from "@/actions/learning";

interface Question {
  id: string;
  text: string;
  type: string;
  optionsJson: string;
  correctAnswer: string;
  explanation?: string | null;
  points: number;
}

interface QuizRunnerProps {
  quiz: any;
  user: any;
  attempts: any[];
}

export function QuizRunner({ quiz, user, attempts }: QuizRunnerProps) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [currentIdx, setCurrentIdx] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimitMinutes * 60);
  const [isStarted, setIsStarted] = useState(false);

  const questions: Question[] = quiz.questions;
  const currentQuestion = questions[currentIdx];

  // Timer countdown
  useEffect(() => {
    if (!isStarted || result || timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isStarted, result, timeLeft]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleSelectAnswer = (option: string) => {
    if (result) return;
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: option }));
  };

  const handleSubmitQuiz = async () => {
    setSubmitting(true);
    const res = await submitQuizAttemptAction(quiz.id, answers);
    if (res.success) {
      setResult(res);
    }
    setSubmitting(false);
  };

  const parseOptions = (json: string): string[] => {
    try {
      return JSON.parse(json);
    } catch {
      return [];
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-3xl bg-white p-6 border border-slate-100 shadow-soft">
        <div>
          <div className="flex items-center gap-2">
            <Link
              href={`/student/learn/${quiz.course.slug}`}
              className="text-xs font-semibold text-slate-500 hover:text-primary-600"
            >
              &larr; Back to {quiz.course.title}
            </Link>
          </div>
          <h1 className="mt-1 text-xl font-bold text-slate-900">{quiz.title}</h1>
          <p className="text-xs text-slate-500">{quiz.description}</p>
        </div>

        {isStarted && !result && (
          <div className="flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-2 border border-amber-200 text-amber-700">
            <Clock className="h-4 w-4 animate-spin" />
            <span className="text-sm font-bold font-mono">{formatTimer(timeLeft)}</span>
          </div>
        )}
      </div>

      {!isStarted && !result ? (
        /* Start Quiz Prompt */
        <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-card space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary-50 text-primary-600">
            <FileQuestion className="h-8 w-8" />
          </div>
          <div className="max-w-md mx-auto space-y-2">
            <h2 className="text-xl font-bold text-slate-900">Ready to test your knowledge?</h2>
            <p className="text-xs text-slate-500">
              You will have {quiz.timeLimitMinutes} minutes to answer {questions.length} questions. You need {quiz.passingScore}% or higher to pass.
            </p>
          </div>

          <div className="flex justify-center">
            <Button
              size="lg"
              onClick={() => setIsStarted(true)}
              className="rounded-xl bg-primary-600 px-8 text-white font-semibold shadow-md hover:bg-primary-700"
            >
              Start Quiz Now
            </Button>
          </div>

          {attempts.length > 0 && (
            <div className="mt-8 border-t border-slate-100 pt-6 text-left">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                Previous Attempts
              </h3>
              <div className="divide-y divide-slate-100">
                {attempts.map((att: any, idx: number) => (
                  <div key={att.id} className="flex items-center justify-between py-2.5 text-xs">
                    <span className="font-semibold text-slate-700">
                      Attempt #{attempts.length - idx} &bull; {new Date(att.submittedAt).toLocaleDateString()}
                    </span>
                    <Badge variant={att.isPassed ? "success" : "danger"}>
                      {att.score}% ({att.isPassed ? "Passed" : "Failed"})
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : result ? (
        /* Quiz Results Display */
        <div className="space-y-6">
          <div
            className={`rounded-3xl border p-8 text-center shadow-card ${
              result.isPassed ? "border-emerald-200 bg-emerald-50/50" : "border-rose-200 bg-rose-50/50"
            }`}
          >
            <div
              className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${
                result.isPassed ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
              }`}
            >
              {result.isPassed ? <Award className="h-8 w-8" /> : <AlertCircle className="h-8 w-8" />}
            </div>
            <h2 className="mt-4 text-2xl font-black text-slate-900">
              {result.isPassed ? "Congratulations! You Passed 🎉" : "Keep Practicing! Quiz Incomplete"}
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              You scored <span className="font-bold text-slate-900">{result.score}%</span>. (Required: {quiz.passingScore}%)
            </p>
            <p className="text-xs text-slate-500 mt-1">
              Correct: {result.correctCount} / {result.totalQuestions} questions
            </p>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link href={`/student/learn/${quiz.course.slug}`}>
                <Button className="rounded-xl bg-primary-600 text-white font-semibold">
                  Back to Course
                </Button>
              </Link>
              <Button
                variant="outline"
                onClick={() => {
                  setResult(null);
                  setAnswers({});
                  setCurrentIdx(0);
                  setTimeLeft(quiz.timeLimitMinutes * 60);
                  setIsStarted(true);
                }}
                className="rounded-xl border-slate-300"
              >
                <RefreshCw className="mr-1.5 h-4 w-4" />
                Retake Quiz
              </Button>
            </div>
          </div>

          {/* Detailed Question Review */}
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-6">
            <h3 className="text-base font-bold text-slate-900">Detailed Question Review</h3>
            <div className="space-y-6">
              {questions.map((q, idx) => {
                const userAns = answers[q.id];
                const isCorrect = userAns === q.correctAnswer;
                const options = parseOptions(q.optionsJson);

                return (
                  <div key={q.id} className="rounded-2xl border border-slate-200 p-5 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-xs font-bold text-slate-400">
                        Question {idx + 1} of {questions.length}
                      </span>
                      {isCorrect ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                          <CheckCircle2 className="h-4 w-4" /> Correct (+{q.points} pts)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-rose-600">
                          <XCircle className="h-4 w-4" /> Incorrect (0 pts)
                        </span>
                      )}
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{q.text}</h4>

                    <div className="space-y-1.5">
                      {options.map((opt) => {
                        const isSelected = userAns === opt;
                        const isTheCorrectOne = q.correctAnswer === opt;

                        let style = "border-slate-200 bg-slate-50 text-slate-700";
                        if (isTheCorrectOne) {
                          style = "border-emerald-500 bg-emerald-50 text-emerald-900 font-semibold";
                        } else if (isSelected && !isTheCorrectOne) {
                          style = "border-rose-400 bg-rose-50 text-rose-800 line-through";
                        }

                        return (
                          <div
                            key={opt}
                            className={`rounded-xl border px-3 py-2 text-xs flex items-center justify-between ${style}`}
                          >
                            <span>{opt}</span>
                            {isTheCorrectOne && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                          </div>
                        );
                      })}
                    </div>

                    {q.explanation && (
                      <div className="rounded-xl bg-blue-50/60 p-3 text-xs text-blue-900">
                        <span className="font-bold">Explanation:</span> {q.explanation}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Active Question Runner */
        <div className="rounded-3xl border border-slate-100 bg-white p-6 md:p-8 shadow-card space-y-6">
          {/* Progress Pager */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-primary-600 uppercase tracking-wider">
              Question {currentIdx + 1} of {questions.length}
            </span>
            <span className="text-xs text-slate-400">
              {Object.keys(answers).length} answered
            </span>
          </div>

          {/* Question Text */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">{currentQuestion.text}</h3>

            {/* Options List */}
            <div className="space-y-3 pt-2">
              {parseOptions(currentQuestion.optionsJson).map((option) => {
                const isSelected = answers[currentQuestion.id] === option;

                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleSelectAnswer(option)}
                    className={`flex w-full items-center justify-between rounded-2xl border p-4 text-left text-sm font-medium transition ${
                      isSelected
                        ? "border-primary-600 bg-primary-50/70 text-primary-900 ring-2 ring-primary-500/20"
                        : "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <span>{option}</span>
                    <div
                      className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                        isSelected ? "border-primary-600 bg-primary-600 text-white" : "border-slate-300"
                      }`}
                    >
                      {isSelected && <div className="h-2 w-2 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer Controls */}
          <div className="flex items-center justify-between border-t border-slate-100 pt-6">
            <Button
              variant="outline"
              disabled={currentIdx === 0}
              onClick={() => setCurrentIdx((i) => i - 1)}
              className="rounded-xl border-slate-200 text-slate-700"
            >
              <ArrowLeft className="mr-1.5 h-4 w-4" />
              Previous
            </Button>

            {currentIdx < questions.length - 1 ? (
              <Button
                onClick={() => setCurrentIdx((i) => i + 1)}
                className="rounded-xl bg-primary-600 text-white hover:bg-primary-700 font-semibold"
              >
                Next Question
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmitQuiz}
                disabled={submitting}
                className="rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 font-semibold px-6 shadow-md"
              >
                {submitting ? "Grading..." : "Submit Quiz"}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
