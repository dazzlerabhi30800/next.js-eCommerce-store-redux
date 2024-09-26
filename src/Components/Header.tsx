"use client";
import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "@/app/styles.module.css";
import { RiShoppingCartLine } from "react-icons/ri";
import { useProductStore } from "@/store/store";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/utils/FirebaseConfig";
import { BiCart } from "react-icons/bi";

const Header = () => {
  const path = usePathname();
  const cart = useProductStore((state) => state.cart).filter(
    (item) => item.quantity > 0,
  );
  const setUser = useProductStore((state) => state.setUser);
  const user = useProductStore((state) => state.user);
  const emptyCart = useProductStore((state) => state.emptyCart);
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        emptyCart();
      }
    });
    return () => unSub();
  }, []);
  return (
    <header className={`${styles.flexBetween} flex-wrap py-4`}>
      <h1
        className={`${styles.flexRow} gap-1 uppercase text-lg md:text-2xl font-bold from-pink-500 to-purple-500`}
      >
        <BiCart className="text-fuchsia-600 text-3xl lg:text-4xl" />{" "}
        <span className="bg-clip-text text-transparent hidden sm:block bg-gradient-to-r from-pink-500 to-purple-500">
          Shopee
        </span>
      </h1>
      <ul
        className={`${styles.flexRow} gap-3 md:gap-10 text-black text-sm md:text-lg font-medium`}
      >
        <li>
          <Link
            className={`${
              path === "/" && "text-purple-500 italic"
            } hover:text-purple-600`}
            href="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`${
              path === "/cart" && "text-purple-500 italic"
            } hover:text-purple-500 relative text-2xl`}
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
        {!user && (
          <li>
            <Link
              className={`${
                path === "/login" && "text-purple-500 italic"
              } hover:text-purple-600`}
              href="/login"
            >
              Login
            </Link>
          </li>
        )}
        {user && (
          <li>
            <button
              onClick={() => signOut(auth)}
              className={`${styles.flexRow} gap-2 bg-gradient-to-l from-blue-500 to-pink-500 text-sm md:text-lg p-2 md:px-4 rounded-lg font-bold text-white hover:brightness-125`}
            >
              Logout <span className="hidden md:block">{user.displayName}</span>
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
