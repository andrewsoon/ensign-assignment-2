import { act, fireEvent, render, screen } from "@testing-library/react";
import HomePage from "../page";
import { ProductsContext } from "@/context/ProductsContext";

jest.useFakeTimers();

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

const mockProducts = [
  { id: 1, title: "Apple iPhone", price: 999, image: "/img1.png", description: "Smartphone", category: "electronics", rating: { rate: 4.5, count: 100 } },
  { id: 2, title: "Banana Phone", price: 199, image: "/img2.png", description: "Funny phone", category: "electronics", rating: { rate: 4.2, count: 50 } },
  { id: 3, title: "T-shirt", price: 20, image: "/img3.png", description: "Cotton t-shirt", category: "fashion", rating: { rate: 4, count: 20 } },
];

describe("HomePage", () => {
  it("renders products from context", () => {
    render(
      <ProductsContext.Provider value={{ products: mockProducts, categories: ["a", "b"], loading: false, error: null }}>
        <HomePage />
      </ProductsContext.Provider>
    );

    expect(screen.getByText("Apple iPhone")).toBeInTheDocument();
    expect(screen.getByText("Banana Phone")).toBeInTheDocument();
    expect(screen.getByText("T-shirt")).toBeInTheDocument();
  });

  it("shows loading state when products are null", () => {
    render(
      <ProductsContext.Provider value={{ products: null, categories: [], loading: true, error: null }}>
        <HomePage />
      </ProductsContext.Provider>
    );
    expect(screen.getByText("Loading products...")).toBeInTheDocument();
  });

  it("shows empty state when products array is empty", () => {
    render(
      <ProductsContext.Provider value={{ products: [], categories: [], loading: false, error: null }}>
        <HomePage />
      </ProductsContext.Provider>
    );
    expect(screen.getByText("No products found.")).toBeInTheDocument();
  });
});

describe("HomePage filtering and search", () => {
  const renderWithContext = (products = mockProducts) =>
    render(
      <ProductsContext.Provider value={{ products, categories: ["electronics", "fashion"], loading: false, error: null }}>
        <HomePage />
      </ProductsContext.Provider>
    );

  it("filters products by category", () => {
    renderWithContext();

    // Select "fashion" category
    const categorySelect = screen.getByDisplayValue("ALL CATEGORIES"); // initial value
    fireEvent.change(categorySelect, { target: { value: "fashion" } });

    // Only T-shirt should appear
    expect(screen.getByText("T-shirt")).toBeInTheDocument();
    expect(screen.queryByText("Apple iPhone")).not.toBeInTheDocument();
    expect(screen.queryByText("Banana Phone")).not.toBeInTheDocument();
  });

  it("searches products by title or description", () => {
    renderWithContext();

    // Simulate entering search input
    const searchInput = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(searchInput, { target: { value: "banana" } });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    // Only Banana Phone should appear
    expect(screen.getByText("Banana Phone")).toBeInTheDocument();
    expect(screen.queryByText("Apple iPhone")).not.toBeInTheDocument();
    expect(screen.queryByText("T-shirt")).not.toBeInTheDocument();
  });
});
