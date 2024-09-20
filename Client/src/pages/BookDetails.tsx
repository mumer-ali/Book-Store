import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import useAuth from "@/store/useAuth";
import toast from "react-hot-toast";
import useCart from "@/store/useCart";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState<any>({});
  const [quantity, setQuantity] = useState(1);
  const [review, setReview] = useState({ rating: 0, review: "" });
  const [priceAfterDiscount, setPriceAfterDiscount] = useState(0);
  const [reviewList, setReviewList] = useState([]);
  const { user } = useAuth();
  const { cart, addToCart, removeFromCart, getCount } = useCart();
  const fetchData = async () => {
    try {
      const res = await axios.get(`/books/${id}`);
      setBook(res.data.data);
      setReviewList(res.data.reviews.$values.map((review) => review.$ref));
    } catch (error) {
      console.error(error.data);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);
  useEffect(() => {
    calculatePriceAfterDiscount();
  }, [book]);
  const calculatePriceAfterDiscount = () => {
    setPriceAfterDiscount(book.price * (1 - book.discount / 100));
  };
  const reviews = reviewList.map((review) =>
    findObjectById(book.reviews.$values, review)
  );
  const ratings = reviews.map((review) => review.rating);
  const totalRatings = ratings.length;
  const sumRatings = ratings.reduce((acc, rating) => acc + rating, 0);
  const averageRating = sumRatings / totalRatings;
  const submitReview = async () => {
    if (!user) {
      toast.error("Please Login to Review!");
    } else {
      if (review.rating === 0) {
        toast.error("Please Rate the Book!");
      } else {
        try {
          const response = await axios.post(`/books/${id}`, {
            email: user.email,
            book_ID: id,
            rating: review.rating,
            comment: review.review,
            dateTime: new Date().toISOString(),
          });
          toast.success(
            response.data
              ? "Review Submitted Successfully!"
              : "Internal Server Error!"
          );
          setReview({ rating: 0, review: "" });
          fetchData();
        } catch (error) {
          console.error("Error submitting review:", error);
        }
      }
    }
  };
  const addBookToCart = (book) => {

    if (getCount(book.book_ID) + quantity <= book.quantity) {
      addToCart(book, quantity);
      toast.success("Added to cart successfully!");
    } else {
      toast.error(
        book.quantity - getCount(book.book_ID) === 0
          ? "The book is out of stock!"
          : `Only ${book.quantity - getCount(book.book_ID)} left in stock!`
      );
    }
  };
  return (
    <>
      <Navbar />
      <div>
        <div className="flex justify-center items-center select-none">
          <div className="grid md:grid-cols-2 gap-6 lg:gap-12 items-start max-w-6xl px-4 mx-auto py-6">
            <div className="grid gap-4 md:gap-10 items-start">
              <img
                alt="Product Image"
                className="object-cover h-[60vh] border border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
                src={book.url}
              />
            </div>
            <div className="grid gap-4 md:gap-10 items-start">
              <div className="grid gap-2">
                <h1 className="font-bold text-3xl lg:text-4xl">{book.name}</h1>
                <div>
                  <p>{book.author}</p>
                </div>
                <div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-0.5">
                      {(() => {
                        const starCount = Math.round(averageRating);
                        const stars = [];

                        for (let i = 0; i < 5; i++) {
                          if (i < starCount) {
                            stars.push(
                              <StarIcon
                                className="w-5 h-5 fill-primary"
                                key={i}
                              />
                            );
                          } else {
                            stars.push(
                              <StarIcon
                                className="w-5 h-5 fill-muted stroke-muted-foreground"
                                key={i}
                              />
                            );
                          }
                        }
                        return stars;
                      })()}
                      ({totalRatings})
                    </div>
                    <div className="text-4xl font-bold flex items-center">
                      {book.discount === 0 ? (
                        ""
                      ) : (
                        <>
                          <span className="line-through text-lg block">
                            PKR {book.price}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="text-4xl font-bold flex items-center pt-2">
                    {book.discount === 0 ? (
                      <span>PKR {book.price}</span>
                    ) : (
                      <>
                        <span>PKR {priceAfterDiscount}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid gap-4 md:gap-10">
                <div className="grid gap-2">
                  <Label className="text-base" htmlFor="quantity">
                    Quantity
                  </Label>
                  <div className="flex items-center gap-2">
                    <Button
                      className="h-8 w-8"
                      size="icon"
                      variant="outline"
                      onClick={() => setQuantity(quantity - 1)}
                      disabled={quantity === 1}
                    >
                      <MinusIcon className="h-4 w-4" />
                      <span className="sr-only">Decrease quantity</span>
                    </Button>
                    <span>{quantity}</span>
                    <Button
                      className="h-8 w-8"
                      size="icon"
                      variant="outline"
                      onClick={() => setQuantity(quantity + 1)}
                      disabled={quantity === book.quantity}
                    >
                      <PlusIcon className="h-4 w-4" />
                      <span className="sr-only">Increase quantity</span>
                    </Button>
                  </div>
                </div>
                {book.quantity != 0 ? (
                  <Button size="lg" onClick={() => addBookToCart(book)}>
                    Add to cart
                  </Button>
                ) : (
                  <Button size="lg" disabled>
                    Out of Stock
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <div className="mx-auto px-4 md:px-6 max-w-2xl grid gap-12 select-none">
        <div className="flex flex-col mt-8 -mb-3">
          <div className="flex gap-4 items-start">
            <div className="grid gap-0.5 text-sm">
              <h3 className="font-semibold">Write a review</h3>
            </div>
            <div className="flex items-center gap-0.5 ml-auto cursor-pointer">
              <StarIcon
                className={
                  review.rating >= 1
                    ? `w-5 h-5 fill-primary cursor-pointer`
                    : `w-5 h-5 fill-muted stroke-muted-foreground`
                }
                onClick={() => {
                  setReview((prev) => ({ ...prev, rating: 1 }));
                }}
              />
              <StarIcon
                className={
                  review.rating >= 2
                    ? `w-5 h-5 fill-primary cursor-pointer`
                    : `w-5 h-5 fill-muted stroke-muted-foreground`
                }
                onClick={() => {
                  setReview((prev) => ({ ...prev, rating: 2 }));
                }}
              />
              <StarIcon
                className={
                  review.rating >= 3
                    ? `w-5 h-5 fill-primary cursor-pointer`
                    : `w-5 h-5 fill-muted stroke-muted-foreground`
                }
                onClick={() => {
                  setReview((prev) => ({ ...prev, rating: 3 }));
                }}
              />
              <StarIcon
                className={
                  review.rating >= 4
                    ? `w-5 h-5 fill-primary cursor-pointer`
                    : `w-5 h-5 fill-muted stroke-muted-foreground`
                }
                onClick={() => {
                  setReview((prev) => ({ ...prev, rating: 4 }));
                }}
              />
              <StarIcon
                className={
                  review.rating >= 5
                    ? `w-5 h-5 fill-primary cursor-pointer`
                    : `w-5 h-5 fill-muted stroke-muted-foreground`
                }
                onClick={() => {
                  setReview((prev) => ({ ...prev, rating: 5 }));
                }}
              />
            </div>
          </div>
          <div className="text-sm leading-loose text-gray-500 dark:text-gray-400 flex justify-between pt-3">
            <Input
              className="p-4 w-4/5 focus:outline-none"
              placeholder="Write your review..."
              value={review.review}
              onChange={(e) =>
                setReview((prev) => ({ ...prev, review: e.target.value }))
              }
            />
            <Button className="w-1/5 ml-5" onClick={submitReview}>
              Submit Review
            </Button>
          </div>
        </div>
        <Separator />
        <div className="pb-16">
          {reviews.map((review) => {
            const lastReview = findObjectById(
              book.reviews.$values,
              review.customer.$ref
            );
            const f_name = `${review.customer && review.customer.firstName} ${
              review.customer && review.customer.lastName
            }`;
            const s_name = `${lastReview && lastReview.firstName} ${
              lastReview && lastReview.lastName
            }`;
            const initials = f_name
              ? getInitials(f_name)
              : s_name
              ? getInitials(s_name)
              : "";
            return (
              <div>
                <div className="flex gap-4 py-5">
                  <Avatar className="w-10 h-10 border">
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-4">
                    <div className="flex gap-4 items-start">
                      <div className="grid gap-0.5 text-sm">
                        <h3 className="font-semibold">
                          {review.customer && review.customer.firstName
                            ? f_name
                            : s_name}
                        </h3>
                        <time className="text-sm text-gray-500 dark:text-gray-400">
                          {(() => {
                            const reviewDate = new Date(review.dateTime);
                            const today = new Date();
                            const timeDifference =
                              today.getTime() - reviewDate.getTime();
                            const daysDifference = Math.floor(
                              timeDifference / (1000 * 60 * 60 * 24)
                            );
                            if (daysDifference > 1) {
                              return `${daysDifference} days ago`;
                            } else if (daysDifference === 1) {
                              return "1 day ago";
                            } else {
                              return "Today";
                            }
                          })()}
                        </time>
                      </div>
                      <div className="flex items-center gap-0.5 ml-auto">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <StarIcon
                            key={index}
                            className={`w-5 h-5 ${
                              index < review.rating
                                ? "fill-primary"
                                : "fill-muted stroke-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-sm leading-loose text-gray-500 dark:text-gray-400">
                      <p>{review.comment}</p>
                    </div>
                  </div>
                </div>
                <Separator />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default BookDetails;

function MinusIcon(props) {
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
      <path d="M5 12h14" />
    </svg>
  );
}
function PlusIcon(props) {
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
      <path d="M5 12h14" />
      <path d="M12 5v14" />
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
const findObjectById = (data, desiredId) => {
  for (const key in data) {
    if (key === "$id" && data[key] === desiredId) {
      return data;
    }
    if (typeof data[key] === "object" && data[key] !== null) {
      const desiredObject = findObjectById(data[key], desiredId);
      if (desiredObject) {
        return desiredObject;
      }
    }
  }
  return null;
};
const getInitials = (fullname) => {
  const words = fullname.split(" ");
  const initials = words.reduce((result, word) => {
    if (word.length > 0) {
      result += word[0].toUpperCase();
    }
    return result;
  }, "");
  return initials;
};
