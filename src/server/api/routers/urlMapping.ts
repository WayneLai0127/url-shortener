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
        createdBy: z.string().max(255, "Creator name too long"),
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
          createdBy: input.createdBy,
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

  getByCreator: privateProcedure
    .input(z.object({ userId: z.string().max(255, "User Id Too Long") }))
    .query(({ ctx, input: { userId } }) =>
      ctx.db.urlMapping.findMany({
        where: {
          createdBy: userId,
        },
        orderBy: {
          createdAt: "desc",
        },
      }),
    ),

  increaseClickCount: publicProcedure
    .input(z.object({ alias: z.string().min(1).max(32) }))
    .mutation(async ({ ctx, input: { alias } }) => {
      // Find the URL mapping with the provided alias
      const urlMapping = await ctx.db.urlMapping.findUnique({
        where: {
          token: alias,
        },
      });

      if (!urlMapping) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "URL mapping not found",
        });
      }

      // Increment the click count
      const updatedUrlMapping = await ctx.db.urlMapping.update({
        where: {
          id: urlMapping.id,
        },
        data: {
          clickCount: urlMapping.clickCount + 1,
        },
      });

      return updatedUrlMapping;
    }),

  deleteById: privateProcedure
    .input(
      z.object({
        id: z.string().max(255),
      }),
    )
    .mutation(({ ctx, input: { id } }) =>
      ctx.db.urlMapping.delete({
        where: {
          id,
        },
      }),
    ),
});
