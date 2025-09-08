import { z } from "zod";
import { createTRPCRouter, editorProcedure, adminProcedure } from "~/server/api/trpc";
import { cmsPages } from "~/server/db/schema";
import { and, desc, ilike, sql, eq } from "drizzle-orm";

const pageInput = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  content: z.any().optional(),
  visible: z.boolean().optional(),
});

export const cmsPagesRouter = createTRPCRouter({
  list: editorProcedure
    .input(z.object({ page: z.number().min(1).default(1), limit: z.number().min(1).max(100).default(10), q: z.string().optional() }).optional())
    .query(async ({ ctx, input }) => {
      const page = input?.page ?? 1;
      const limit = input?.limit ?? 10;
      const offset = (page - 1) * limit;
      const where = input?.q ? and(ilike(cmsPages.title, `%${input.q}%`)) : undefined;
      const [items, countResult] = await Promise.all([
        ctx.db.select().from(cmsPages).where(where as any).orderBy(desc(cmsPages.createdAt)).limit(limit).offset(offset),
        ctx.db.select({ count: sql<number>`count(*)` }).from(cmsPages).where(where as any),
      ]);
      const total = Number(countResult?.[0]?.count ?? 0);
    }),
  byId: editorProcedure.input(z.object({ id: z.number().int() })).query(async ({ ctx, input }) => {
    const [row] = await ctx.db.select().from(cmsPages).where(eq(cmsPages.id, input.id)).limit(1);
    return row ?? null;
  }),
  create: editorProcedure.input(pageInput).mutation(async ({ ctx, input }) => {
    await ctx.db.insert(cmsPages).values({
      title: input.title,
      slug: input.slug,
      content: input.content ?? null,
      visible: input.visible ?? true,
    });
  }),
  update: editorProcedure.input(pageInput.partial().extend({ id: z.number().int() })).mutation(async ({ ctx, input }) => {
    const { id, ...data } = input;
    await ctx.db.update(cmsPages).set(data as any).where(eq(cmsPages.id, id));
  }),
  delete: adminProcedure.input(z.object({ id: z.number().int() })).mutation(async ({ ctx, input }) => {
    await ctx.db.delete(cmsPages).where(eq(cmsPages.id, input.id));
  }),
});
