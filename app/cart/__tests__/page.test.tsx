import { CartContext } from "@/context/CartContext";
import { act, fireEvent, render, screen, within } from "@testing-library/react";
import Cart from "../page";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => <img {...props} />,
}));

// Mock next/navigation
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
}));

const mockCart = [
  {
    id: 1,
    title: "Test Product 1",
    price: 10,
    image: "/test.png",
    description: "Test description",
    category: "electronics",
    rating: { rate: 4.5, count: 100 },
    quantity: 2,
  },
  {
    id: 2,
    title: "Test Product 2",
    price: 20,
    image: "/test.png",
    description: "Another description",
    category: "fashion",
    rating: { rate: 4.2, count: 50 },
    quantity: 1,
  },
];

describe("Cart Page", () => {
  let removeFromCart: jest.Mock;

  beforeEach(() => {
    removeFromCart = jest.fn();

    render(
      <CartContext.Provider
        value={{
          cart: mockCart,
          totalQuantity: 3,
          totalPrice: 40,
          addToCart: jest.fn(),
          removeFromCart,
          updateQuantity: jest.fn(),
        }}
      >
        <Cart />
      </CartContext.Provider>
    );
  });

  it("renders cart items", () => {
    expect(screen.getByText("Test Product 1")).toBeInTheDocument();
    expect(screen.getByText("Test Product 2")).toBeInTheDocument();
  });

  it("removes an item when confirmed in dialog", async () => {
    const productTitle = "Test Product 1";

    // Click the remove button for the first product
    const removeButton = screen.getByRole("button", { name: `Remove ${productTitle}` });
    act(() => fireEvent.click(removeButton));

    // Wait for the dialog to appear
    const dialog = await screen.findByRole("dialog", { name: `Confirm remove "${productTitle}"` });

    // Click the confirm button inside the dialog
    const confirmButton = within(dialog).getByRole("button", { name: /confirm/i });
    act(() => fireEvent.click(confirmButton));

    // Ensure removeFromCart was called with the correct id
    expect(removeFromCart).toHaveBeenCalledWith(1);
  });
});
