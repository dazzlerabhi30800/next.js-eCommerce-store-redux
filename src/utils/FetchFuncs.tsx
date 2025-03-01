export const fetchCategory = async () => {
  const data = await fetch("https://dummyjson.com/products/categories");
  const response = await data.json();
  return response;
};

export const formatPrice = (price: number) => {
  const format = new Intl.NumberFormat("en-US", {
    maximumSignificantDigits: 3,
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
  return format;
};

export const formatPriceWithDecimals = (price: number) => {
  if (!price) return;
  let parts = price.toString().split(".");
  let intPart = parts[0];
  let decPart = parts.length > 1 ? parts[1].slice(0, 2) : "";

  intPart = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  decPart = decPart.padEnd(2, "0");

  return "$" + intPart + "." + decPart;
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
