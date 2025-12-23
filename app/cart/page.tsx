"use client"
import CTA from "@/components/Button";
import QuantityControl from "@/components/QuantityControl";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import React from "react";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart()

  const totalPrice = React.useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);

  const handleCheckout = () => {
    return
  }

  return (
    <main className="p-10 max-w-6xl w-8/12 mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center">Shopping Cart</h1>

      <div className="flex flex-col gap-6">
        {cart.length === 0
          ? <div className="text-center py-20 text-zinc-600">
            Your cart is empty.
          </div>
          :
          <React.Fragment>
            {
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col md:flex-row items-center gap-6 bg-zinc-50 p-4 rounded-lg shadow-sm"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    className="w-full md:w-32 h-32 object-contain rounded"
                  />

                  <div className="flex-1 flex flex-col gap-2">
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-gray-800 font-medium">${item.price}</p>

                    <QuantityControl
                      handleDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                      handleIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                      quantity={item.quantity}
                    />
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-600 hover:underline mt-2 md:mt-0 cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ))}
            <div className="text-right mt-8 text-xl font-bold">
              Total: ${totalPrice.toFixed(2)}
            </div>
          </React.Fragment>
        }
        <CTA label="Checkout" onClick={handleCheckout} disabled={cart.length === 0} />
      </div>
    </main>
  );
}
