import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const iconsRouter = createTRPCRouter({
  getIcons: protectedProcedure.query(async ({ ctx }) => {
    const icons = await ctx.prisma.icon.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    if (icons.length === 0)
      throw new TRPCError({
        code: "NOT_FOUND",
      });
    return icons;
  }),
  getCommunityIcons: publicProcedure.query(async ({ ctx }) => {
    const comIcons = await ctx.prisma.icon.findMany({
      take: 20,
      orderBy: {
        createdAt: "desc",
      },
    });
    if (!comIcons)
      throw new TRPCError({
        code: "NOT_FOUND",
      });
    return comIcons;
  }),
});
