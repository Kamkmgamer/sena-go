export default function AdminPageNewPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-semibold">صفحة جديدة</h1>
      </header>

      <section className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <div className="card p-5">
            <div className="text-sm text-gray-600 mb-3">المحتوى</div>
            <div className="rounded-lg border border-dashed p-8 text-center text-gray-600">
              محرر النصوص سيظهر هنا (Tiptap) مع الحفظ التلقائي.
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="card p-5">
            <div className="text-sm text-gray-600 mb-3">الخصائص</div>
            <div className="space-y-3 text-sm text-gray-700">
              <div>عنوان الصفحة، المسار (Slug)، الظهور في القائمة، إلخ.</div>
              <button className="btn btn-primary w-full">حفظ</button>
            </div>
          </div>
          <div className="card p-5">
            <div className="text-sm text-gray-600 mb-3">تحسينات SEO</div>
            <div className="rounded-lg border border-dashed p-6 text-center text-gray-600">
              الحقول الوصفية (العنوان والوصف والصورة وغيرها).
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
