import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Book from "../assets/book.jpg";
import Cover from "../assets/cover.jpg";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";

const Landing = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/");
        setBooks(response.data.$values);
      } catch (error) {
        console.error(error.data);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex flex-col select-none">
        <section className="w-full h-[85vh] flex flex-row">
          <div className="w-1/2">
            <img
              src={Cover}
              alt="Hero Book"
              className="mx-auto object-cover w-full h-full"
            />
          </div>
          <div className="flex flex-col justify-center w-1/2 px-10 space-y-3">
            <div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Discover Your Next Great Read
              </h1>
            </div>
            <div>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Explore our curated selection of books across a wide range of
                genres and find your next literary adventure.
              </p>
            </div>
            <div className="pt-6">
              <button
                className="h-10 w-full rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 cursor-pointer"
                onClick={() => navigate("/books")}
              >
                Browse Books
              </button>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Featured Books
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Discover our hand-picked selection of the best new releases
                  and customer favorites.
                </p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {books.map((book) => (
              <div
                key={book.book_ID}
                className="grid gap-4 bg-background rounded-lg overflow-hidden shadow-sm"
              >
                <img
                  src={book.url}
                  alt={book.name}
                  className="object-cover h-full mx-auto w-full rounded-t-md bg-cover bg-center h-80 w-full"
                />
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="font-semibold text-lg">{book.name}</h3>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                  <div className="flex items-center gap-2">
                    {parseInt(book.discount) !== 0 ? (
                      <div className="bg-primary-foreground text-primary px-2 py-1 rounded-md text-xs font-medium">
                        {book.discount}% off
                      </div>
                    ) : (
                      ""
                    )}
                    <div
                      className={`font-semibold ${
                        parseInt(book.discount)
                          ? "text-muted-foreground line-through"
                          : "text-lg"
                      }`}
                    >
                      Rs. {book.price}
                    </div>
                    {parseInt(book.discount) !== 0 ? (
                      <div className="font-semibold text-lg">
                        Rs.{" "}
                        {book.price -
                          book.price * (parseInt(book.discount) / 100)}
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate(`/books/${book.book_ID}`)}
                  >
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container space-y-12 px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Popular Categories
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore our wide range of book categories to find your next
                  great read.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              <div
                onClick={() => navigate(`/books/category/${"fiction"}`)}
                className="group flex h-32 flex-col items-center justify-center rounded-lg bg-muted p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
              >
                <BookIcon className="h-8 w-8 mb-2" />
                <h3 className="text-lg font-semibold">Fiction</h3>
              </div>
              <div
                onClick={() => navigate(`/books/category/${"non-fiction"}`)}
                className="group flex h-32 flex-col items-center justify-center rounded-lg bg-muted p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
              >
                <BookOpenIcon className="h-8 w-8 mb-2" />
                <h3 className="text-lg font-semibold">Non-Fiction</h3>
              </div>
              <div
                onClick={() => navigate(`/books/category/${"biography"}`)}
                className="group flex h-32 flex-col items-center justify-center rounded-lg bg-muted p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
              >
                <UserIcon className="h-8 w-8 mb-2" />
                <h3 className="text-lg font-semibold">Biography</h3>
              </div>
              <div
                onClick={() => navigate(`/books/category/${"history"}`)}
                className="group flex h-32 flex-col items-center justify-center rounded-lg bg-muted p-4 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50 cursor-pointer"
              >
                <CalendarDaysIcon className="h-8 w-8 mb-2" />
                <h3 className="text-lg font-semibold">History</h3>
              </div>
            </div>
          </div>
        </section>
        <Testimonials />
        <Footer />
      </div>
    </>
  );
};

function BookIcon(props) {
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function BookOpenIcon(props) {
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function CalendarDaysIcon(props) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </svg>
  );
}

function StarIcon(props) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function UserIcon(props) {
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

export default Landing;
