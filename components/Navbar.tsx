"use client"

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function Navbar() {
  const { totalPrice, totalQuantity } = useCart()
  return (
    <nav className="sticky top-0 z-40 border-b border-zinc-200 bg-zinc-50/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand */}
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-900 hover:text-zinc-700"
        >
          EnsignRetail
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <p>${totalPrice.toFixed(2)}</p>
          <Link
            href="/cart"
            className="relative rounded-md text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900"
            aria-label="View cart"
          >
            <div className="relative p-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-xs text-white">
                {totalQuantity}
              </span>
            </div>
          </Link>
        </div>
      </div >
    </nav >

  );
}
