import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { Configuration, OpenAIApi } from "openai";
import { env } from "~/env.mjs";
import { S3 } from "aws-sdk";
import { base64Img } from "~/data/base64Img";
import { prisma } from "~/server/db";

const s3 = new S3({
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
  },
  region: "eu-north-1",
});
const configuration = new Configuration({
  apiKey: env.DALLE_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function generateIcon(prompt: string) {
  console.log("mock = ", env.MOCK_DALLE);
  if (env.MOCK_DALLE === "true") {
    return base64Img;
  } else {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "512x512",
      response_format: "b64_json",
    });
    return response.data.data[0]?.b64_json;
  }
}

export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(z.object({ prompt: z.string().min(1) }))
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

      const generatedImage = await generateIcon(input.prompt);
      if (!generatedImage)
        throw new TRPCError({
          message: "Unable to generate image",
          code: "BAD_REQUEST",
        });

      const icon = await ctx.prisma.icon.create({
        data: {
          prompt: input.prompt,
          userId: ctx.session.user.id,
        },
      });

      await s3
        .putObject({
          Bucket: "generator-ikon",
          Body: Buffer.from(generatedImage, "base64"),
          Key: icon.id,
          ContentEncoding: "base64",
          ContentType: "image/gif",
        })
        .promise();

      return {
        generatedImage: `https://generator-ikon.s3.eu-north-1.amazonaws.com/${icon.id}`,
      };
    }),
});
