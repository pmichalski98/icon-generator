import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import OpenAI from "openai";
import { env } from "~/env.mjs";
import { S3 } from "aws-sdk";
import { base64Img } from "~/data/base64Img";
import axios from "axios";

const s3 = new S3({
  credentials: {
    accessKeyId: env.S3_ACCESS_KEY,
    secretAccessKey: env.S3_SECRET_KEY,
  },
  region: "eu-north-1",
});

const openai = new OpenAI({
  apiKey: env.DALLE_API_KEY,

});

async function generateIcon(prompt: string, quantity = 1) {
  console.log("mock = ", env.MOCK_DALLE);
  if (env.MOCK_DALLE === "true") {
    return new Array<string>(quantity).fill(base64Img as string);
  } else {
        const response = await openai.images.generate({
      model: "dall-e-3",
        prompt,
          style: "natural",
      response_format: "b64_json",
    });

    return response.data.map((result) => result.b64_json || "");
  }
}

export const generateRouter = createTRPCRouter({
  generateIcon: protectedProcedure
    .input(
      z.object({
        prompt: z.string().min(1),
        color: z.string(),
        quantity: z.number().min(1).max(10),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { count } = await ctx.prisma.user.updateMany({
        where: {
          id: ctx.session.user.id,
          credits: {
            gte: input.quantity,
          },
        },
        data: { credits: { decrement: input.quantity } },
      });
      const usersPrompt = input.prompt;

      if (count <= 0)
        throw new TRPCError({
          message: "Nie masz wystarczająco środków, doładuj konto",
          code: "BAD_REQUEST",
        });

      if (env.MOCK_DALLE !== "true") {
        axios.defaults.headers.post["Authorization"] = env.DEEPL_API_KEY;
        const res = await axios.post(
          `http://api-free.deepl.com/v2/translate?text=${input.prompt}&target_lang=EN-US&source_lang=PL`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        input.prompt = res.data.translations[0].text as string;
      }
      const modificators = 'material, shiny, minimalistic, high quality, trending on art station, unreal engine graphics quality clean --no text --no dof'

      const finalPrompt = `modern icon of ${input.prompt}, ${
        input.color !== "random" ? input.color.concat(" ,") : ""
      } ${modificators}`;
      const b64Images = await generateIcon(finalPrompt, input.quantity);
      if (!b64Images)
        throw new TRPCError({
          message: "Błąd podczas generowania ikon",
          code: "BAD_REQUEST",
        });

      return await Promise.all(
        b64Images.map(async (image) => {
          const icon = await ctx.prisma.icon.create({
            data: {
              prompt: usersPrompt,
              userId: ctx.session.user.id,
            },
          });
          await s3
            .putObject({
              Bucket: env.S3_BUCKETNAME,
              Body: Buffer.from(image, "base64"),
              Key: icon.id,
              ContentEncoding: "base64",
              ContentType: "image/gif",
            })
            .promise();
          return icon;
        })
      );
    }),
});
