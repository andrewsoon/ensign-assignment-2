"use client"

import BackButton from "@/components/BackButton"
import Button from "@/components/Button"
import Dialog from "@/components/Dialog"
import QuantityControl from "@/components/QuantityControl"
import { useCart } from "@/context/CartContext"
import { useProducts } from "@/context/ProductsContext"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useCallback, useMemo, useState } from "react"

interface ProductDetailsProps {
  productId: number
}

export default function ProductDetails({ productId }: ProductDetailsProps) {
  const { products, loading } = useProducts()
  const { totalQuantity, addToCart } = useCart()
  const [quantity, setQuantity] = useState<number>(1)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const router = useRouter()

  const product = useMemo(() => {
    const product = products?.find((p) => p.id === productId)
    return product
  }, [products, productId])

  const handleAddToCart = useCallback(() => {
    if (!product) return
    addToCart(product.id, quantity)
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

  if (loading) return (
    <main className="p-5 w-full">
      <BackButton />
      <section className="
      flex flex-col items-center justify-center
      p-2 md:p-10
      w-full
      ">
        <div className="text-zinc-600 text-center py-10">Loading product...</div>
      </section>
    </main>
  )
  if (!product) return (
    <main className="p-5 w-full">
      <BackButton />
      <section className="
      flex flex-col items-center justify-center
      p-2 md:p-10
      w-full
      ">
        <div className="text-zinc-600 text-center py-10">Product not found.</div>
      </section>
    </main>
  )

  return (
    <main className="p-5 w-full">
      <BackButton />
      <section className="
      flex flex-col md:flex-row items-center gap-4 md:gap-8 lg:gap-12 
      p-2 md:p-10
      w-full
      justify-center
      ">
        <Image
          width={400}
          height={400}
          src={product.image}
          alt={`${product.title}-image`}
          className="w-5/12 md:w-5/12 lg:w-4/12 h-auto object-contain"
        />
        <div className="flex flex-col gap-2 md:gap-3 lg:gap-4 md:gap-6 md:w-7/12 lg:w-8/12">
          <p className="text-2xl sm:text-3xl lg:text-5xl">{product.title}</p>
          <p className="text-zinc-600 text-sm md:text-base lg:text-lg">{product.description}</p>
          <div className="flex flex-row items-center gap-4">
            <p className="text-xl md:text-2xl lg:text-3xl font-semibold">${product.price}</p>
            <p className="text-sm md:text-lg text-zinc-600">⭐ {product.rating.rate} / 5 <span className="text-sm">({product.rating.count} sold)</span></p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p>Quantity</p>
            <QuantityControl
              handleIncrease={handleIncrease}
              handleDecrease={handleDecrease}
              quantity={quantity}
            />
          </div>
          <Button label="Add to cart" onClick={() => setOpenDialog(true)} />
          <Button label={`View Cart (${totalQuantity})`} variant="outlined" onClick={() => router.push("/cart")} />
          <Dialog title="Confirmation" open={openDialog} onClose={() => setOpenDialog(false)} onSubmit={handleAddToCart}>
            <p className="text-lg">Add {quantity}x<span className="font-semibold">&quot;{product.title}&ldquo; </span>to cart?</p>
          </Dialog>
        </div>
      </section>
    </main>
  );
}