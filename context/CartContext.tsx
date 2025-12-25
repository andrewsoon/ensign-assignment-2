"use client";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { Product, useProducts } from "./ProductsContext";

interface LocalCartItem {
  id: number;
  quantity: number;
}

interface CartItem extends Product {
  quantity: number;
}

type CartContextType = {
  cart: CartItem[];
  totalPrice: number;
  totalQuantity: number;
  addToCart: (productId: number, quantity?: number) => void;
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
  const [localCart, setLocalCart] = useState<LocalCartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const { products } = useProducts()

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(localCart));
  }, [localCart]);

  const addToCart = (productId: number, quantity?: number) => {
    setLocalCart((prev) => {
      const existing = prev.find((item) => item.id === productId);
      if (existing) {
        return prev.map((item) =>
          item.id === productId ? { id: productId, quantity: item.quantity + (quantity ?? 1) } : item
        );
      }
      return [...prev, { id: productId, quantity: (quantity ?? 1) }];
    });
  };

  const removeFromCart = (productId: number) => {
    setLocalCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    setLocalCart((prev) =>
      prev.map((item) => (item.id === productId ? { ...item, quantity } : item))
    );
  };

  const cart = useMemo(() => {
    if (!localCart || !products) return [];

    return localCart
      .map(item => {
        const product = products.find(p => p.id === item.id);
        if (!product) return null; // skip if product no longer exists
        return { ...product, quantity: item.quantity };
      })
      .filter(Boolean) as (Product & { quantity: number })[];
  }, [localCart, products]);


  const { totalPrice, totalQuantity } = useMemo(() => {
    if (cart === null) {
      return {
        totalPrice: 0,
        totalQuantity: 0,
      }
    }

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
