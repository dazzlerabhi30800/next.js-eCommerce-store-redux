export const fetchCategory = async () => {
  const data = await fetch("https://dummyjson.com/products/categories");
  const response = await data.json();
  return response;
};

export const formatPrice = (price: number) => {
  const format = new Intl.NumberFormat("en-IN", {
    maximumSignificantDigits: 3,
    style: "currency",
    currency: "USD",
  }).format(price);
  return format;
};

export const fetchProductDetail = async (id: number) => {
  if (!id) return;
  const data = await fetch(`https://dummyjson.com/products/${id}`);
  const response = await data.json();
  return response;
};

export const formatDate = (date: string) => {
  const formattedDate = new Date(date);
  const date1 = formattedDate.getDate();
  const month = formattedDate.getMonth() + 1;
  const year = formattedDate.getFullYear();
  return `${date1}/${month}/${year}`;
};

export const convertToSubcurrency = (amount: number, factor = 100) => {
  return Math.round(amount * factor);
};
