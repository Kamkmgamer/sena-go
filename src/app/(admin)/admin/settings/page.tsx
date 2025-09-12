export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-semibold">الإعدادات</h1>
        <button className="btn btn-primary">حفظ الإعدادات</button>
      </header>

      <section className="grid lg:grid-cols-2 gap-4">
        <div className="card p-5 space-y-4">
          <div className="text-sm text-gray-600">إعدادات الموقع</div>
          <div className="grid gap-3">
            <label className="text-sm">عنوان الموقع</label>
            <input placeholder="سلا جو" />
          </div>
          <div className="grid gap-3">
            <label className="text-sm">وصف قصير</label>
            <textarea placeholder="وصف موجز عن الموقع" rows={3} />
          </div>
        </div>
        <div className="card p-5 space-y-4">
          <div className="text-sm text-gray-600">الهوية البصرية</div>
          <div className="rounded-lg border border-dashed p-8 text-center text-gray-600">
            اختيار الشعار والصورة الافتراضية سيضاف لاحقًا.
          </div>
        </div>
        <div className="card p-5 space-y-4">
          <div className="text-sm text-gray-600">إعدادات SEO الافتراضية</div>
          <div className="grid gap-3">
            <label className="text-sm">عنوان افتراضي</label>
            <input placeholder="عنوان افتراضي للصفحات" />
          </div>
          <div className="grid gap-3">
            <label className="text-sm">وصف افتراضي</label>
            <textarea placeholder="وصف افتراضي يظهر إن لم يوجد" rows={3} />
          </div>
        </div>
      </section>
    </div>
  );
}
