# Issue: Type Incompatibility with Uploadthing and Next.js 15.5.2

## Description

Encountered a build failure due to a type error when using `uploadthing` with Next.js 15.5.2. The error indicates a type incompatibility related to how `Request` objects are handled in Next.js 15 API routes.

## Error Message

```
.next/types/app/api/uploadthing/route.ts:38:7
Type error: Type '{ __tag__: "GET"; __param_position__: "first"; __param_type__: Request | { request: Request; }; }' does not satisfy the constraint 'ParamCheck<NextRequest | Request>'.
  Types of property '__param_type__' are incompatible.
    Type 'Request | { request: Request; }' is not assignable to type 'NextRequest | Request'.
      Type '{ request: Request; }' is not assignable to type 'NextRequest | Request'.

  36 |     Diff<
  37 |       ParamCheck<Request | NextRequest>,
> 38 |       {
     |       ^
  39 |         __tag__: 'GET'
  40 |         __param_position__: 'first'
  41 |         __param_type__: FirstArg<MaybeField<TEntry, 'GET'>>
Next.js build worker exited with code: 1 and signal: null
```

## Context

-   **Next.js Version:** 15.5.2
-   **`uploadthing` Version:** 7.7.4 (latest as of 2025-09-08)
-   **`@uploadthing/react` Version:** 7.3.3 (latest as of 2025-09-08)
-   **`src/app/api/uploadthing/route.ts`:**
    ```typescript
    import { createRouteHandler } from "uploadthing/server";
    import { ourFileRouter } from "./core";

    const handler = createRouteHandler({
      router: ourFileRouter,
    });

    export const runtime = "nodejs";
    export { handler as GET, handler as POST };
    ```
-   **`src/app/api/uploadthing/core.ts`:**
    ```typescript
    import { createUploadthing } from "uploadthing/server";
    import { NextRequest } from "next/server";

    const f = createUploadthing();

    export const ourFileRouter = {
      mediaUploader: f({
        image: { maxFileSize: "8MB" },
        video: { maxFileSize: "64MB" },
      })
        .middleware(async ({ req }: { req: NextRequest | Request }) => {
          return { req }; // must return an object for the onUploadComplete
        })
        .onUploadComplete(async ({ file }: { file: { url: string; name: string; type: string; size: number } }) => {
          return { url: file.url, name: file.name, type: file.type, size: file.size };
        }),
    };

    export type OurFileRouter = typeof ourFileRouter;
    ```

## Attempted Solutions

1.  **Updating `uploadthing` packages:** Confirmed that `uploadthing` and `@uploadthing/react` are already at their latest versions (7.7.4 and 7.3.3 respectively) using `pnpm outdated` and `pnpm add <package>@latest`.
2.  **Modifying `middleware` return value:** Changed the `middleware` in `src/app/api/uploadthing/core.ts` to return an empty object (`return {};`) instead of `{ req }` to see if it would bypass the type error. This did not resolve the issue; the same type error persisted.

## Conclusion

The issue appears to be a compatibility problem between `uploadthing`'s internal type definitions and the way Next.js 15.5.2 handles `Request` objects. It seems `uploadthing` needs an update to fully support Next.js 15's breaking changes in this area.

## Proposed Action

Downgrade Next.js to a stable 14.x version as a temporary workaround until `uploadthing` releases an update compatible with Next.js 15.
