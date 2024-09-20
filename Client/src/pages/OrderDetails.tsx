import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import Navbar from "@/components/Navbar";

const OrderDetails = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState<any>({});
  const [bookData, setBookData] = useState<any>({});
  const [itemsData, setItemsData] = useState([]);
  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await axios.get(`/order/${id}`);
        if (response.status === 200) {
          setOrderData(response.data.order);
          const items = response.data.items.$values;
          setItemsData(items);
          try {
            const ids = items.map((item) => item.book_ID).join(", ");
            const res = await axios.get(`/ordered-books/${ids}`);
            if (res.status === 200) {
              setBookData(res.data.$values);
            }
          } catch (err) {
            console.error(err);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    getOrder();
  }, [id]);
  return (
    <>
      <Navbar />
      <div className="flex flex-col">
        <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-gray-100/40 px-6 dark:bg-gray-800/40">
          <a className="lg:hidden" href="#">
            <Package2Icon className="h-6 w-6" />
            <span className="sr-only">Home</span>
          </a>
          <div className="flex-1">
            <h1 className="font-semibold text-lg">
              Order # {orderData.order_ID}
            </h1>
          </div>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-6">
              <div className="grid gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        orderData.status === "Pending"
                          ? " bg-black text-white"
                          : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                      }`}
                    >
                      <TruckIcon className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-medium">Pending</div>
                  </div>
                  <div className="h-[1px] flex-1 bg-gray-200 dark:bg-gray-700" />
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        orderData.status === "Shipped"
                          ? " bg-black text-white"
                          : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                      }`}
                    >
                      <TruckIcon className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Shipped
                    </div>
                  </div>
                  <div className="h-[1px] flex-1 bg-gray-200 dark:bg-gray-700" />
                  <div className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        orderData.status === "Delivered"
                          ? " bg-black text-white"
                          : "bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400"
                      }`}
                    >
                      <TruckIcon className="h-4 w-4" />
                    </div>
                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      Delivered
                    </div>
                  </div>
                </div>
                {orderData && orderData.dateTime && (
                  <div>Order placed on {orderData.dateTime.split("T")[0]}</div>
                )}
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Books</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="max-w-[150px]">Name</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {itemsData.map((item, index) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <div className="flex items-center gap-4">
                              <img
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src={bookData[index] && bookData[index].url}
                                width="64"
                              />
                              <div className="font-medium">
                                {bookData[index] && bookData[index].name}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>
                            {bookData[index] &&
                              bookData[index].price *
                                (1 - bookData[index].discount / 100)}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
            <div className="flex flex-col gap-6">
              <Card>
                <div>
                  <CardHeader>
                    <CardTitle>Shipping address</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div>
                      {orderData.address}
                      <br />
                      {orderData.city}, {orderData.country}
                    </div>
                  </CardContent>
                </div>
              </Card>
              <Card>
                <div>
                  <CardHeader>
                    <CardTitle>User Details</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm">
                    <div>
                      {orderData.firstName} {orderData.lastName}
                      <br />
                      {orderData.email}
                      <br />
                      {orderData.phoneNumber}
                    </div>
                  </CardContent>
                </div>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Payment</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="flex items-center">
                    <div>Payment Method</div>
                    <div className="ml-auto">
                      <b>Cash on delivery</b>
                    </div>
                  </div>
                  <Separator />
                  <div className="flex items-center font-medium">
                    <div>Total</div>
                    <div className="ml-auto">{orderData.amount}</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default OrderDetails;

function Package2Icon(props) {
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
      <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
      <path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9" />
      <path d="M12 3v6" />
    </svg>
  );
}

function TruckIcon(props) {
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
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}
