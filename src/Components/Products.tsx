"use client";
import { useProductStore } from "@/store/store";
import React, { useEffect } from "react";
import ProductComp from "./ProductComp";

const Products = () => {
  const loading = useProductStore((state) => state.loading);
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);
  const setTodo = useProductStore((state) => state.setTodo);
  const todo = useProductStore((state) => state.todo);
  useEffect(() => {
    console.log(products);
    setProducts();
  }, []);
  return (
    <section className="grid grid-cols-3 gap-x-10 gap-y-16 my-10 px-10">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        products.map((product) => (
          <ProductComp key={product?.id} data={product} />
        ))
      )}
      <button
        className="bg-red-800 uppercase text-3xl p-4 text-white"
        onClick={() => setTodo("hello this a changed Todo")}
      >
        {todo}
      </button>
    </section>
  );
};

export default Products;
