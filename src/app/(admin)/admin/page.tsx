import { api } from "~/trpc/server";

export default async function AdminDashboardPage() {
  const stats = await api.admin.stats();
  return (
    <div className="space-y-8">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-semibold">الواجهة</h1>
      </header>

      <section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="card p-5">
            <div className="text-sm text-gray-600 mb-1">عدد المستخدمين</div>
            <div className="text-4xl font-extrabold tracking-tight">{stats.usersCount}</div>
          </div>
          <div className="card p-5">
            <div className="text-sm text-gray-600 mb-1">عدد المقالات</div>
            <div className="text-4xl font-extrabold tracking-tight">{stats.postsCount}</div>
          </div>
        </div>
      </section>
    </div>
  );
}
