# 🛒 Assignment 2 – Shopping Cart (React)

EnsignRetail is a modern shopping cart application built with **React / Next.js**, powered by the **Fake Store API**.  
This project was completed as part of a frontend assignment and demonstrates routing, state management, persistence, and UI design.

---

## 📌 Features

### 🏠 Main Page

- Displays a list of products fetched from the Fake Store API
- Supports:
  - 🔍 Search
  - 🗂️ Category filtering
  - 🔃 Sorting
- Clicking a product navigates to the **Product Detail Page**

---

### 📄 Product Detail Page

- Displays detailed product information
- Allows users to:
  - Select quantity
  - Add products to cart
- Cart quantity updates immediately
- Includes navigation back to the previous page

---

### 🛍️ Cart Page

- Lists all products added to the cart
- Allows:
  - Quantity updates
  - Removal of products
- Displays:
  - Item-level subtotal
  - Total quantity
  - Total amount payable
- Includes an **Order Summary** section aggregating all totals

---

## 💾 Persistence

- Cart data is persisted using **localStorage**
- Cart state is restored when the browser is closed and reopened

---

## ⚙️ Technical Details

- **Framework**: React / Next.js (App Router)
- **State Management**:
  - React Context API
  - Chosen for simplicity and suitability for a small-to-medium scale application
- **Styling**: Tailwind CSS
- **Data Source**:
  - [https://fakestoreapi.com](https://fakestoreapi.com)

---

## 🎨 UI & Assets

- Responsive UI optimized for desktop and mobile screens
- Icons and SVGs are sourced from:
  👉 **https://heroicons.com/**

---

## 🧪 Testing

- **HomePage**
  - Renders products from context
  - Shows loading and empty states
  - Filters products by category
  - Searches products by title or description
- **Product Detail Page**
  - Renders product details (title, description, price, rating, quantity)
  - Handles adding items to cart via a confirmation dialog
  - Updates cart icon with total quantity
- **Cart Page**
  - Renders items in the cart with quantity and subtotal
  - Updates quantities using the QuantityControl component
  - Removes items after confirming in the remove-item dialog
  - Displays order summary and total price
- `next/router` is mocked for navigation during tests

---

## ✨ Possible Improvements

- Add end-to-end tests simulating full user flows (search → add to cart → remove → checkout)
- Improve accessibility (ARIA roles, keyboard navigation)
- Test responsive layouts and mobile views
- Add subtle animations for cart interactions to enhance UX
- Introduce user authentication for personalized carts and order history
- Implement a complete checkout flow with order confirmation

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open http://localhost:3000

---
