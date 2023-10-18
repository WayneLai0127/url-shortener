import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generateUniqueToken } from "~/server/helpers/urlMapping";

export const urlMappingRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({ longUrl: z.string().url() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.urlMapping.create({
        data: {
          longUrl: input.longUrl,
          token: await generateUniqueToken(),
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
