"use client";
import { useEffect } from "react";
import { category, useProductStore } from "@/store/store";
import React from "react";
import { useParams, useRouter } from "next/navigation";

const SideBar = () => {
  const router = useRouter();
  const { slug } = useParams();
  const state = useProductStore((state) => state);
  const { categories, setCategories, showSidebar } = state;
  useEffect(() => {
    setCategories();
  }, []);
  return (
    <aside
      className={`${
        showSidebar ? "translate-x-0 z-30" : "-translate-x-[1000px]"
      } absolute top-0 left-0 flex flex-col overflow-y-auto bg-pink-100 h-screen w-[70%] min-w-[150px] md:max-w-[300px] shadow-xl transitionL`}
    >
      <h3 className="text-xl font-bold py-4 px-6 text-center underline">
        Categories
      </h3>
      {categories?.map((category: category, index: number) => (
        <button
          onClick={() => router.push(`/products/${category.slug}`)}
          className={`${slug === category.slug && "bg-black text-white"} py-4 px-6 text-black text-sm sm:text-base transitionL hover:bg-black hover:text-white`}
          key={index}
        >
          {category.name}
        </button>
      ))}
    </aside>
  );
};

export default SideBar;
