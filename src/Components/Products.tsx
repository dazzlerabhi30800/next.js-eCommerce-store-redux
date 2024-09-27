"use client";
import { useProductStore } from "@/store/store";
import React, { useEffect } from "react";
import ProductComp from "./ProductComp";
import Loader from "@/utils/Loader";

const Products = () => {
  const loading = useProductStore((state) => state.loading);
  const products = useProductStore((state) => state.products);
  const setProducts = useProductStore((state) => state.setProducts);

  useEffect(() => {
    setProducts();
  }, []);
  return (
    <div className="h-full flex-1 relative">
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 h-fit pb-10 md:pb-16 gap-10 md:gap-y-16 md:px-5 lg:px-10">
        {loading ? (
          <Loader />
        ) : (
          products?.map((product, index: number) => (
            <ProductComp key={product?.id} data={product} index={index} />
          ))
        )}
      </section>
    </div>
  );
};

export default Products;
