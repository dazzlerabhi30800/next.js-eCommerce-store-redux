"use client";
import { useProductStore } from "@/store/store";
import React, { useEffect } from "react";

const Provider = ({ children }: { children: React.ReactNode }) => {
  const { setProducts } = useProductStore((state) => state);
  useEffect(() => {
    setProducts();
  }, []);
  return <div>{children}</div>;
};

export default Provider;
