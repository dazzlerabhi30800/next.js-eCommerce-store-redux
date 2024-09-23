"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import styles from "@/app/styles.module.css";

const Header = () => {
  const path = usePathname();
  return (
    <header className={`${styles.flexBetween} p-4`}>
      <h1 className="uppercase text-3xl font-bold">da</h1>
      <ul className={`${styles.flexRow} gap-10 font-medium`}>
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
            } hover:text-green-600`}
            href="/cart"
          >
            Cart
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
