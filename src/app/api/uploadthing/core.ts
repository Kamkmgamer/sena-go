import { createUploadthing } from "uploadthing/server";
import { NextRequest } from "next/server";

// File router for UploadThing
const f = createUploadthing();

export const ourFileRouter = {
  mediaUploader: f({
    // Allow images and videos; adjust limits as needed
    image: { maxFileSize: "8MB" },
    video: { maxFileSize: "64MB" },
  })
    .middleware(async ({ req }: { req: NextRequest | Request }) => {
      // You can check auth/roles here later if needed
      return {}; // Return an empty object as metadata
    })
    .onUploadComplete(async ({ file }: { file: { url: string; name: string; type: string; size: number } }) => {
      // Optional: extra server-side work after UploadThing stores the file
      return { url: file.url, name: file.name, type: file.type, size: file.size };
    }),
};

export type OurFileRouter = typeof ourFileRouter;
