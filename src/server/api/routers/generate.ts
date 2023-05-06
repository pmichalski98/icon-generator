import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { Configuration, OpenAIApi } from "openai";
import { env } from "~/env.mjs";

const configuration = new Configuration({
  apiKey: env.DALLE_API_KEY as string,
});
const openai = new OpenAIApi(configuration);

async function generateIcon(prompt: string) {
  if (env.MOCK_DALLE === "true") {
    return "https://oaidalleapiprodscus.blob.core.windows.net/private/org-eGrIz0gGhpQCJArPvOaH4O5E/user-ab3VQ6wZ2Ew9Y314zkWvexzD/img-cKM4XmwIS8HWKWi600VhPuHu.png?st=2023-05-06T08%3A51%3A45Z&se=2023-05-06T10%3A51%3A45Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-05-06T00%3A37%3A46Z&ske=2023-05-07T00%3A37%3A46Z&sks=b&skv=2021-08-06&sig=e%2BgV8e8kyzLo2w/m%2BLScOymaqbAi%2B1DeE%2BBRApIE9rE%3D";
  } else {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    return response.data.data[0]?.url;
  }
}

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

      const generatedImage = await generateIcon(input.prompt);
      if (!generatedImage)
        throw new TRPCError({
          message: "Unable to generate image",
          code: "BAD_REQUEST",
        });

      return {
        generatedImage,
      };
    }),
});
