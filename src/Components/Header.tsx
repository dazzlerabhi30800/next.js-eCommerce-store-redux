"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "@/app/styles.module.css";
import { RiShoppingCartLine } from "react-icons/ri";
import { useProductStore } from "@/store/store";

const Header = () => {
  const path = usePathname();
  const cart = useProductStore((state) => state.cart).filter(
    (item) => item.quantity > 0
  );
  return (
    <header className={`${styles.flexBetween} py-4`}>
      <h1 className="uppercase text-2xl md:text-3xl font-bold">da</h1>
      <ul className={`${styles.flexRow} gap-5 md:gap-10 text-sm md:text-lg font-medium`}>
        <li>
          <Link
            className={`${
              path === "/" && "text-green-500 italic"
            } hover:text-green-600`}
            href="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`${
              path === "/cart" && "text-green-500 italic"
            } hover:text-green-600 relative text-2xl`}
            href="/cart"
          >
            <RiShoppingCartLine />
            {cart.length > 0 && (
              <span className="absolute flex items-center justify-center -right-2 -top-1  text-[10px] bg-purple-300 font-medium h-1 w-1 rounded-[50%] p-2">
                {cart.length}
              </span>
            )}
          </Link>
        </li>
        <li>
          <Link
            className={`${
              path === "/login" && "text-green-500 italic"
            } hover:text-green-600`}
            href="/login"
          >
            Login
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
