import React from "react";
import Link from "next/link";
import { Check, ArrowLeft, Sparkles } from "lucide-react";
import { Button } from "@/ui/button";

export default function PricingPage() {
  const tiers = [
    {
      name: "Starter Student",
      price: "Free",
      period: "forever",
      description: "Access open public catalog courses, quizzes, and community forums.",
      features: [
        "Full access to standard courses",
        "Interactive lesson video player",
        "Self-paced quiz assessments",
        "Community mentorship questions",
      ],
      current: true,
    },
    {
      name: "EduFlow Pro",
      price: "$29",
      period: "per month",
      description: "Everything in Starter plus live workshops, direct grading, and verified certificates.",
      features: [
        "All free tier features",
        "Unlimited verified certificate issuance",
        "Live interactive class broadcasts",
        "Priority instructor project feedback",
        "Offline syllabus materials",
      ],
      highlight: true,
    },
    {
      name: "Enterprise Campus",
      price: "$99",
      period: "per seat/yr",
      description: "Institutional LMS with custom domain, administrative analytics, and team reporting.",
      features: [
        "All Pro tier benefits",
        "Dedicated Admin governance console",
        "Curriculum approval pipelines",
        "Custom institutional branding",
        "24/7 dedicated engineering support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F1F5F9] p-6 lg:p-12">
      <div className="mx-auto max-w-6xl space-y-8">
        <div>
          <Link
            href="/student/dashboard"
            className="text-xs font-semibold text-slate-500 hover:text-primary-600 flex items-center gap-1.5 mb-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <div className="text-center max-w-xl mx-auto space-y-2">
            <h1 className="text-3xl font-extrabold text-slate-900">
              Transparent, Scalable Learning Plans
            </h1>
            <p className="text-xs text-slate-500">
              Upgrade your academic toolkit with professional mentorship, verified credentials, and live masterclasses.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`rounded-3xl p-8 transition flex flex-col justify-between ${
                t.highlight
                  ? "bg-primary-600 text-white shadow-xl ring-2 ring-primary-600"
                  : "bg-white text-slate-900 border border-slate-100 shadow-soft"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">{t.name}</h3>
                  {t.highlight && (
                    <span className="rounded-full bg-white/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      Most Popular
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black">{t.price}</span>
                  <span className={`text-xs ${t.highlight ? "text-blue-100" : "text-slate-400"}`}>
                    /{t.period}
                  </span>
                </div>

                <p className={`text-xs ${t.highlight ? "text-blue-100" : "text-slate-500"}`}>
                  {t.description}
                </p>

                <div className="space-y-2.5 pt-4 border-t border-slate-100/20">
                  {t.features.map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5 text-xs">
                      <Check className={`h-4 w-4 ${t.highlight ? "text-white" : "text-primary-600"}`} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <Button
                  size="sm"
                  className={`w-full rounded-xl font-semibold text-xs h-10 ${
                    t.highlight
                      ? "bg-white text-primary-600 hover:bg-slate-100"
                      : "bg-primary-600 text-white hover:bg-primary-700"
                  }`}
                >
                  {t.current ? "Active Free Tier" : "Get Started Now"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
