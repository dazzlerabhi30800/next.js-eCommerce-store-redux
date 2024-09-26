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
    <header className={`${styles.flexBetween} py-4`}>
      <h1 className="uppercase text-2xl md:text-3xl font-bold">da</h1>
      <ul
        className={`${styles.flexRow} gap-5 md:gap-10 text-sm md:text-lg font-medium`}
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
              className="bg-gradient-to-l from-blue-500 to-pink-500 text-lg py-2 px-4 rounded-lg font-bold text-white hover:brightness-125"
            >
              Logout {user.displayName}
            </button>
          </li>
        )}
      </ul>
    </header>
  );
};

export default Header;
