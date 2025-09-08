import PostsTable from "./posts-table";

export default function AdminPostsPage() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-semibold">المقالات</h1>
        <a href="/admin/posts/new" className="btn btn-primary">مقالة جديدة</a>
      </header>

      <section className="card p-5">
        <div className="text-sm text-gray-600 mb-3">قائمة المقالات</div>
        <PostsTable />
      </section>
    </div>
  );
}
