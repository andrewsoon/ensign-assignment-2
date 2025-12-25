import Navbar from "@/components/Navbar";
import { CartProvider } from "@/context/CartContext";
import { ProductsProvider } from "@/context/ProductsContext";
import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import React from "react";
import "./globals.css";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "EnsignRetail",
  description: "Retail store built from fakeapi",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body
        className={`${openSans.variable} antialiased bg-zinc-100 text-zinc-900`}
      >
        <ProductsProvider>
          <CartProvider>
            <Navbar />
            <main
              className="mx-auto flex max-w-7xl items-center justify-between"
            >
              {children}
            </main>
          </CartProvider>
        </ProductsProvider>
      </body>
    </html>
  );
}
