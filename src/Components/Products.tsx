"use client";
import { useProductStore } from "@/store/store";
import React, { useEffect } from "react";
import ProductComp from "./ProductComp";
import Loader from "@/utils/Loader";

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
    <div className="h-full flex-1 relative">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-fit pb-5 gap-x-10 gap-y-10 md:gap-y-16 md:px-5 lg:px-10">
        {loading ? (
          <Loader />
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
