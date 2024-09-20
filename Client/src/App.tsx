import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Landing from "./pages/Landing";
import React from "react";
import Books from "./pages/Books";
import BookDetails from "./pages/BookDetails";
import Category from "./pages/Category";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Toaster } from "react-hot-toast";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderDetails from "./pages/OrderDetails";
import Discount from "./pages/Discount";
import NotFound from "./pages/NotFound";
axios.defaults.baseURL = "https://localhost:7213/api";

const App = () => {
  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/books" element={<Books />} />
        <Route path="/books/:id" element={<BookDetails />} />
        <Route path="/books/category/:category" element={<Category />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order/:id" element={<OrderDetails />} />
        <Route path="/books/discount" element={<Discount />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
