"use client"

import SearchBar from "@/components/Searchbar";
import { useProducts } from "@/context/ProductsContext";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function HomePage() {
  const { products, categories } = useProducts()
  const [searchInput, setSearchInput] = useState<string>("")
  const [category, setCategory] = useState<string>('all')
  const [sort, setSort] = useState<string>('price')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')
  const debouncedSearch = useDebouncedValue(searchInput, 300)

  const filteredProducts = useMemo(() => {
    if (!products) return null

    const query = debouncedSearch.trim().toLowerCase()
    if (query) {
      return products.filter((item) => {
        const searchableFields = [item.title, item.description, item.category]
        return searchableFields.some((field) =>
          field.toLowerCase().includes(query)
        )
      })
    }

    if (category !== "all") {
      return products.filter((item) => item.category.toLowerCase() === category.toLowerCase())
    }

    return products
  }, [products, debouncedSearch, category])

  const sortedProducts = useMemo(() => {
    if (!filteredProducts) return null

    if (sort === 'name') {
      return filteredProducts.sort((a, b) => sortDir === "asc"
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title))
    }

    if (sort === 'rating') {
      return filteredProducts.sort((a, b) => sortDir === "asc"
        ? a.rating.rate - b.rating.rate
        : b.rating.rate - a.rating.rate)
    }

    if (sort === 'price') {
      return filteredProducts.sort((a, b) => sortDir === "asc"
        ? a.price - b.price
        : b.price - a.price)
    }

    return filteredProducts
  }, [filteredProducts, sort, sortDir])

  return (
    <main className="p-5 pb-20 w-full">
      <header className="my-6 md:my-12 flex flex-col items-center justify-center">
        <h1 className="text-2xl sm:text-4xl md:text-7xl font-bold text-zinc-800">Products</h1>
        <p className="text-base sm:text-lg md:text-2xl text-zinc-600 mt-2">Browse our selection of products</p>
      </header>
      <section>
        <div className="p-3 
          flex flex-col-reverse 
          md:flex-row 
          flex-wrap-reverse 
          items-end 
          justify-between 
          gap-4
          ">
          <div className="
            flex md:flex-row 
            flex-wrap 
            justify-start items-start md:justify-end md:items-center 
            gap-2 sm:gap-4 md:gap-6
          ">
            {/* Sort */}
            <div className="flex flex-row items-center gap-2">
              <div className="flex flex-row items-center">
                <p className="text-xs md:text-base">Sort by:&nbsp;</p>
                <div className="
                  flex flex-row items-center 
                  rounded-full
                  ring-1
                  ring-zinc-300
                  py-1
                  px-2
                ">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="
                      cursor-pointer
                      text-xs md:text-base 
                      text-zinc-900
                      focus:outline-none
                      "
                  >
                    {['name', 'rating', 'price'].map((cat) => (
                      <option key={cat} value={cat}>
                        {cat.toUpperCase()}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={() =>
                  setSortDir((prev) => (prev === "asc" ? "desc" : "asc"))
                }
                className="rounded-full flex items-center gap-2 rounded-full py-2 px-2 text-sm cursor-pointer ring-1
                  ring-zinc-300
                  focus:outline-none"
              >
                <span className="text-zinc-700 hover:text-zinc-600">
                  {sortDir === "asc"
                    ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-3 md:size-5">
                      <path fillRule="evenodd" d="M10 18a.75.75 0 0 1-.75-.75V4.66L7.3 6.76a.75.75 0 0 1-1.1-1.02l3.25-3.5a.75.75 0 0 1 1.1 0l3.25 3.5a.75.75 0 1 1-1.1 1.02l-1.95-2.1v12.59A.75.75 0 0 1 10 18Z" clipRule="evenodd" />
                    </svg>
                    : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-3 md:size-5">
                      <path fillRule="evenodd" d="M10 2a.75.75 0 0 1 .75.75v12.59l1.95-2.1a.75.75 0 1 1 1.1 1.02l-3.25 3.5a.75.75 0 0 1-1.1 0l-3.25-3.5a.75.75 0 1 1 1.1-1.02l1.95 2.1V2.75A.75.75 0 0 1 10 2Z" clipRule="evenodd" />
                    </svg>
                  }
                </span>
              </button>
            </div>


            {/* Filter */}
            <div className="flex flex-row items-center">
              <p className="text-xs md:text-base">Filter by:&nbsp;</p>
              <div className="
                  flex flex-row items-center 
                  rounded-full
                  ring-1
                  ring-zinc-300
                  py-1
                  px-2
                ">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="
                    cursor-pointer
                    text-xs md:text-base 
                    text-zinc-900
                    focus:outline-none
                    "
                >
                  <option key="all" value="all">ALL CATEGORIES</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <SearchBar placeholder="Search products .." value={searchInput} onChange={(value) => setSearchInput(value)} />
        </div>
        {sortedProducts === null ? (
          <div className="text-zinc-600 text-center py-10">Loading products...</div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-zinc-600 text-center py-10">No products found.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-6">
            {sortedProducts.map((product) => {
              const { id, title, image, price, rating } = product;
              return (
                <Link key={id} href={`/products/${id}`} className="group">
                  <div
                    className="
                    bg-white
                    rounded-xl
                    shadow-sm
                    hover:shadow-lg
                    hover:scale-101
                    transition-transform transition-shadow duration-300 ease-in-out
                    cursor-pointer
                    flex flex-col items-center 
                    p-2 px-4 sm:p-4 sm:px-6 md:p-6 md:px-8 lg:p-8 
                  "
                  >
                    <div className="w-full h-24 md:h-48 flex items-center justify-center mb-4">
                      <Image
                        width={400}
                        height={400}
                        src={image}
                        alt={title}
                        className="max-h-full max-w-full w-8/12 object-contain"
                      />
                    </div>
                    <div className="text-center flex flex-col justify-between items-center gap-1 md:gap-2">
                      <p className="text-sm sm:text-lg md:text-xl text-zinc-800 font-semibold line-clamp-1">{title}</p>
                      <p className="text-zinc-800 text-xs md:text-lg font-medium">${price}</p>
                      <div className="hidden md:flex md:flex-row md:items-center md:justify-center md:gap-1">
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
    </main >
  );
}
