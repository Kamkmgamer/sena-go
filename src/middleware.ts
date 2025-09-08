import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/about",
  "/contact",
  "/destinations",
  "/services",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/favicon.ico",
  "/api/trpc(.*)",
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
    "/((?!.+\.[\w]+$|_next).*)",
    "/",
    "/admin(.*)", // Explicitly match admin routes
  ],
};