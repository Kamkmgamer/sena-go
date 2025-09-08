export default function AdminPagesPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-semibold">الصفحات</h1>
        <a href="/admin/pages/new" className="btn btn-primary">صفحة جديدة</a>
      </header>

      <section className="card p-5">
        <div className="text-sm text-gray-600 mb-3">قائمة الصفحات</div>
        <div className="rounded-lg border border-dashed p-8 text-center text-gray-600">
          سيتم عرض جدول الصفحات هنا مع التصفية والبحث والصفحات.
        </div>
      </section>
    </div>
  );
}
