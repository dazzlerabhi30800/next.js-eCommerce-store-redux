"use client";
import { useProductStore } from "@/store/store";
import React from "react";
import styles from "@/app/styles.module.css";
import { useRouter } from "next/navigation";

const page = () => {
  const router = useRouter();
  const state = useProductStore((state) => state);
  const { cart, productLoading, addToCart, removeFromCart, user } = state;
  return (
    <section className={`grid grid-cols-3 pb-10 gap-5`}>
      {cart
        .filter((item: any) => item.quantity > 0)
        .map((item) => (
          <div
            className={ `${styles.flexCol} items-center p-5 h-full gap-3 w-full bg-red-200 shadow-lg` }
            key={item.id}
          >
            <img
              src={item.thumbnail}
              className="w-28 h-28"
              alt={item.title}
            />
            <div className={`${styles.flexCol} items-center gap-3`}>
              <h2 className="text-lg">{item.title}</h2>
              <p>${item.quantity * item.price}</p>
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
    </section>
  );
};

export default page;
