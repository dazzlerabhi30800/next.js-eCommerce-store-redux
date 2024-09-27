"use client";
import CheckoutPage from "@/Components/CheckoutPage";
import { useProductStore } from "@/store/store";
import { convertToSubcurrency, formatPrice } from "@/utils/FetchFuncs";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("next public key is undefined");
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const Page = () => {
  const cartAmount = useProductStore((state) => state.cart).reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  );
  const amount = cartAmount;
  return (
    <section>
      <h1 className="text-3xl bg-gradient-to-r from-pink-500 to-cyan-500 w-fit text-center text-white mx-auto p-4 mb-5">
        You have been asked to pay {formatPrice(amount)}
      </h1>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: convertToSubcurrency(amount),
          currency: "usd",
        }}
      >
        <CheckoutPage amount={amount} />
      </Elements>
    </section>
  );
};

export default Page;
