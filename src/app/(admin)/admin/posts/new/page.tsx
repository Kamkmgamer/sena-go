import NewPostForm from "../NewPostForm";

export default function AdminPostNewPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-semibold">مقالة جديدة</h1>
      </header>

      <NewPostForm />
    </div>
  );
}
