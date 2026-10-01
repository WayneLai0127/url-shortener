import {
  createTRPCClient,
  httpBatchStreamLink,
  loggerLink,
} from "@trpc/client";
import { headers } from "next/headers";

import { type AppRouter } from "~/server/api/root";
import { getUrl, transformer } from "./shared";

export const api = createTRPCClient<AppRouter>({
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
    // tRPC v11: the transformer is configured per terminating link.
    httpBatchStreamLink({
      transformer,
      url: getUrl(),
      // Next.js 16: `headers()` is async-only.
      async headers() {
        const heads = new Map(await headers());
        heads.set("x-trpc-source", "rsc");
        return Object.fromEntries(heads);
      },
    }),
  ],
});
