import { createRouteHandler } from "uploadthing/next";
import { ourFileRouter } from "./core";

const handler = createRouteHandler({
  router: ourFileRouter,
});

export const runtime = "nodejs"; // This line is important!
export const GET = handler.GET;
export const POST = handler.POST;