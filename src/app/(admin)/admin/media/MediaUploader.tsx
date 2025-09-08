"use client";

import { UploadButton } from "@uploadthing/react";
import type { OurFileRouter } from "~/app/api/uploadthing/core";
import { api } from "~/trpc/react";

export default function MediaUploader() {
  const utils = api.useUtils();
  const createMedia = api.cms.media.create.useMutation({
    onSuccess: () => utils.cms.media.list.invalidate(),
  });

  return (
    <div className="space-y-2">
      <UploadButton<OurFileRouter, "mediaUploader">
        className="btn btn-primary"
        endpoint="mediaUploader"
        onClientUploadComplete={(res: Array<{ url: string; key: string; type?: string; size?: number }>) => {
          // res is an array of uploaded files
          res?.forEach((f: { url: string; key: string; type?: string; size?: number }) => {
            createMedia.mutate({
              provider: "uploadthing",
              url: f.url,
              publicId: f.key,
              mimeType: f.type ?? undefined,
              size: typeof f.size === "number" ? f.size : undefined,
            });
          });
        }}
        onUploadError={(err: Error) => {
          console.error(err);
          alert("فشل الرفع، حاول مرة أخرى");
        }}
      />
    </div>
  );
}
