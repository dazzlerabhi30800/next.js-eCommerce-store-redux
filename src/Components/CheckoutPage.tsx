"use client";
import React, { useState, useEffect } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { convertToSubcurrency } from "@/utils/FetchFuncs";
import Loader from "@/utils/Loader";

interface checkoutProps {
  amount: number;
}

const CheckoutPage = ({ amount }: checkoutProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<any | undefined>("");
  const [clientSecret, setClientSecret] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      setLoading(false);
      return;
    }
    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError?.message);
      setLoading(false);
      return;
    }
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
      },
    });
    if (error) {
      setErrorMessage(error.message);
    } else {
    }
  };

  if (!clientSecret || !stripe || !elements) return <Loader />;
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-violet-200 p-3 shadow-lg rounded-md"
    >
      {clientSecret && <PaymentElement />}
      {errorMessage && <div>{errorMessage}</div>}
      <button
        disabled={!stripe || loading}
        className="p-4 w-full bg-black text-white text-xl mt-5 rounded-md font-bold hover:bg-indigo-800"
      >
        {!loading ? "Pay" : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
