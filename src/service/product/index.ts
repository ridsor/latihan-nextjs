import axios from "axios";

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const getProduct = async (): Promise<Product[]> => {
  let data = [];
  try {
    const res = await axios.get("http://localhost:3000/api/products");
    data = res.data.data;
  } catch (e) {
    console.error(e);
  }
  return data;
};
