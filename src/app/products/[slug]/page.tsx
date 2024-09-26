"use client";
import { useProductStore } from "@/store/store";
import React, { useEffect } from "react";
import Loader from "@/utils/Loader";
import ProductComp from "@/Components/ProductComp";
import { useParams } from "next/navigation";

const ProductCategoryPage = () => {
  const { slug } = useParams();
  const loading = useProductStore((state) => state.loading);
  const products = useProductStore((state) => state.products);
  const fetchNewProducts = useProductStore((state) => state.fetchNewProducts);

  useEffect(() => {
    if (!slug) return;
    fetchNewProducts(slug.toString());
  }, []);
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
      </section>
    </div>
  );
};

export default ProductCategoryPage;
