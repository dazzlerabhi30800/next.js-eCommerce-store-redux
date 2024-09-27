import React from "react";

const page = ({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) => {
  return <section>{amount}</section>;
};

export default page;
