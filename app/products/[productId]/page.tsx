import { use } from "react";
import ProductDetails from "./ProductDetails";

type Props = {
  params: Promise<{
    productId: string;
  }>;
};

export default function ProductDetailPage({ params }: Props) {

  const { productId } = use(params)

  return <ProductDetails productId={Number(productId)} />;
}
