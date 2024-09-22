import React from "react";
import styles from "@/app/styles.module.css";
import Image from "next/image";
import { useProductStore } from "@/store/store";

const ProductComp = ({
  data: { id, title, price, discountPercentage, thumbnail, quantity },
}) => {
  const addToCart = useProductStore((state) => state.addToCart);
  return (
    <div
      className={`${styles.flexCol} justify-between items-center text-center pb-8 px-8 gap-5 rounded-lg border border-gray-600 shadow-xl shadow-gray-500/40`}
    >
      <Image
        priority={true}
        src={thumbnail}
        width={300}
        alt={title}
        height={300}
        className="w-fit h-40 object-cover"
      />
      <h2 className="text-3xl">{title}</h2>
      <div className={`${styles.flexRow} text-xl gap-5`}>
        <span className="text-green-500 font-medium">${price}</span>
        <span className="text-green-500 font-medium">
          -{discountPercentage}%
        </span>
      </div>
      <div
        className={`${styles.flexRow} text-xl px-5 py-1 gap-5 border border-cyan-500 rounded-lg`}
      >
        <button>-</button>
        <p>{quantity}</p>
        <button onClick={() => addToCart(id)}>+</button>
      </div>
    </div>
  );
};

export default ProductComp;
