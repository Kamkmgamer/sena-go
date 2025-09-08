import MediaUploader from "./MediaUploader";
import MediaGrid from "./MediaGrid";

export default function AdminMediaPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-semibold">الوسائط</h1>
        <MediaUploader />
      </header>

      <section className="card p-5">
        <div className="text-sm text-gray-600 mb-3">مكتبة الوسائط</div>
        <MediaGrid />
      </section>
    </div>
  );
}
