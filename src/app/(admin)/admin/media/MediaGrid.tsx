"use client";

import { api } from "~/trpc/react";

export default function MediaGrid() {
  const { data, isLoading, isError, refetch, isFetching } = api.cms.media.list.useQuery({ page: 1, limit: 24 });
  const items = data?.items ?? [];

  if (isLoading) return <div className="py-6 text-center">جاري التحميل...</div>;
  if (isError) return <div className="py-6 text-center text-red-600">حدث خطأ أثناء تحميل الوسائط</div>;

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-gray-600">
        لم يتم رفع أي ملفات بعد
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
      {items.map((m) => (
        <a key={m.id} href={m.url} target="_blank" rel="noreferrer" className="group block">
          <div className="aspect-square overflow-hidden rounded-md border">
            {m.mimeType?.startsWith("image/") ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={m.url} alt={m.publicId ?? ""} className="h-full w-full object-cover group-hover:scale-[1.02] transition" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-xs text-gray-600">{m.mimeType ?? "ملف"}</div>
            )}
          </div>
        </a>
      ))}
    </div>
  );
}
