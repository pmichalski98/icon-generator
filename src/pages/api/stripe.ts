import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { env } from "~/env.mjs";
import { buffer } from "micro";
import { prisma } from "~/server/db";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});
export const config = {
  api: {
    bodyParser: false,
  },
};
const webhook = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const buff = await buffer(req);
    const sig = req.headers["stripe-signature"] as string;

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        buff,
        sig,
        env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      let errMessage = "Unknown error";
      if (err instanceof Error) errMessage = err.message;
      res.status(400).send(`Webhook Error: ${errMessage}`);
      return;
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const checkoutSessionCompleted = event.data.object as {
          id: string;
          metadata: {
            userId: string;
          };
        };
        await prisma.user.update({
          where: { id: checkoutSessionCompleted.metadata.userId },
          data: {
            credits: {
              increment: 100,
            },
          },
        });
        // Then define and call a function to handle the event checkout.session.completed
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.send("ok");
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};
export default webhook;
