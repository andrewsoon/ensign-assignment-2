import { Metadata } from "next";
import { use } from "react";
import ProductDetails from "./ProductDetails";

type Props = {
  params: Promise<{
    productId: string;
  }>;
};

export const metadata: Metadata = {
  title: "Product Details",
}

export default function ProductDetailPage({ params }: Props) {

  const { productId } = use(params)

  return <ProductDetails productId={Number(productId)} />;
}
