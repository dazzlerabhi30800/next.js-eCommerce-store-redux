"use client";
import { useProductStore } from "@/store/store";
import React from "react";
import styles from "@/app/styles.module.css";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { formatPrice } from "@/utils/FetchFuncs";
import { AiOutlineClose } from "react-icons/ai";

const CartPage = () => {
  const router = useRouter();
  const { cart, productLoading, addToCart, removeFromCart, user, removeItem } =
    useProductStore((state) => state);
  const cartPrice = cart.reduce((acc: number, item: any) => {
    return acc + item.quantity * item.price;
  }, 0);
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
              <button
                onClick={() => removeItem(item.id)}
                className="text-xl self-end hover:text-gray-600"
              >
                <AiOutlineClose />
              </button>
              <Link href={`/product/${item.id}`}>
                <Image
                  priority={true}
                  src={item.thumbnail}
                  width={300}
                  alt={item.title}
                  height={300}
                  className="w-fit h-28 md:h-40 object-cover"
                />
              </Link>
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
      {/* NOTE: Summary */}
      <div
        className={`${styles.flexCol} gap-5 md:text-xl bg-teal-200/70 p-5 w-[300px] md:w-[400px] mx-auto rounded-xl shadow-xl text-black`}
      >
        <h4 className="text-xl md:text-3xl">Summary</h4>
        <div className={`${styles.flexRow} justify-between`}>
          <p>Total Items </p>
          <p className="font-semibold">
            {cart.filter((item) => item.quantity > 0).length}
          </p>
        </div>
        <div className={`${styles.flexRow} justify-between`}>
          <p>Total Price </p>
          <p className="font-semibold">{formatPrice(cartPrice)}</p>
        </div>
      </div>
      {cart.length >= 1 && (
        <Link
          href="/checkout"
          className="py-3 px-10 mb-10 rounded-md text-2xl w-fit mx-auto bg-black text-white hover:brightness-70 hover:bg-gray-300 hover:text-black shadow-md"
        >
          Checkout
        </Link>
      )}
    </section>
  );
};

export default CartPage;
