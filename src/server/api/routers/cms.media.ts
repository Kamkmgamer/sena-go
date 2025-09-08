import { z } from "zod";
import { createTRPCRouter, editorProcedure, adminProcedure } from "~/server/api/trpc";
import { media } from "~/server/db/schema";
import { desc, sql, eq } from "drizzle-orm";

const mediaInput = z.object({
  provider: z.string().default("local"),
  url: z.string().url(),
  publicId: z.string().optional(),
  width: z.number().int().optional(),
  height: z.number().int().optional(),
  mimeType: z.string().optional(),
  size: z.number().int().optional(),
});

export const cmsMediaRouter = createTRPCRouter({
  list: editorProcedure
    .input(z.object({ page: z.number().min(1).default(1), limit: z.number().min(1).max(100).default(24) }).optional())
    .query(async ({ ctx, input }) => {
      const page = input?.page ?? 1;
      const limit = input?.limit ?? 24;
      const offset = (page - 1) * limit;
      const [items, countRows] = await Promise.all([
        ctx.db.select().from(media).orderBy(desc(media.createdAt)).limit(limit).offset(offset),
        ctx.db.select({ count: sql<number>`count(*)` }).from(media),
      ]);
      const total = Number((countRows?.[0]?.count ?? 0) as unknown as number);
      return { items, page, limit, total };
    }),
  create: editorProcedure.input(mediaInput).mutation(async ({ ctx, input }) => {
    await ctx.db.insert(media).values(input);
  }),
  delete: adminProcedure.input(z.object({ id: z.number().int() })).mutation(async ({ ctx, input }) => {
    await ctx.db.delete(media).where(eq(media.id, input.id));
  }),
});
