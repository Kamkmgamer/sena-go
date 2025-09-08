import { z } from "zod";
import { createTRPCRouter, adminProcedure, protectedWithUserProcedure } from "~/server/api/trpc";
import { users, posts } from "~/server/db/schema";
import { eq, count } from "drizzle-orm";

export const adminRouter = createTRPCRouter({
  // Returns current user's role, bootstrapping first admin if none exists
  bootstrapAndMe: protectedWithUserProcedure
    .output(z.object({ role: z.enum(["admin", "editor", "viewer"]) }))
    .query(async ({ ctx }) => {
      if (!ctx.userId) throw new Error("UNAUTHORIZED");

      // If there are no admins, promote current user to admin
      const admins = await ctx.db.query.users.findMany({
        where: (t, { eq }) => eq(t.role, "admin"),
        limit: 1,
      });
      if (admins.length === 0) {
        // upsert current user as admin
        const existing = await ctx.db.query.users.findFirst({
          where: (t, { eq }) => eq(t.clerkUserId, ctx.userId!),
        });
        if (!existing) {
          await ctx.db.insert(users).values({ clerkUserId: ctx.userId!, role: "admin" });
          ctx.userRole = "admin";
        } else if (existing.role !== "admin") {
          await ctx.db.update(users).set({ role: "admin" }).where(eq(users.id, existing.id));
          ctx.userRole = "admin";
        }
      }

      return { role: (ctx.userRole ?? "viewer") as "admin" | "editor" | "viewer" };
    }),

  // Basic dashboard stats (admin-only)
  stats: adminProcedure.query(async ({ ctx }) => {
    const [usersCountRes, postsCountRes] = await Promise.all([
      ctx.db.select({ count: count(users.id) }).from(users),
      ctx.db.select({ count: count(posts.id) }).from(posts),
    ]);
    const usersCount = usersCountRes?.[0]?.count ?? 0;
    const postsCount = postsCountRes?.[0]?.count ?? 0;
    return { usersCount: Number(usersCount), postsCount: Number(postsCount) };
  }),
});
