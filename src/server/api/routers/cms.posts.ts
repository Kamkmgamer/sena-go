import { z } from "zod";
import { createTRPCRouter, editorProcedure, adminProcedure, publicProcedure } from "~/server/api/trpc";
import { cmsPosts } from "~/server/db/schema";
import { and, desc, ilike, or, sql, eq } from "drizzle-orm";

const postInput = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  excerpt: z.string().optional(),
  content: z.any().optional(),
  status: z.enum(["draft", "published", "scheduled"]).optional(),
  publishedAt: z.coerce.date().optional().nullable(),
});

export const cmsPostsRouter = createTRPCRouter({
  bySlugPublished: publicProcedure
    .input(z.object({ slug: z.string().min(1) }))
    .query(async ({ ctx, input }) => {
      const [row] = await ctx.db
        .select()
        .from(cmsPosts)
        .where(and(eq(cmsPosts.slug, input.slug), eq(cmsPosts.status, "published")))
        .limit(1);
      return row ?? null;
    }),
  list: editorProcedure
    .input(
      z.object({
        page: z.number().int().min(1).default(1),
        limit: z.number().int().min(1).max(100).default(10),
        q: z.string().optional(),
        status: z.enum(["draft", "published", "scheduled"]).optional(),
      }).optional(),
    )
    .query(async ({ ctx, input }) => {
      const page = input?.page ?? 1;
      const limit = input?.limit ?? 10;
      const offset = (page - 1) * limit;

      const whereParts = [] as any[];
      if (input?.q) {
        whereParts.push(
          or(ilike(cmsPosts.title, `%${input.q}%`), ilike(cmsPosts.excerpt, `%${input.q}%`)),
        );
      }
      if (input?.status) whereParts.push(eq(cmsPosts.status, input.status));
      const where = whereParts.length ? and(...whereParts) : undefined;

      const [items, countResult] = await Promise.all([
        ctx.db
          .select()
          .from(cmsPosts)
          .where(where as any)
          .orderBy(desc(cmsPosts.createdAt))
          .limit(limit)
          .offset(offset),
        ctx.db.select({ count: sql<number>`count(*)` }).from(cmsPosts).where(where as any),
      ]);

      const total = Number(countResult?.[0]?.count ?? 0);

      return { items, page, limit, total };
    }),

  byId: editorProcedure.input(z.object({ id: z.number().int() })).query(async ({ ctx, input }) => {
    const [row] = await ctx.db.select().from(cmsPosts).where(eq(cmsPosts.id, input.id)).limit(1);
    return row ?? null;
  }),

  create: editorProcedure.input(postInput).mutation(async ({ ctx, input }) => {
    await ctx.db.insert(cmsPosts).values({
      title: input.title,
      slug: input.slug,
      excerpt: input.excerpt,
      content: input.content ?? null,
      status: input.status ?? "draft",
      publishedAt: input.publishedAt ?? null,
      authorId: null, // optional; map to users table later if needed
    });
  }),

  update: editorProcedure
    .input(postInput.partial().extend({ id: z.number().int() }))
    .mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      await ctx.db.update(cmsPosts).set(data as any).where(eq(cmsPosts.id, id));
    }),

  delete: adminProcedure.input(z.object({ id: z.number().int() })).mutation(async ({ ctx, input }) => {
    await ctx.db.delete(cmsPosts).where(eq(cmsPosts.id, input.id));
  }),
});
