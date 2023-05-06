import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

import Stripe from "stripe";
import { env } from "~/env.mjs";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});
export const checkoutRouter = createTRPCRouter({
  checkout: protectedProcedure.mutation(async ({ ctx }) => {
    return stripe.checkout.sessions.create({
      success_url: env.HOST_NAME,
      mode: "payment",
      metadata: {
        userId: ctx.session.user.id,
      },
      payment_method_types: ["card", "blik"],
      line_items: [{ price: env.PRODUCT_PRICE_ID, quantity: 1 }],
    });
  }),
});
