import React from "react";
import styles from "@/app/styles.module.css";
import Image from "next/image";
import { useProductStore } from "@/store/store";
import { useRouter } from "next/navigation";

const ProductComp = ({
  data: { id, title, price, discountPercentage, thumbnail, quantity },
}: {
  data: any;
}) => {
  const addToCart = useProductStore((state) => state.addToCart);
  const router = useRouter();
  const productLoading = useProductStore((state) => state.productLoading);
  const user = useProductStore((state) => state.user);
  const removeFromCart = useProductStore((state) => state.removeFromCart);
  const setProductAmount = useProductStore((state) => state.setProductAmount);

  const formatPrice = (price: number) => {
    const format = new Intl.NumberFormat("en-IN", {
      maximumSignificantDigits: 3,
      style: "currency",
      currency: "INR",
    }).format(price);
    return format;
  };

  return (
    <div
      className={`${styles.flexCol} justify-between items-center text-center pt-3 pb-8 md:pt-0 px-8 gap-8 rounded-lg border border-gray-600 shadow-xl shadow-gray-500/40`}
    >
      <Image
        priority={true}
        src={thumbnail}
        width={300}
        alt={title}
        height={300}
        className="w-fit h-28 md:h-40 object-cover"
      />
      <h2 className="text-xl md:text-2xl">{title}</h2>
      <div className={`${styles.flexRow} text-xl gap-5`}>
        <span className={`${styles.flexRow} gap-2 text-purple-500 font-bold`}>
          {formatPrice(price * 83.7)}
        </span>
        <span className="bg-black rounded-xl text-white text-sm py-1 px-3 font-medium">
          -{discountPercentage}%
        </span>
      </div>
      <div
        className={`${styles.flexRow} ${
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
              removeFromCart(id);
              setProductAmount();
            }
          }}
        >
          -
        </button>
        <p>{quantity}</p>
        <button
          disabled={productLoading}
          className="disabled:cursor-not-allowed disabled:text-gray-500"
          onClick={() => {
            if (!user) {
              router.push("/login");
            } else {
              addToCart(id);
              setProductAmount();
            }
          }}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default ProductComp;
