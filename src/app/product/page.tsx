"use client";

import { getProduct } from "@/services/product";
import Image from "next/image";
import Loading from "./loading";
import useSWR from "swr";

export default function Product() {
  const {
    data: products = [],
    error,
    isLoading,
  } = useSWR("http://localhost:3000/api/products", getProduct);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <main>
          <section className="px-2">
            <div className="container mx-auto">
              <h1 className="text-xl font-bold my-5">Product Page</h1>
              {products.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3">
                  {products.map((product: any) => (
                    <div
                      key={product.id}
                      className="rounded-md overflow-hidden border p-2"
                    >
                      <Image
                        src={product.image}
                        alt=""
                        className="mb-2 w-full object-cover object-center"
                        width={800}
                        height={500}
                        loading="lazy"
                      />
                      <h2 className="font-mediun mb-2">{product.name}</h2>
                      <div className="flex justify-between items-center gap-3">
                        <h3 className="font-bold text-xl">$ {product.price}</h3>
                        <button className="px-3 py-2 text-white bg-blue-600 rounded-md">
                          Add to Card
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
      )}
    </>
  );
}
