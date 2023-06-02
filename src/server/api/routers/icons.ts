import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { z } from "zod";
import { env } from "~/env.mjs";

const client = new S3Client({
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
  },
  region: "eu-north-1",
});
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
  downloadIcon: protectedProcedure
    .input(z.object({ iconId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const command = new GetObjectCommand({
        Bucket: "generator-ikon",
        Key: input.iconId,
      });
      try {
        const res = await client.send(command);
        return res.Body?.transformToByteArray();
      } catch (err) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Błąd podczas pobierania ikonki",
        });
      }
    }),
});
