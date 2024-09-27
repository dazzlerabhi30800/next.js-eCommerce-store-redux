"use client";
import CheckoutPage from "@/Components/CheckoutPage";
import { convertToSubcurrency } from "@/utils/FetchFuncs";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("next public key is undefined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const Page = () => {
  const amount = 50;
  return (
    <section>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount), // amount;
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </section>
  );
};

export default Page;
