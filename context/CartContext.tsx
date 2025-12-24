"use client";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { Product } from "./ProductsContext";

interface CartItem extends Product {
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, quantity?: number) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + (quantity ?? 1) } : item
        );
      }
      return [...prev, { ...product, quantity: (quantity ?? 1) }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };


  const { totalPrice, totalQuantity } = useMemo(() => {
    return cart.reduce(
      (acc, item) => {
        acc.totalPrice += item.price * item.quantity
        acc.totalQuantity += item.quantity
        return acc
      },
      { totalPrice: 0, totalQuantity: 0 }
    )
  }, [cart])

  return (
    <CartContext.Provider value={{ cart, totalPrice, totalQuantity, addToCart, removeFromCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}
