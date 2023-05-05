import { createTRPCRouter } from "~/server/api/trpc";
import { generateRouter } from "~/server/api/routers/generate";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  generate: generateRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
