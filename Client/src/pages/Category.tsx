import React from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const Category = () => {
  const { category } = useParams();
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/books/category/${category}`);
        setBooks(response.data.$values);
      } catch (error) {
        console.error(error.data);
      }
    };
    fetchData();
  }, [category]);
  return (
    <div>
      <Navbar />
      <section className="w-full py-10 select-none">
        <div className="container grid gap-8 px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
            <div className="grid gap-1">
              <h1 className="text-2xl font-bold tracking-tight">
                {category
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}{" "}
                Genre
              </h1>
              <p className="text-muted-foreground">
                Delve into the realm of literature.
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
                  className="object-cover mx-auto rounded-t-md bg-cover bg-center h-80 w-full"
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
    </div>
  );
};

export default Category;
