import React from "react";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { FolderTree, BookOpen, Plus } from "lucide-react";
import { Badge } from "@/ui/badge";

export default async function AdminCategoriesPage() {
  const user = await getCurrentUser();

  const categories = await prisma.category.findMany({
    include: {
      courses: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div className="border-b border-slate-100 pb-4">
        <h1 className="text-2xl font-bold text-slate-900">Category Taxonomy</h1>
        <p className="text-xs text-slate-500 mt-1">
          Academic subject categorizations for organizing course catalogs and student discovery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="rounded-3xl border border-slate-100 bg-white p-6 shadow-soft space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-primary-600">
                <FolderTree className="h-5 w-5" />
              </div>
              <Badge variant="blue">{cat.courses.length} Courses</Badge>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">{cat.name}</h3>
              <span className="text-[11px] font-mono text-slate-400">slug: {cat.slug}</span>
              <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                {cat.description || "General academic and practical curriculum category."}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
