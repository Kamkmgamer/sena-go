import { z } from "zod";
import { createTRPCRouter, editorProcedure, adminProcedure } from "~/server/api/trpc";
import { categories, tags } from "~/server/db/schema";
import { and, desc, ilike, sql, eq } from "drizzle-orm";

const catInput = z.object({ name: z.string().min(1), slug: z.string().min(1), description: z.string().optional() });
const tagInput = z.object({ name: z.string().min(1), slug: z.string().min(1) });

export const cmsTaxonomyRouter = createTRPCRouter({
  categories: {
    list: editorProcedure
      .input(z.object({ page: z.number().min(1).default(1), limit: z.number().min(1).max(100).default(20), q: z.string().optional() }).optional())
      .query(async ({ ctx, input }) => {
        const page = input?.page ?? 1;
        const limit = input?.limit ?? 20;
        const offset = (page - 1) * limit;
        const where = input?.q ? and(ilike(categories.name, `%${input.q}%`)) : undefined;
        const [items, countRows] = await Promise.all([
          ctx.db
            .select()
            .from(categories)
            .where(where as any)
            .orderBy(desc(categories.createdAt))
            .limit(limit)
            .offset(offset),
          ctx.db.select({ count: sql<number>`count(*)` }).from(categories).where(where as any),
        ]);
        const total = Number((countRows?.[0]?.count ?? 0) as unknown as number);
        return { items, page, limit, total };
      }),
    create: editorProcedure.input(catInput).mutation(async ({ ctx, input }) => {
      await ctx.db.insert(categories).values(input);
    }),
    update: editorProcedure.input(catInput.partial().extend({ id: z.number().int() })).mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      await ctx.db.update(categories).set(data as any).where(eq(categories.id, id));
    }),
    delete: adminProcedure.input(z.object({ id: z.number().int() })).mutation(async ({ ctx, input }) => {
      await ctx.db.delete(categories).where(eq(categories.id, input.id));
    }),
  },
  tags: {
    list: editorProcedure
      .input(z.object({ page: z.number().min(1).default(1), limit: z.number().min(1).max(100).default(20), q: z.string().optional() }).optional())
      .query(async ({ ctx, input }) => {
        const page = input?.page ?? 1;
        const limit = input?.limit ?? 20;
        const offset = (page - 1) * limit;
        const where = input?.q ? and(ilike(tags.name, `%${input.q}%`)) : undefined;
        const [items, countRows] = await Promise.all([
          ctx.db
            .select()
            .from(tags)
            .where(where as any)
            .orderBy(desc(tags.createdAt))
            .limit(limit)
            .offset(offset),
          ctx.db.select({ count: sql<number>`count(*)` }).from(tags).where(where as any),
        ]);
        const total = Number((countRows?.[0]?.count ?? 0) as unknown as number);
        return { items, page, limit, total };
      }),
    create: editorProcedure.input(tagInput).mutation(async ({ ctx, input }) => {
      await ctx.db.insert(tags).values(input);
    }),
    update: editorProcedure.input(tagInput.partial().extend({ id: z.number().int() })).mutation(async ({ ctx, input }) => {
      const { id, ...data } = input;
      await ctx.db.update(tags).set(data as any).where(eq(tags.id, id));
    }),
    delete: adminProcedure.input(z.object({ id: z.number().int() })).mutation(async ({ ctx, input }) => {
      await ctx.db.delete(tags).where(eq(tags.id, input.id));
    }),
  },
});
