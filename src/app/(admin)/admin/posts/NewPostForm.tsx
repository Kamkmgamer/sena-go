"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "~/trpc/react";

export default function NewPostForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [status, setStatus] = useState<"draft" | "published" | "scheduled">("draft");
  const [publishedAt, setPublishedAt] = useState<string>("");

  const utils = api.useUtils();
  const createMutation = api.cms.posts.create.useMutation({
    onSuccess: async () => {
      await utils.cms.posts.list.invalidate();
      router.push("/admin/posts");
    },
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    createMutation.mutate({
      title,
      slug,
      excerpt: excerpt || undefined,
      status,
      publishedAt: publishedAt ? new Date(publishedAt) : undefined,
      content: {},
    });
  }

  return (
    <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-4">
      <div className="lg:col-span-2 space-y-4">
        <div className="card p-5 space-y-3">
          <div className="grid gap-2">
            <label className="text-sm">العنوان</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <label className="text-sm">المسار (Slug)</label>
            <input value={slug} onChange={(e) => setSlug(e.target.value)} required />
          </div>
          <div className="grid gap-2">
            <label className="text-sm">ملخص</label>
            <textarea rows={3} value={excerpt} onChange={(e) => setExcerpt(e.target.value)} />
          </div>
          <div className="rounded-lg border border-dashed p-8 text-center text-gray-600">
            سيتم إضافة محرر النصوص لاحقًا (Tiptap).
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <div className="card p-5 space-y-3">
          <div className="grid gap-2">
            <label className="text-sm">الحالة</label>
            <select value={status} onChange={(e) => setStatus(e.target.value as any)}>
              <option value="draft">مسودّة</option>
              <option value="published">منشور</option>
              <option value="scheduled">مجدول</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm">تاريخ النشر</label>
            <input type="datetime-local" value={publishedAt} onChange={(e) => setPublishedAt(e.target.value)} />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={createMutation.isPending}>
            {createMutation.isPending ? "جاري الحفظ..." : "حفظ"}
          </button>
          {createMutation.isError && (
            <div className="text-sm text-red-600">حدث خطأ أثناء الحفظ، حاول مرة أخرى.</div>
          )}
        </div>
        <div className="card p-5">
          <div className="text-sm text-gray-600 mb-3">تحسينات SEO</div>
          <div className="rounded-lg border border-dashed p-6 text-center text-gray-600">
            الحقول الوصفية ستضاف لاحقًا.
          </div>
        </div>
      </div>
    </form>
  );
}
