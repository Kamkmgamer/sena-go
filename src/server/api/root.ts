import { postRouter } from "~/server/api/routers/post";
import { adminRouter } from "~/server/api/routers/admin";
import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { cmsPostsRouter } from "~/server/api/routers/cms.posts";
import { cmsPagesRouter } from "~/server/api/routers/cms.pages";
import { cmsTaxonomyRouter } from "~/server/api/routers/cms.taxonomy";
import { cmsMediaRouter } from "~/server/api/routers/cms.media";
import { cmsSettingsRouter } from "~/server/api/routers/cms.settings";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  admin: adminRouter,
  cms: createTRPCRouter({
    posts: cmsPostsRouter,
    pages: cmsPagesRouter,
    taxonomy: cmsTaxonomyRouter,
    media: cmsMediaRouter,
    settings: cmsSettingsRouter,
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
