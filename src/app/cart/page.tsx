"use client";
import { useProductStore } from "@/store/store";
import React from "react";
import styles from "@/app/styles.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";

const CartPage = () => {
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
      <div
        className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-10 gap-5 relative`}
      >
        {cart
          .filter((item) => item.quantity > 0)
          .map((item, index: number) => (
            <motion.div
              initial={{ opacity: 0, y: -200 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                ease: "linear",
                type: "spring",
                stiffness: 100,
              }}
              className={`${styles.flexCol} items-center p-5 h-full gap-3 w-full bg-pink-100 shadow-lg`}
              key={item.id}
            >
              <Image
                priority={true}
                src={item.thumbnail}
                width={300}
                alt={item.title}
                height={300}
                className="w-fit h-28 md:h-40 object-cover"
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
            </motion.div>
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

export default CartPage;
