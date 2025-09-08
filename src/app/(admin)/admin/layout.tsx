import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { api, HydrateClient } from "~/trpc/server";
import AdminShell from "./AdminShell";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  // Ensure user exists and bootstrap first admin if needed, then check role
  const me = await api.admin.bootstrapAndMe();
  if (me.role !== "admin") {
    redirect("/");
  }

  return (
    <HydrateClient>
      <AdminShell>{children}</AdminShell>
    </HydrateClient>
  );
}
