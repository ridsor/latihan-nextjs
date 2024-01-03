interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export const getProduct = async (url: string): Promise<Product[]> => {
  let data = [];
  const res = await fetch(url, {
    next: { revalidate: 3600 },
  });
  const json = await res.json();
  data = json.data;

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return data;
};
