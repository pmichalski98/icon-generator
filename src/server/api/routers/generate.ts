import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(z.object({ prompt: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { count } = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session.user.id,
          credits: {
            gte: 1,
          },
        },
        data: { credits: { decrement: 1 } },
      });
      if (count <= 0)
        throw new TRPCError({
          message: "Not enough credits",
          code: "BAD_REQUEST",
        });
      return {
        message: "some generated image",
      };
    }),
});
