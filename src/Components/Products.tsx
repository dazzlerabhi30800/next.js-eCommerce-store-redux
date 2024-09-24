"use client";
import { useProductStore } from "@/store/store";
import React, { useEffect } from "react";
import ProductComp from "./ProductComp";

const Products = () => {
  const loading = useProductStore((state) => state.loading);
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);
  const cart = useProductStore((state) => state.cart);
  const setProductAmount = useProductStore((state) => state.setProductAmount);

  useEffect(() => {
    setProducts();
  }, []);
  useEffect(() => {
    setProductAmount();
  }, [cart]);
  return (
    <div className="h-full flex-1">
      <section className="grid grid-cols-3 h-fit pb-5 gap-x-10 gap-y-16 px-10">
        {loading ? (
          <h1 className="text-xl text-red-500 mx-auto font-bold">Loading...</h1>
        ) : (
          products?.map((product) => (
            <ProductComp key={product?.id} data={product} />
          ))
        )}
        {/* <button>Get Data</button> */}
      </section>
    </div>
  );
};

export default Products;
