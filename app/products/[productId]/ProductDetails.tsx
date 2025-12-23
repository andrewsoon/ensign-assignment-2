"use client"

import CTA from "@/components/CTA"
import { useCart } from "@/context/CartContext"
import { useProducts } from "@/context/ProductsContext"
import React, { useCallback } from "react"

interface ProductDetailsProps {
  productId: number
}

export default function ProductDetails({ productId }: ProductDetailsProps) {
  const { products, loading } = useProducts()
  const { addToCart } = useCart()

  const product = React.useMemo(() => {
    const product = products?.find((p) => p.id === productId)
    return product
  }, [products, productId])

  if (loading) return <div className="text-zinc-600 text-center py-10">Loading product...</div>;
  if (!product) return <div className="text-zinc-600 text-center py-10">Product not found.</div>;

  const handleAddToCart = useCallback(() => {
    if (!product) return
    addToCart(product)
  }, [product])

  return (
    <main className="p-5 w-full">
      <section className="
      flex flex-col md:flex-row items-center gap-12 
      p-10
      w-full
      ">
        <img src={product.image} alt={`${product.title}-image`} className="w-full md:w-7/12 object-contain" />
        <div className="flex flex-col gap-6 md:w-5/12">
          <p className="text-5xl">{product.title}</p>
          <p className="text-zinc-600 text-xl">{product.description}</p>
          <p className="text-3xl font-semibold">${product.price}</p>
          <div className="text-lg text-zinc-600">
            <p>⭐ {product.rating.rate} / 5</p>
            <p>{product.rating.count} sold!</p>
          </div>
          <CTA label="Add to cart" onClick={handleAddToCart} />
        </div>
      </section>
    </main>
  );
}