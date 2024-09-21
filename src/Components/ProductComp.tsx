"use client";
import React from "react";
import Image from "next/image";
import styles from "@/app/styles.module.css";
import { useAppDispatch } from "@/store/hooks";
import { addToCart, removeCart } from "@/store/store";

const ProductComp = ({
  data: { id, title, price, discountPercentage, thumbnail, quantity },
}: {
  data: any;
}) => {
  const dispatch = useAppDispatch();
  return (
    <div
      className={`${styles.flexCol} justify-between items-center text-center  pb-8 px-8 gap-5 rounded-lg border border-white text-white shadow-xl shadow-blue-300/10`}
    >
      <Image
        priority={true}
        src={thumbnail}
        width={300}
        alt={title}
        height={300}
        className="w-fit h-40"
      />
      <h2 className="text-3xl">{title}</h2>
      <div className={`${styles.flexRow} text-xl gap-5`}>
        <span className="text-green-300 font-medium">${price}</span>
        <span className="text-cyan-300 font-medium">
          -{discountPercentage}%
        </span>
      </div>
      <div
        className={`${styles.flexRow} text-xl px-5 py-1 gap-5 border border-cyan-500 rounded-lg`}
      >
        <button onClick={() => dispatch(removeCart(id))}>-</button>
        <p>{quantity}</p>
        <button onClick={() => dispatch(addToCart(id))}>+</button>
      </div>
    </div>
  );
};

export default ProductComp;
