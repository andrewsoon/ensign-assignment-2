import { render, screen, fireEvent } from "@testing-library/react";
import ProductDetails from "../ProductDetails";
import { useCart } from "@/context/CartContext";
import { useProducts } from "@/context/ProductsContext";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock Next.js router
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: mockPush, back: jest.fn() }),
}));

// Mock hooks
jest.mock("../../../../context/CartContext.tsx");
jest.mock("../../../../context/ProductsContext");

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 10,
  description: "Test Description",
  category: "electronics",
  image: "/test.png",
  rating: { rate: 4.5, count: 100 },
};

describe("ProductDetails Page", () => {
  beforeEach(() => {
    (useCart as jest.Mock).mockReturnValue({
      totalQuantity: 0,
      addToCart: jest.fn(),
    });

    (useProducts as jest.Mock).mockReturnValue({
      products: [mockProduct],
      loading: false,
    });
  });

  it("renders product details", () => {
    render(<ProductDetails productId={1} />);
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("$10")).toBeInTheDocument();
    expect(screen.getByText(/⭐ 4.5 \/ 5/)).toBeInTheDocument();
  });

  it("shows loading state", () => {
    (useProducts as jest.Mock).mockReturnValue({ products: null, loading: true });
    render(<ProductDetails productId={1} />);
    expect(screen.getByText("Loading product...")).toBeInTheDocument();
  });

  it("shows product not found", () => {
    render(<ProductDetails productId={999} />);
    expect(screen.getByText("Product not found.")).toBeInTheDocument();
  });

  it("opens dialog on Add to Cart", () => {
    render(<ProductDetails productId={1} />);
    fireEvent.click(screen.getByText("Add to cart"));
    expect(screen.getByText(/Add 1x/)).toBeInTheDocument();
  });
});
