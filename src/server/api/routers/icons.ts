import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const iconsRouter = createTRPCRouter({
  getIcons: protectedProcedure.query(async ({ ctx }) => {
    const icons = await ctx.prisma.icon.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
    if (icons.length === 0) throw new Error("asd");
    return icons;
  }),
});
