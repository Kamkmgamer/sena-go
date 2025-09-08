import { z } from "zod";
import { createTRPCRouter, adminProcedure, editorProcedure } from "~/server/api/trpc";
import { settings } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export const cmsSettingsRouter = createTRPCRouter({
  getMany: editorProcedure
    .input(z.object({ keys: z.array(z.string().min(1)) }))
    .query(async ({ ctx, input }) => {
      const rows = await Promise.all(
        input.keys.map(async (key) => {
          const [row] = await ctx.db.select().from(settings).where(eq(settings.key, key)).limit(1);
          return { key, value: row?.value ?? null } as { key: string; value: unknown };
        }),
      );
      return rows;
    }),

  set: adminProcedure
    .input(z.object({ key: z.string().min(1), value: z.any() }))
    .mutation(async ({ ctx, input }) => {
      const [existing] = await ctx.db.select().from(settings).where(eq(settings.key, input.key)).limit(1);
      if (existing) {
        await ctx.db.update(settings).set({ value: input.value }).where(eq(settings.key, input.key));
      } else {
        await ctx.db.insert(settings).values({ key: input.key, value: input.value });
      }
    }),
});
