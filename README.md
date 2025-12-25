# 🛒 EnsignRetail – Shopping Cart Application

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

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open http://localhost:3000

## ✨ Possible Improvements

- Implement automated tests for cart functionality (e.g., quantity updates, total price calculation)
- Add a complete checkout flow with order confirmation
- Improve accessibility (ARIA roles, keyboard navigation)
- Add subtle animations for cart interactions to enhance UX
- Introduce user authentication for personalized carts and order history

---
