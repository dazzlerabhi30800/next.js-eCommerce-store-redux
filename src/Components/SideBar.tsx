"use client";
import { useEffect } from "react";
import { category, useProductStore } from "@/store/store";
import React from "react";

const SideBar = () => {
  const state = useProductStore((state) => state);
  const { categories, setCategories, showSidebar, fetchNewProducts } = state;
  useEffect(() => {
    setCategories();
  }, []);
  return (
    <aside
      className={`${
        showSidebar ? "translate-x-0" : "-translate-x-[1000px]"
      } absolute top-0 left-0 flex flex-col overflow-y-auto bg-pink-200 h-screen w-[30%] min-w-[150px] max-w-[300px] shadow-xl transitionL`}
    >
      {categories?.map((category: category, index: number) => (
        <button
          onClick={() => fetchNewProducts(category.slug)}
          className="py-4 px-6 text-black transitionL hover:bg-black hover:text-white"
          key={index}
        >
          {category.name}
        </button>
      ))}
    </aside>
  );
};

export default SideBar;
