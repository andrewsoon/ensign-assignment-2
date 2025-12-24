"use client"

import Button from "@/components/Button"
import Dialog from "@/components/Dialog"
import QuantityControl from "@/components/QuantityControl"
import { useCart } from "@/context/CartContext"
import { useProducts } from "@/context/ProductsContext"
import Image from "next/image"
import { useRouter } from "next/navigation"
import React, { useCallback } from "react"

interface ProductDetailsProps {
  productId: number
}

export default function ProductDetails({ productId }: ProductDetailsProps) {
  const { products, loading } = useProducts()
  const { cart, addToCart } = useCart()
  const [quantity, setQuantity] = React.useState<number>(1)
  const [openDialog, setOpenDialog] = React.useState<boolean>(false)
  const router = useRouter()

  const product = React.useMemo(() => {
    const product = products?.find((p) => p.id === productId)
    return product
  }, [products, productId])

  const handleAddToCart = useCallback(() => {
    if (!product) return
    addToCart(product, quantity)
    setOpenDialog(false)
  }, [addToCart, product, quantity])

  const handleIncrease = useCallback(() => {
    setQuantity((prev) => prev + 1)
  }, [setQuantity])

  const handleDecrease = useCallback(() => {
    setQuantity((prev) => {
      if (prev > 1) {
        prev--
      }
      return prev
    })
  }, [setQuantity])

  const cartQuantity = React.useMemo(() => {
    return cart.find((item) => item.id === productId)?.quantity ?? 0
  }, [cart, productId])

  if (loading) return <div className="text-zinc-600 text-center py-10">Loading product...</div>;
  if (!product) return <div className="text-zinc-600 text-center py-10">Product not found.</div>;

  return (
    <main className="p-5 w-full">
      <section className="
      flex flex-col md:flex-row items-center gap-12 
      p-10
      w-full
      justify-center
      ">
        <Image width={400} height={400} src={product.image} alt={`${product.title}-image`} className="w-5/12 md:w-4/12 h-auto object-contain" />
        <div className="flex flex-col gap-6 md:w-5/12">
          <p className="text-5xl">{product.title}</p>
          <p className="text-zinc-600 text-xl">{product.description}</p>
          <p className="text-3xl font-semibold">${product.price}</p>
          <div className="text-lg text-zinc-600">
            <p>⭐ {product.rating.rate} / 5</p>
            <p>{product.rating.count} sold!</p>
          </div>
          <QuantityControl
            handleIncrease={handleIncrease}
            handleDecrease={handleDecrease}
            quantity={quantity}
          />
          <Button label="Add to cart" onClick={() => setOpenDialog(true)} />
          <Button label={`View Cart (${cartQuantity})`} variant="outlined" onClick={() => router.push("/cart")} />
          <Dialog title="Confirmation" open={openDialog} onClose={() => setOpenDialog(false)} onSubmit={handleAddToCart}>
            <p className="text-lg">Add {quantity}x<span className="font-semibold">&quot;{product.title}&ldquo; </span>to cart?</p>
          </Dialog>
        </div>
      </section>
    </main>
  );
}