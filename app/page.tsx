"use client"

import { useProducts } from "@/context/ProductsContext";
import Link from "next/link";

export default function HomePage() {
  const { products } = useProducts()

  return (
    <main className="p-5 pb-20 w-full">
      <header className="my-12 flex flex-col items-center justify-center">
        <h1 className="text-7xl font-bold text-zinc-800">Products</h1>
        <p className="text-2xl text-zinc-600 mt-2">Browse our selection of products</p>
      </header>
      <section>
        {products === null ? (
          <div className="text-zinc-600 text-center py-10">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="text-zinc-600 text-center py-10">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => {
              const { id, title, image, price, rating } = product;
              return (
                <Link key={id} href={`/products/${id}`} className="group">
                  <div
                    className="
                    bg-white
                    rounded-xl
                    shadow-sm
                    hover:shadow-lg
                    hover:scale-105
                    transition-transform transition-shadow duration-300 ease-in-out
                    cursor-pointer
                    flex flex-col items-center 
                    p-8
                    h-full
                  "
                  >
                    <div className="w-full h-48 flex items-center justify-center mb-4">
                      <img
                        src={image}
                        alt={title}
                        className="max-h-full max-w-full w-8/12 object-contain"
                      />
                    </div>
                    <div className="text-center flex flex-col justify-between items-center gap-2">
                      <h3 className="text-xl text-zinc-800 font-semibold line-clamp-2">{title}</h3>
                      <p className="text-zinc-800 text-lg font-medium">${price}</p>
                      <div className="flex flex-row items-end justify-center gap-1">
                        <p className="text-base text-zinc-600">⭐ {rating.rate}</p>
                        <span className="text-sm text-zinc-600">({rating.count})</span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
