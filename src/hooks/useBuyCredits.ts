import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";
import { env } from "~/env.mjs";
import { api } from "~/utils/api";

const stripePromise = loadStripe(env.NEXT_PUBLIC_STRIPE_KEY);
export function useBuyCredits() {
  const { mutateAsync } = api.checkout.checkout.useMutation({});

  return {
    buyCredits: async () => {
      const response = await mutateAsync();
      const stripe = await stripePromise;
      await stripe?.redirectToCheckout({
        sessionId: response.id,
      });
    },
  };
}
