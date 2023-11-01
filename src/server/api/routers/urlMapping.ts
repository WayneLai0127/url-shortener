import { z } from "zod";

import {
  createTRPCRouter,
  privateProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import {
  generateUniqueToken,
  isTokenUnique,
} from "~/server/helpers/urlMapping";

import { Ratelimit } from "@upstash/ratelimit"; // for deno: see above
import { Redis } from "@upstash/redis";
import { TRPCError } from "@trpc/server";

// Create a new ratelimiter, that allows 10 requests per 1 second
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, "1 s"),
  analytics: true,
});

export const urlMappingRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ longUrl: z.string().url("Incorrect url format") }))
    .mutation(async ({ ctx, input }) => {
      // limit api request per system (still finding solution to get inbound ip address)
      const { success } = await ratelimit.limit("api");
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });

      return ctx.db.urlMapping.create({
        data: {
          longUrl: input.longUrl,
          token: await generateUniqueToken(),
        },
      });
    }),

  createWithAlias: privateProcedure
    .input(
      z.object({
        longUrl: z.string().url("Incorrect url format"),
        alias: z.string().min(1).max(32, "Alias too long"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // limit api request per system (still finding solution to get inbound ip address)
      const { success } = await ratelimit.limit(ctx.userId);
      if (!success) throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      if (!(await isTokenUnique(input.alias)))
        throw new TRPCError({
          code: "CONFLICT",
          message: "ALIAS_ALREADY_EXIST",
        });

      return ctx.db.urlMapping.create({
        data: {
          longUrl: input.longUrl,
          token: input.alias,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  getByToken: publicProcedure
    .input(z.object({ token: z.string() }))
    .query(({ ctx, input: { token } }) =>
      ctx.db.urlMapping.findUnique({
        where: {
          token,
        },
      }),
    ),
});
