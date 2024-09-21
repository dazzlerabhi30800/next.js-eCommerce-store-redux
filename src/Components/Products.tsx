"use client";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchProducts } from "@/store/store";
import ProductComp from "./ProductComp";

const Products = () => {
  const dispatch = useAppDispatch();
  const [show, setShow] = useState<boolean>(false);
  const state = useAppSelector((state) => state.todoReducer);
  const { products, loading } = state;
  useEffect(() => {
    setShow(true);
  }, []);
  useEffect(() => {
    if (!show || typeof window === "undefined") return;
    dispatch(fetchProducts());
  }, [show]);
  return (
    <section className="grid grid-cols-3 gap-x-10 gap-y-16 my-10 px-10">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        products.map((product) => (
          <ProductComp key={product.id} data={product} />
        ))
      )}
    </section>
  );
};

export default Products;
