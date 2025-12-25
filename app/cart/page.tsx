"use client"
import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Dialog from "@/components/Dialog";
import QuantityControl from "@/components/QuantityControl";
import { useCart } from "@/context/CartContext";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const metadata: Metadata = {
  title: "Cart",
}

export default function Cart() {
  const router = useRouter()
  const { cart, totalPrice, totalQuantity, updateQuantity, removeFromCart } = useCart()
  const [openDialog, setOpenDialog] = useState(false)

  const handleCheckout = () => {
    alert("Checked out cart!")
  }

  return (
    <main className="p-5 max-w-7xl w-full mx-auto">
      <BackButton />
      <h1 className="text-lg sm:text-2xl md:text-4xl font-bold mb-4 sm:mb-6 md:mb-8 text-left">Shopping Cart</h1>
      <div className="flex flex-col lg:flex-row gap-2 sm:gap-6">
        <div className="w-full lg:w-7/12 flex flex-col gap-4 lg:gap-6">
          {cart.length === 0
            ? <div className="flex flex-col py-20 gap-4">
              <p className="text-xl text-zinc-600">
                Your cart is empty.
              </p>
              <Button className="w-5/12 " label="View Products" variant="contained" onClick={() => router.push("/")} />
            </div>
            :
            cart.map((item) => (
              <div
                key={item.id}
                className="
                  relative 
                  flex flex-col md:flex-row items-center 
                  gap-2 sm:gap-6 
                  bg-zinc-50 
                  p-6 md:px-10 md:py-4 
                  rounded-lg 
                  shadow-sm
                ">
                <Link href={`/products/${item.id}`}>
                  <Image
                    width={100}
                    height={100}
                    src={item.image}
                    alt={item.title}
                    className="h-auto w-16 sm:w-24 md:w-32 lg:w-full object-contain rounded"
                  />
                </Link>

                <div className="w-full flex-1 flex flex-col gap-1 sm:gap-2">
                  <p className="text-base md:text-2xl font-semibold line-clamp-2">{item.title}</p>
                  <p className="text-sm md:text-lg text-gray-800 font-medium">${item.price}</p>
                  <div className="flex flex-row justify-between items-center">

                    <div className="flex flex-row flex-wrap items-center gap-1 sm:gap-2">
                      <p className="text-sm md:text-base font-semibold">Quantity</p>
                      <QuantityControl
                        handleDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                        handleIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                        quantity={item.quantity}
                      />
                    </div>
                    <p className="text-base font-semibold">Subtotal: ${(item.quantity * item.price).toFixed(2)}</p>
                  </div>
                </div>

                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setOpenDialog(true)}
                    className="text-zinc-600 hover:text-zinc-500 mt-2 md:mt-0 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                  </button>
                  <Dialog
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    title="Remove Item"
                    onSubmit={() => {
                      removeFromCart(item.id)
                      setOpenDialog(false)
                    }}
                  >
                    <div>
                      <p className="text-lg">Confirm remove <span className="font-semibold">&quot;{item.title}&ldquo;</span> from cart?</p>
                    </div>
                  </Dialog>
                </div>
              </div>
            ))}
        </div>
        <div className="
          w-full lg:w-5/12 min:min-w-100 
          flex flex-col
          gap-4
        ">
          <div
            className="
            w-full bg-zinc-50 flex flex-col
            gap-4  p-6 md:px-10 md:py-4 
            rounded-lg 
            shadow-sm
          ">
            <p className="text-zinc-800 text-2xl font-semibold">Order Summary | {totalQuantity} Item(s)</p>
            <div className="p-2">
              {cart.map((item) => {
                return (
                  <div key={item.id} className="flex flex-row items-center justify-between gap-6">
                    <p className="line-clamp-1">{item.quantity}x {item.title}</p>
                    <p>${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                )
              })}
            </div>
            <p className="text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </p>
          </div>
          <Button label="Checkout" onClick={handleCheckout} disabled={cart.length === 0} className="w-full" />
        </div>
      </div>
    </main>
  );
}
