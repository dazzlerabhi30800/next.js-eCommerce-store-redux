export const fetchCategory = async () => {
  const data = await fetch("https://dummyjson.com/products/categories");
  const response = await data.json();
  return response;
};

export const formatPrice = (price: number) => {
  const format = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
    style: "currency",
    currency: "INR",
  }).format(price);
  return format;
};
