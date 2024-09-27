import {
  fetchProductDetail,
  formatDate,
  formatPrice,
} from "@/utils/FetchFuncs";
import Image from "next/image";
import React from "react";
import styles from "@/app/styles.module.css";
import Rating from "@mui/material/Rating";

interface review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

const ProductDetailPage = async ({
  params,
}: {
  params: {
    id: number;
  };
}) => {
  const productDetails = await fetchProductDetail(params.id);
  const {
    title,
    thumbnail,
    description,
    price,
    discountPercentage,
    rating,
    warrantyInformation,
    shippingInformation,
    availabilityStatus,
    returnPolicy,
    reviews,
  } = productDetails;

  return (
    <section className="flex flex-col gap-20 pb-10">
      <div className={`flex flex-col md:flex-row items-center gap-20`}>
        <div className="md:basis-[35%]">
          <Image
            src={thumbnail}
            alt={title}
            width={300}
            height={300}
            className="w-full min-w-[350px] h-[350px] md:h-[480px] lg:h-[550px]"
            priority={true}
          />
        </div>
        <div className={`${styles.flexCol} md:flex-1 gap-7`}>
          <h1 className="text-[1.5rem] md:text-[2rem] lg:text-[3rem]">
            {title}
          </h1>
          <p className="text-[1rem] md:text-[1.5rem]">{description}</p>
          <div className={`${styles.flexRow} gap-8`}>
            <h2 className="text-[1.5rem] md:text-[2rem]  font-bold">
              {formatPrice(price)}
            </h2>
            <p className="text-red-500 md:text-lg bg-red-200 font-medium py-1 px-4 rounded-xl">
              -{discountPercentage}%
            </p>
          </div>
          <div className={`${styles.flexRow} gap-3`}>
            <Rating name="read-only" value={rating} precision={0.1} readOnly />
            <p className="text-xl font-bold">{rating}</p>
          </div>
          <div
            className={`${styles.flexRow} flex-wrap gap-5 font-semibold md:gap-7 [&>p]:bg-gray-200 [&>p]:rounded-lg [&>p]:py-2 [&>p]:px-4 [&>p]:text-gray-700 text-sm`}
          >
            <p>{warrantyInformation}</p>
            <p>{shippingInformation}</p>
            <p>{availabilityStatus}</p>
          </div>
          <p className="font-bold text-lg underline">{returnPolicy}</p>
        </div>
      </div>
      <div className={`${styles.flexCol} gap-10`}>
        {reviews?.map((review: review, index: number) => (
          <div
            key={index}
            className="flex flex-col gap-5 bg-gray-200/70 rounded-md shadow-lg p-3 sm:p-4 md:p-5"
          >
            <div className={`${styles.flexRow} justify-between`}>
              <h3 className="text-lg md:text-xl">{review.reviewerName}</h3>
              <p className="text-sm md:text-base font-medium">
                {formatDate(review.date)}
              </p>
            </div>
            <div className={`${styles.flexRow} gap-2`}>
              <Rating
                name="read-only"
                value={review.rating}
                precision={0.1}
                readOnly
              />
              <p className="text-lg text-gray-600 font-medium">
                {review.rating.toFixed(1)}
              </p>
            </div>
            <p className="sm:text-lg italic">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductDetailPage;
