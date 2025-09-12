import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Public routes that do NOT require auth
const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/contact",
  "/destinations",
  "/services",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/favicon.ico",
  // Public assets used in nav (ensure visible when signed out)
  "/logo_light.png",
  "/logo_dark.png",
  // IMPORTANT: tRPC runs auth() in context, but Clerk still needs middleware present.
  // Mark tRPC as public so unauthenticated calls to public procedures don't redirect.
  "/api/trpc(.*)",
  // UploadThing route should be callable without redirect as it handles auth internally if needed
  "/api/uploadthing(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    const { userId, redirectToSignIn } = await auth();
    if (!userId) {
      return redirectToSignIn({ returnBackUrl: request.url });
    }
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files, handle all other routes
    "/((?!_next/|.*\\..*).*)",
    "/",
  ],
};

