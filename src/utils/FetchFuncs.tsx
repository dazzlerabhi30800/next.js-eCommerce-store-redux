export const fetchCategory = async () => {
  const data = await fetch("https://dummyjson.com/products/categories");
  const response = await data.json();
  return response;
}
