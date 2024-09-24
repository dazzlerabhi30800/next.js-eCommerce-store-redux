"use client";
import { useProductStore } from "@/store/store";
import React from "react";
import { RiMenu3Line, RiCloseLargeFill } from "react-icons/ri";

const MenuBtn = () => {
  const state = useProductStore((state) => state);
  const { showSidebar, setSidebar } = state;
  return (
    <button
      onClick={setSidebar}
      className="text-2xl flex w-full justify-end text-black my-4"
    >
      {showSidebar ? <RiCloseLargeFill /> : <RiMenu3Line />}
    </button>
  );
};

export default MenuBtn;
