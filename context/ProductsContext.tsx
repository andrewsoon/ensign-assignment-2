// context/ProductsContext.tsx
"use client";

import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  }
};

type ProductsContextType = {
  products: Product[] | null;
  categories: string[]
  loading: boolean;
  error: string | null;
};

export const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export const useProducts = () => {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used within ProductsProvider");
  return ctx;
};

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch("https://fakestoreapi.com/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        setProducts([]); // fallback to empty array
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  const categories = useMemo(() => {
    if (!products) return []

    const uniqueCategories = new Set<string>()
    products.forEach((item) => uniqueCategories.add(item.category))

    return Array.from(uniqueCategories)
  }, [products])

  return (
    <ProductsContext.Provider value={{ products, categories, loading, error }}>
      {children}
    </ProductsContext.Provider>
  );
}
