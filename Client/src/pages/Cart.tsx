import Navbar from "@/components/Navbar";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import React from "react";
import { PlusIcon, MinusIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import axios from "axios";
import toast from "react-hot-toast";
import useCart from "@/store/useCart";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, addToCart, removeFromCart, getCount, removeAll } = useCart();
  const addBookToCart = (book) => {
    getCount(book.book_ID) + 1 <= book.quantity
      ? addToCart(book, 1)
      : toast.error(
          book.quantity - getCount(book.book_ID) === 0
            ? "The book is out of stock!"
            : `Only ${book.quantity - getCount(book.book_ID)} left in stock!`
        );
  };
  const subtotal = (): number => {
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });
    return total;
  };
  const discount = (): number => {
    let total = 0;
    cart.map((item) => {
      total += (item.discount * item.price) / 100;
    });
    return total;
  };
  const shipping = (): number => {
    return subtotal() <= 2500 ? 250 : 0;
  };
  return (
    <>
      <Navbar />
      <main className="container mx-auto my-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr] select-none">
        <div>
          <h1 className="mb-4 text-2xl font-bold">Your Cart</h1>
          {cart.length === 0 ? (
            <p>Your Cart is Empty!</p>
          ) : (
            <div className="space-y-4">
              {[...new Set(cart.map((book) => book.book_ID))].map((bookId) => {
                const book = cart.find((item) => item.book_ID === bookId);
                return (
                  <div
                    className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                    key={book.book_ID}
                  >
                    <img
                      src={book.url}
                      alt={book.name}
                      className="rounded-md"
                      height={80}
                      style={{
                        aspectRatio: "80/80",
                        objectFit: "cover",
                      }}
                      width={80}
                    />
                    <div className="flex-1">
                      <h3 className="text-md font-medium">{book.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => removeFromCart(book.book_ID)}
                      >
                        <MinusIcon className="h-4 w-4" />
                      </Button>
                      <span className="text-lg font-medium">
                        {getCount(book.book_ID)}
                      </span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => addBookToCart(book)}
                      >
                        <PlusIcon className="h-4 w-4" />
                      </Button>
                      <div className="text-lg font-medium">
                        Rs.{" "}
                        {book.price *
                          (1 - book.discount / 100) *
                          getCount(book.book_ID)}
                      </div>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => removeAll(book.book_ID)}
                      >
                        <XIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {cart.length === 0 ? (
          ""
        ) : (
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-medium">Rs. {subtotal()}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Discount</span>
                <span className="font-medium text-green-500">
                  -Rs. {discount()}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span className="font-medium">Rs. {shipping()}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">Total</span>
                <span className="text-lg font-bold">
                  Rs. {subtotal() + shipping() - discount()}
                </span>
              </div>
            </div>
            <Separator className="my-4" />
            <RadioGroup>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Cash on Delivery" id="COD" checked />
                <Label htmlFor="COD">Cash on Delivery</Label>
              </div>
            </RadioGroup>
            <Button
              className="mt-6 w-full"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </Button>
          </div>
        )}
      </main>
    </>
  );
};

export default Cart;

const XIcon = (props) => {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
};
