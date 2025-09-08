export default function AdminTaxonomyPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-semibold">التصنيفات والوسوم</h1>
        <div className="flex items-center gap-2">
          <button className="btn btn-primary">تصنيف جديد</button>
          <button className="btn btn-ghost">وسم جديد</button>
        </div>
      </header>

      <section className="grid lg:grid-cols-2 gap-4">
        <div className="card p-5">
          <div className="text-sm text-gray-600 mb-3">التصنيفات</div>
          <div className="rounded-lg border border-dashed p-8 text-center text-gray-600">
            سيتم عرض قائمة التصنيفات هنا مع الإضافة والتعديل والحذف.
          </div>
        </div>
        <div className="card p-5">
          <div className="text-sm text-gray-600 mb-3">الوسوم</div>
          <div className="rounded-lg border border-dashed p-8 text-center text-gray-600">
            سيتم عرض قائمة الوسوم هنا مع الإضافة والتعديل والحذف.
          </div>
        </div>
      </section>
    </div>
  );
}
