import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import useAuth from "@/store/useAuth";
import useCart from "@/store/useCart";
import Badge from "@mui/material/Badge";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { user } = useAuth();
  const { cart, getCount, makeCartNull } = useCart();
  const navigate = useNavigate();
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
  const subtotal = (): number => {
    let total = 0;
    cart.map((item) => {
      total += item.price;
    });
    return total;
  };
  const total = subtotal() + shipping() - discount();
  const [data, setData] = useState({
    firstName: user ? user.firstName : "",
    lastName: user ? user.lastName : "",
    phoneNumber: user ? user.phoneNumber : "",
    email: user ? user.email : "",
    address: "",
    city: "",
    country: "Pakistan",
    status: "Pending",
    postalCode: "",
    amount: total,
    dateTime: new Date().toISOString(),
  });
  const uniqueBookIds = [...new Set(cart.map((book) => book.book_ID))];
  const uniqueBooks = uniqueBookIds.map((bookId) => {
    return cart.find((item) => item.book_ID === bookId);
  });
  const orderItems = uniqueBooks.map((book) => ({
    order_ID: 0,
    book_ID: book.book_ID,
    quantity: getCount(book.book_ID),
  }));
  const requestDto = {
    addOrder: data,
    addOrderItems: orderItems,
  };
  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/checkout", requestDto);
      if (response.status === 200) {
        toast.success("Order placed successfully!");
        const orderId = response.data.$values[0].order_ID;
        navigate(`/order/${orderId}`, { replace: true });
        makeCartNull();
      }
    } catch (error) {
      toast.error("Error in placing order!");
    }
  };
  return (
    <>
      <Navbar />
      {cart.length != 0 ? (
        <main className="container mx-auto my-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr] select-none">
          <div>
            <h1 className="text-3xl font-bold mb-6">Checkout</h1>
            <form className="space-y-6" onSubmit={placeOrder}>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={user ? user.firstName : ""}
                    placeholder="Enter your first name"
                    required
                    onChange={(e) =>
                      setData({ ...data, firstName: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={user ? user.lastName : ""}
                    placeholder="Enter your last name"
                    required
                    onChange={(e) =>
                      setData({ ...data, lastName: e.target.value })
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={user ? user.phoneNumber : ""}
                  placeholder="Enter your phone number"
                  required
                  onChange={(e) =>
                    setData({ ...data, phoneNumber: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={user ? user.email : ""}
                  placeholder="Enter your email address"
                  required
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea
                  id="address"
                  rows={3}
                  placeholder="Enter your delivery address"
                  className="resize-none"
                  required
                  onChange={(e) =>
                    setData({ ...data, address: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    placeholder="Enter your city"
                    required
                    onChange={(e) => setData({ ...data, city: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="country">Country</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pk">Pakistan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input
                  id="postalCode"
                  placeholder="Enter your postal code"
                  required
                  onChange={(e) =>
                    setData({ ...data, postalCode: e.target.value })
                  }
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Place Order</Button>
              </div>
            </form>
          </div>
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h2 className="mb-4 text-xl font-bold">Order Summary</h2>
            <div className="space-y-4">
              {uniqueBooks.map((book) => {
                return (
                  <div
                    className="flex items-center gap-4 rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800"
                    key={book.book_ID}
                  >
                    <Badge
                      badgeContent={getCount(book.book_ID)}
                      color="primary"
                    >
                      <img
                        src={book.url}
                        alt={book.name}
                        className="rounded-md"
                        height={60}
                        style={{
                          aspectRatio: "60/60",
                          objectFit: "cover",
                        }}
                        width={60}
                      />
                    </Badge>
                    <div className="flex-1">
                      <h3 className="text-md font-medium">{book.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-lg font-medium">
                        Rs.{" "}
                        {book.price *
                          (1 - book.discount / 100) *
                          getCount(book.book_ID)}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <Separator className="my-4" />
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
                <span className="text-lg font-bold">Rs. {total}</span>
              </div>
            </div>
            <Separator className="my-4" />
            <RadioGroup>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Cash on Delivery" id="COD" checked />
                <Label htmlFor="COD">Cash on Delivery</Label>
              </div>
            </RadioGroup>
          </div>
        </main>
      ) : (
        <div className="m-8 select-none container mx-auto">
          <h1 className="mb-4 text-2xl font-bold">Checkout</h1>
          <p>Please add books to your cart!</p>
        </div>
      )}
    </>
  );
};

export default Checkout;
