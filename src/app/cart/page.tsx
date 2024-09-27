"use client";
import { useProductStore } from "@/store/store";
import React from "react";
import styles from "@/app/styles.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";

const page = () => {
  const router = useRouter();
  const state = useProductStore((state) => state);
  const { cart, productLoading, addToCart, removeFromCart, user } = state;
  if (cart.length < 1)
    return (
      <h1 className="absolute top-20 -translate-x-1/2 left-1/2 text-xl md:text-4xl">
        Your cart is empty !!
      </h1>
    );
  return (
    <section className={`${styles.flexCol} gap-20`}>
      <div className={`grid grid-cols-3 pb-10 gap-5 relative`}>
        {cart
          .filter((item: any) => item.quantity > 0)
          .map((item) => (
            <div
              className={`${styles.flexCol} items-center p-5 h-full gap-3 w-full bg-red-200 shadow-lg`}
              key={item.id}
            >
              <img
                src={item.thumbnail}
                className="w-28 h-28"
                alt={item.title}
              />
              <div className={`${styles.flexCol} items-center gap-3`}>
                <h2 className="text-lg">{item.title}</h2>
                <p>${(item.quantity * item.price).toFixed(2)}</p>
                <div
                  className={`${styles.flexRow} w-fit ${
                    productLoading && "opacity-50 scale-75"
                  } text-xl px-5 py-1 gap-5 border border-cyan-500 rounded-lg transitionL`}
                >
                  <button
                    disabled={productLoading}
                    className="disabled:cursor-not-allowed disabled:text-gray-500"
                    onClick={() => {
                      if (!user) {
                        router.push("/login");
                      } else {
                        removeFromCart(item.id);
                      }
                    }}
                  >
                    -
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    disabled={productLoading}
                    className="disabled:cursor-not-allowed disabled:text-gray-500"
                    onClick={() => {
                      if (!user) {
                        router.push("/login");
                      } else {
                        addToCart(item.id);
                      }
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
      </div>
      {cart.length > 1 && (
        <Link
          href="/checkout"
          className="py-3 px-10 text-2xl w-fit mx-auto bg-black text-white hover:brightness-70 hover:bg-gray-300 hover:text-black shadow-md"
        >
          Checkout
        </Link>
      )}
    </section>
  );
};

export default page;
