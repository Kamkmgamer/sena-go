"use client";

import { useState } from "react";
import { api, type RouterOutputs } from "~/trpc/react";

export default function PostsTable() {
  const [q, setQ] = useState("");
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading, isError, refetch, isFetching } = api.cms.posts.list.useQuery(
    { page, limit, q: q || undefined }
  );

  const items = data?.items ?? [];
  const total = data?.total ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <input
            className="w-full sm:w-64"
            placeholder="ابحث عن مقالة"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (setPage(1), refetch())}
          />
          <button className="btn btn-ghost" onClick={() => { setPage(1); refetch(); }}>
            بحث
          </button>
        </div>
        <div className="text-sm text-gray-600">
          {isFetching ? "يتم التحديث..." : total ? `إجمالي: ${total}` : "لا توجد نتائج"}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-start border-b">
              <th className="py-2 px-2 text-start">العنوان</th>
              <th className="py-2 px-2 text-start">الحالة</th>
              <th className="py-2 px-2 text-start">النشر</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td className="py-6 text-center" colSpan={3}>جاري التحميل...</td></tr>
            ) : items.length === 0 ? (
              <tr><td className="py-6 text-center" colSpan={3}>لا توجد مقالات</td></tr>
            ) : (
              items.map((p: RouterOutputs["cms"]["posts"]["list"]["items"][number]) => (
                <tr key={p.id} className="border-b hover:bg-black/5 dark:hover:bg-white/5">
                  <td className="py-2 px-2 font-medium">{p.title}</td>
                  <td className="py-2 px-2">{p.status}</td>
                  <td className="py-2 px-2">{p.publishedAt ? new Date(p.publishedAt).toLocaleString() : "—"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-3">
        <button
          className="btn btn-ghost"
          disabled={page <= 1}
          onClick={() => setPage((p) => Math.max(1, p - 1))}
        >
          السابق
        </button>
        <div className="text-sm">صفحة {page} من {totalPages}</div>
        <button
          className="btn btn-ghost"
          disabled={page >= totalPages}
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        >
          التالي
        </button>
      </div>
    </div>
  );
}
